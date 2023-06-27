const express =require("express")
const app = express()
const path= require("path")
const cookieParser=require("cookie-parser")
require("dotenv").config()
const PORT = process.env.PORT||3500;
console.log(PORT)


const router= require("./Routes/routes")

const disreq = require("./Middleware/reqLogger") 

app.use(express.urlencoded({extended:false}))

app.use(express.json())

app.use(cookieParser())

app.use(disreq);

app.use(router)


app.listen(PORT,()=>{
    console.log("server is running !");
})