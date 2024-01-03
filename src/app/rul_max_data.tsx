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

export const mulQuery = async () => {
    const db = await instantiate(duckdb);
    const c = await db.connect();
    await db.registerFileURL('max_rul.parquet', `${window.location.href}/max_rul.parquet`, DuckDBDataProtocol.HTTP,
        true)
    const query = await c.query("Select unit_nr,RUL from max_rul.parquet")
    const result: any = []
    for (const batch of query.batches) {
        // @ts-ignore
        batch.toArray().map((it: any) => [Number(it.unit_nr), Number(it.RUL)]).forEach((it: any) => result.push(it))
    }
    await c.close()
    return result
}



