import Image from 'next/image'
import {MaxRul} from "@/app/MaxRul";
import {TrainigDataSet} from "@/app/TrainingDataSet";

export default function Home() {
    return (
        <div className={"grid grid-rows-2"}>
            <MaxRul/>
            <TrainigDataSet/>
        </div>
    )
}
