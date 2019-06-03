//1.引入gulp
const gulp = require('gulp');

const {createReadStream,createWriteStream} = require('fs')

/*
* Did you forget to signal async completion?
*   解决办法：
*       1.传入一个完成时的函数--done，当执行完了你的任务，需要我们自己手动调用done()
*       2.任务回调函数用async声明，任务语句用await。
*       3.返回一个流（可读流）
* */

//指定一个任务
gulp.task('demo', function(done) {
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    console.log(1)
    return createReadStream('./package.json')
});

let rs = createReadStream('./package.json')
let ws = createWriteStream('./package0218.json')

//给流绑定事件监听
rs.on('open',()=>{
  console.log('可读流打开了')
})
rs.on('close',()=>{
  console.log('可读流关闭了')
})
ws.on('open',()=>{
  console.log('可写流打开了')
})
ws.on('close',()=>{
  console.log('可写流关闭了')
})


/*
rs.on('data',(data)=>{
  ws.write(data)
})*/

rs.pipe(ws)

