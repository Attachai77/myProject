const express = require('express')
const bodyParser = require('body-parser')
const route = require('./app/route/route')

const app = express()
app.use(bodyParser())

app.use((req,res,next)=>{
    console.log("start");
    next()
})

app.use("/api",route)

app.listen(3000,()=>{
    console.log("running...");
})
