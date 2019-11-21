const express = require('express')
const bodyParser = require('body-parser')
const route = require('./app/route/route')


// const upload = multer();
const app = express()

app.use(express.static('uploads'))

app.use(bodyParser())

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
// form-urlencoded

// // for parsing multipart/form-data
// app.use(upload.array()); 
// app.use(express.static('public'));


const allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    // res.header("Access-Control-Allow-Origin", "http://localhost:4200"); 
    // res.header("Access-Control-Allow-Origin", "http://192.168.93.17:4200"); 
    // var allowedOrigins = ['http://localhost:4200', 'http://192.168.93.17:4200'];
    // var origin = req.headers.origin;
    // if(allowedOrigins.indexOf(origin) > -1){
    //     res.setHeader('Access-Control-Allow-Origin', origin);
    // }
    res.header("Access-Control-Allow-Headers", "*"); 
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    // res.header("Access-Control-Allow-Methods", "POST,PUT,GET,PATCH,DELETE");
    res.header("Access-Control-Allow-Methods", "*"); 
    next();
}
app.use(allowCrossDomain)

app.use((req,res,next)=>{
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // console.log(fullUrl);
    next()
})

app.use("/api",route)

app.listen(8080,()=>{
    console.log("running...");
})
