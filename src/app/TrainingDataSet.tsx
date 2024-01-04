"use client"
import {useEffect, useState} from "react";
import {mulQuery} from "@/app/rul_max_data";
import dynamic from "next/dynamic";
import {Select, SelectItem, Spinner} from "@nextui-org/react";
import {it} from "node:test";
import {trainingDataset} from "@/app/training_dataset";

const EChartsWrapper = dynamic(() => import("@/app/EChartsWrapper"), {ssr: false})

export const TrainigDataSet = () => {
    const [data, setData] = useState([])
    const [summary, setSummary] = useState([])
    const [sensor, setSensor] = useState("s_4")
    // @ts-ignore
    const sensors = [...Array(20).keys()].map(it => "s_" + (it + 2))
    // @ts-ignore
    const engines = [...Array(100).keys()].map(it => it + 1)
    useEffect(() => {
        if (sensor) {
            const getData = async () => {
                return await trainingDataset(sensor)
            }
            getData().then(r => {
                setData(r.data);
                setSummary(r.summary)
            })
        }
    }, [sensor])
    const option = {
        title:{ text:'Sensor vs Remaining Useful Life of Engine'},
        xAxis: {

            type: 'value',
            nameLocation: 'start'
        },
        yAxis: {
            min: 'dataMin',
            type: 'value',
        },
        tooltip: {
            show: true
        },
        grid: {
            show: true,
            backgroundColor: 'black',
            containLabel:true,
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
        series: engines.map(it =>
            ({
                name: `engine-${it}`,
                large: true,
                symbolSize: 4,
                data: data[it],
                type: 'scatter',
                animation: false,
                labelLayout: {
                    moveOverlap: 'shiftY'
                },
                emphasis: {
                    focus: 'series'
                },
            }))
    };

    return (<div className={"grid grid-rows-[68px,auto] w-full"}>
        <div className={"bg-black"}>
            <Select
                color={"default"}
                label="Select a sensor to start observing"
                aria-label={"Select a sensor to start observing"}
                title={"Select a sensor"}
                className="ml-4 justify-center"
                //@ts-ignore
                onSelectionChange={(keys: Selection) => setSensor((Array.from(keys))[0] as string)}
                variant={"flat"}
                fullWidth={true}>
                {sensors.map((gauge: string) => (
                    <SelectItem
                        key={gauge}
                        value={gauge}>
                        {gauge}
                    </SelectItem>
                ))}
            </Select>

        </div>
        <div className={"w-full"}>
            {data.length > 0 ? <EChartsWrapper
                style={{display: "grid"}}
                opts={{renderer: "canvas"}}
                notMerge={false}
                lazyUpdate={false}
                theme={"dark"}
                showLoading={data.length == 0}
                loadingOption={{"maskColor": 'black'}}
                option={option}
            /> : <Spinner/>}
        </div>

    </div>)
}