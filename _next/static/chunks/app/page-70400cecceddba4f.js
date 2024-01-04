(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{8210:function(e,t,a){Promise.resolve().then(a.bind(a,9358)),Promise.resolve().then(a.bind(a,3236)),Promise.resolve().then(a.bind(a,5942))},9358:function(e,t,a){"use strict";a.r(t),a.d(t,{LinReg:function(){return u}});var r=a(7437),n=a(2265),i=a(4930),s=a.n(i),o=a(3746);let l=async e=>{let t=e.getJsDelivrBundles(),a=await e.selectBundle(t),r=URL.createObjectURL(new Blob(['importScripts("'.concat(a.mainWorker,'");')],{type:"text/javascript"})),n=new Worker(r),i=new e.ConsoleLogger("DEBUG"),s=new e.AsyncDuckDB(i,n);return await s.instantiate(a.mainModule,a.pthreadWorker),URL.revokeObjectURL(r),s},c=async()=>{let e=await l(o),t=await e.connect();await e.registerFileURL("linreg_test.parquet","".concat(window.location.href,"/linreg_test.parquet"),o.DuckDBDataProtocol.HTTP,!0);let a=await t.query("Select actual,predicted from linreg_test.parquet"),r=[];for(let e of a.batches)e.toArray().map(e=>[Number(e.actual),Number(e.predicted)]).forEach(e=>r.push(e));return console.log(r),await t.close(),r},d=s()(()=>Promise.all([a.e(779),a.e(425)]).then(a.bind(a,5425)),{loadableGenerated:{webpack:()=>[5425]},ssr:!1}),u=()=>{let[e,t]=(0,n.useState)([]),[a,i]=(0,n.useState)([]);return[...Array(13096).keys()].map(e=>e+1),(0,n.useEffect)(()=>{(async()=>await c())().then(e=>{if(e){let a=0,r=0;t(e.map(e=>[a++,e[0]])),i(e.map(e=>[r++,e[1]]))}})},[]),(0,r.jsx)("div",{className:"w-full",children:(0,r.jsx)(d,{style:{display:"grid"},opts:{renderer:"canvas"},notMerge:!1,lazyUpdate:!1,theme:"dark",showLoading:0==e.length,loadingOption:{maskColor:"black"},option:{title:{text:"Actual vs Predicted"},xAxis:{},yAxis:{min:"dataMin",type:"value"},legend:{data:["actual","predicted"]},tooltip:{show:!0},grid:{show:!0,backgroundColor:"black",containLabel:!0},dataZoom:[{type:"slider",xAxisIndex:0},{type:"slider",yAxisIndex:0},{type:"inside",xAxisIndex:0},{type:"inside",yAxisIndex:0}],series:[{large:!0,symbolSize:4,data:e,type:"scatter",animation:!1,labelLayout:{moveOverlap:"shiftY"},emphasis:{focus:"series"}},{large:!0,symbolSize:4,data:a,type:"scatter",animation:!1,labelLayout:{moveOverlap:"shiftY"},emphasis:{focus:"series"}}]}})})}},3236:function(e,t,a){"use strict";a.r(t),a.d(t,{MaxRul:function(){return d}});var r=a(7437),n=a(2265),i=a(3746);let s=async e=>{let t=e.getJsDelivrBundles(),a=await e.selectBundle(t),r=URL.createObjectURL(new Blob(['importScripts("'.concat(a.mainWorker,'");')],{type:"text/javascript"})),n=new Worker(r),i=new e.ConsoleLogger("DEBUG"),s=new e.AsyncDuckDB(i,n);return await s.instantiate(a.mainModule,a.pthreadWorker),URL.revokeObjectURL(r),s},o=async()=>{let e=await s(i),t=await e.connect();await e.registerFileURL("max_rul.parquet","".concat(window.location.href,"/max_rul.parquet"),i.DuckDBDataProtocol.HTTP,!0);let a=await t.query("Select unit_nr,RUL from max_rul.parquet"),r=[];for(let e of a.batches)e.toArray().map(e=>[Number(e.unit_nr),Number(e.RUL)]).forEach(e=>r.push(e));return await t.close(),r};var l=a(4930);let c=a.n(l)()(()=>Promise.all([a.e(779),a.e(425)]).then(a.bind(a,5425)),{loadableGenerated:{webpack:()=>[5425]},ssr:!1}),d=()=>{let[e,t]=(0,n.useState)([]);(0,n.useEffect)(()=>{(async()=>await o())().then(e=>t(e))},[]);let a={title:{text:"Remaining Useful Life of each engine"},xAxis:{type:"category",data:e.map(e=>[e[0]])},yAxis:{type:"value"},tooltip:{show:!0},grid:{show:!0,backgroundColor:"black",containLabel:!0},series:[{data:e.map(e=>e[1]),type:"bar"}]};return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(c,{style:{display:"grid",height:"100%"},opts:{renderer:"canvas"},notMerge:!1,lazyUpdate:!0,theme:"dark",showLoading:0==e.length,loadingOption:{maskColor:"black"},option:a})})}},5942:function(e,t,a){"use strict";a.r(t),a.d(t,{TrainigDataSet:function(){return y}});var r=a(7437),n=a(2265),i=a(4930),s=a.n(i),o=a(45),l=a(9174),c=a(2695),d=a(3746);let u=async e=>{let t=e.getJsDelivrBundles(),a=await e.selectBundle(t),r=URL.createObjectURL(new Blob(['importScripts("'.concat(a.mainWorker,'");')],{type:"text/javascript"})),n=new Worker(r),i=new e.ConsoleLogger("DEBUG"),s=new e.AsyncDuckDB(i,n);return await s.instantiate(a.mainModule,a.pthreadWorker),URL.revokeObjectURL(r),s},p=async e=>{let t=await u(d),a=await t.connect();await t.registerFileURL("training_dataset.parquet","".concat(window.location.href,"/training_dataset.parquet"),d.DuckDBDataProtocol.HTTP,!0);let r=await a.query("Select ".concat(e,", RUL, unit_nr\n                                 from training_dataset.parquet ")),n=Array(100);for(let t of r.batches)t.toArray().map(t=>[Number(t.unit_nr),Number(t.RUL),Number(t[e])]).forEach(e=>{n[e[0]]?n[e[0]].push([e[1],e[2]]):n[e[0]]=[[e[1],e[2]]]});let i=(await a.query("select min(".concat(e,") as min_sensor, max(").concat(e,") as max_sensor from training_dataset.parquet"))).toArray().map(e=>({min:e.min_sensor,max:e.max_sensor}));return await a.close(),{data:n,summary:i}},m=s()(()=>Promise.all([a.e(779),a.e(425)]).then(a.bind(a,5425)),{loadableGenerated:{webpack:()=>[5425]},ssr:!1}),y=()=>{let[e,t]=(0,n.useState)([]),[a,i]=(0,n.useState)([]),[s,d]=(0,n.useState)("s_4"),u=[...Array(20).keys()].map(e=>"s_"+(e+2)),y=[...Array(100).keys()].map(e=>e+1);(0,n.useEffect)(()=>{s&&(async()=>await p(s))().then(e=>{t(e.data),i(e.summary)})},[s]);let g={title:{text:"Sensor vs Remaining Useful Life of Engine"},xAxis:{type:"value",nameLocation:"start"},yAxis:{min:"dataMin",type:"value"},tooltip:{show:!0},grid:{show:!0,backgroundColor:"black",containLabel:!0},dataZoom:[{type:"slider",xAxisIndex:0},{type:"slider",yAxisIndex:0},{type:"inside",xAxisIndex:0},{type:"inside",yAxisIndex:0}],series:y.map(t=>({name:"engine-".concat(t),large:!0,symbolSize:4,data:e[t],type:"scatter",animation:!1,labelLayout:{moveOverlap:"shiftY"},emphasis:{focus:"series"}}))};return(0,r.jsxs)("div",{className:"grid grid-rows-[68px,auto] w-full",children:[(0,r.jsx)("div",{className:"bg-black",children:(0,r.jsx)(o.g,{color:"default",label:"Select a sensor to start observing","aria-label":"Select a sensor to start observing",title:"Select a sensor",className:"ml-4 justify-center",onSelectionChange:e=>d(Array.from(e)[0]),variant:"flat",fullWidth:!0,children:u.map(e=>(0,r.jsx)(l.R,{value:e,children:e},e))})}),(0,r.jsx)("div",{className:"w-full",children:e.length>0?(0,r.jsx)(m,{style:{display:"grid"},opts:{renderer:"canvas"},notMerge:!1,lazyUpdate:!1,theme:"dark",showLoading:0==e.length,loadingOption:{maskColor:"black"},option:g}):(0,r.jsx)(c.c,{})})]})}}},function(e){e.O(0,[810,173,971,938,744],function(){return e(e.s=8210)}),_N_E=e.O()}]);