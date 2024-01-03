"use client"
import {useEffect, useState} from "react";
import {mulQuery} from "@/app/rul_max_data";
import dynamic from "next/dynamic";
import {Select, SelectItem, Spinner} from "@nextui-org/react";
import {it} from "node:test";
import {trainingDataset} from "@/app/training_dataset";
import {linRegQuery} from "@/app/linreg_data";

const EChartsWrapper = dynamic(() => import("@/app/EChartsWrapper"), {ssr: false})

export const LinReg = () => {
    const [actualData, setActualData] = useState([])
    const [predictedData, setPredictedData] = useState([])
    // @ts-ignore
    const xPoints=[...Array(13096).keys()].map(it => it + 1)

    useEffect(() => {

        const getData = async () => {
            return await linRegQuery()
        }
        getData().then(r => {
            if (r)
            {
                let counter1=0
                let counter2=0
                setActualData(r.map((it:any) =>[counter1++,it[0]]))
                setPredictedData(r.map((it:any) =>[counter2++,it[1]]))
            }
        })
    }, [])

    const option = {
        title: {text: 'Actual vs Predicted'},
        xAxis: {},
        yAxis: {
            min: 'dataMin',
            type: 'value',
        },
        legend:{data:['actual','predicted']},
        tooltip: {
            show: true
        },
        grid: {
            show: true,
            backgroundColor: 'black',
            containLabel: true,
        },
        dataZoom: [
            {
                type: 'slider',
                xAxisIndex: 0,
            },
            {
                type: 'slider',
                yAxisIndex: 0,
            },
            {
                type: 'inside',
                xAxisIndex: 0,
            },
            {
                type: 'inside',
                yAxisIndex: 0,
            }
        ],
        series: [
            {

                large: true,
                symbolSize: 4,
                data: actualData,
                type: 'scatter',
                animation: false,
                labelLayout: {
                    moveOverlap: 'shiftY'
                },
                emphasis: {
                    focus: 'series'
                },
            },
            {

                large: true,
                symbolSize: 4,
                data: predictedData,
                type: 'scatter',
                animation: false,
                labelLayout: {
                    moveOverlap: 'shiftY'
                },
                emphasis: {
                    focus: 'series'
                },
            }
        ]
    };

    return (
        <div className={"w-full"}>
            {<EChartsWrapper
                style={{display: "grid"}}
                opts={{renderer: "canvas"}}
                notMerge={false}
                lazyUpdate={false}
                theme={"dark"}
                showLoading={actualData.length == 0}
                loadingOption={{"maskColor": 'black'}}
                option={option}
            />}

        </div>)
}