const express = require('express')
const bodyParser = require('body-parser')
const route = require('./app/route/route')

// const verifyToken = require('./app/controllers/AuthController').verifyToken()

const app = express()
app.use(bodyParser())


const allowCrossDomain = function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); 
    res.header("Access-Control-Allow-Origin", "http://192.168.93.17:4200"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST,PUT,GET,PATCH,DELETE");
    next();
}
app.use(allowCrossDomain)

app.use((req,res,next)=>{
    console.log("start");
    next()
})

app.use("/api",route)
app.listen(8080,()=>{
    console.log("running...");
})
