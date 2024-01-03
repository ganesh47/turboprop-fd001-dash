import React from "react";
import ReactECharts from "echarts-for-react";

//@ts-ignore
export default function EChartsWrapper({...props}) {
    return (
        // @ts-ignore
        <ReactECharts {...props}/>
    );
}