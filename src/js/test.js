let timeBegin = Date.now();
let timeEnd;
setTimeout((()=>{
    timeEnd = Date.now();
    let timeRunScd = Math.round(((timeEnd - timeBegin)/1000)%60);
    console.log(timeRunScd)
}), 10000)
