"use client"
import {useEffect, useState} from "react";
import {mulQuery} from "@/app/rul_max_data";
import dynamic from "next/dynamic";

const EChartsWrapper = dynamic(() => import("@/app/EChartsWrapper"), {ssr: false})

export const MaxRul = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const getData = async () => {
            return await mulQuery()
        }
        getData().then(r => setData(r))
    }, [])
    const option = {
        xAxis: {
            type: 'category',
            data: data.map(it=> it[0])
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: data.map(it=> it[1]),
                type: 'bar'
            }
        ]
    };

    return (<div>
        <EChartsWrapper
            style={{display: "grid"}}
            opts={{renderer: "canvas"}}
            notMerge={false}
            lazyUpdate={true}
            theme={"dark"}
            showLoading={data.length == 0}
            loadingOption={{"maskColor": 'black'}}
            option={option}

        />

    </div>)
}