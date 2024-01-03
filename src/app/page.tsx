import Image from 'next/image'
import {MaxRul} from "@/app/MaxRul";
import {TrainigDataSet} from "@/app/TrainingDataSet";
import {LinReg} from "@/app/LinregDataSet";

export default function Home() {
    return (
        <div className={"grid grid-rows-3"}>
            <MaxRul/>
            <TrainigDataSet/>
            <LinReg/>
        </div>
    )
}
