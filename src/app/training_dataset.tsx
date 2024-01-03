// noinspection SqlNoDataSourceInspection,SqlResolve

import * as duckdb from "@duckdb/duckdb-wasm";
import {AsyncDuckDB, DuckDBDataProtocol} from "@duckdb/duckdb-wasm";

const instantiate = async (duckdb: any) => {
    const CDN_BUNDLES = duckdb.getJsDelivrBundles(),
        bundle = await duckdb.selectBundle(CDN_BUNDLES), // Select a bundle based on browser checks
        worker_url = URL.createObjectURL(
            new Blob([`importScripts("${bundle.mainWorker}");`], {
                type: "text/javascript"
            })
        );

    // Instantiate the asynchronus version of DuckDB-wasm
    const worker = new Worker(worker_url),
        logger = new duckdb.ConsoleLogger("DEBUG"),
        db = new duckdb.AsyncDuckDB(logger, worker);

    await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
    URL.revokeObjectURL(worker_url);

    return db;
};

export const trainingDataset = async (sensor: string) => {
    const db = await instantiate(duckdb);
    const c = await db.connect();
    await db.registerFileURL('training_dataset.parquet', `${window.location.href}/training_dataset.parquet`, DuckDBDataProtocol.HTTP,
        true)
    const query = await c.query(`Select ${sensor}, RUL, unit_nr
                                 from training_dataset.parquet `)
    const result: any = new Array<number>(100)
    for (const batch of query.batches) {
        // @ts-ignore
        batch.toArray().map((it: any) => [Number(it.unit_nr), Number(it.RUL), Number(it[sensor])]).forEach((it: any) => {

            if (result[it[0]]) {
                result[it[0]].push([it[1], it[2]])
            } else {
                result[it[0]] = [[it[1], it[2]]]
            }

        })
    }
    //console.log(result)
    const query2= await c.query(`select min(${sensor}) as min_sensor, max(${sensor}) as max_sensor from training_dataset.parquet`)
    const result2=query2.toArray().map((it:any)=> ({min:it.min_sensor,max:it.max_sensor}))
    await c.close()
    return {data:result,summary:result2}
}



