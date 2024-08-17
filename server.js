const express =require("express")
const app = express()
const path= require("path")
const cookieParser=require("cookie-parser")
require("dotenv").config()
const PORT = process.env.PORT||3500;
const mongoose = require("mongoose")
const connectDB=require("./config/dbConnector")
const userSchema = require("./Models/userSchema")
connectDB();
let db=mongoose.connection;

db.once('open',()=>{
    console.log("connected to DB !")
})
const router= require("./Routes/routes")

const fileUpload=require("express-fileupload")

app.use(fileUpload({
    useTempFiles: true
}))


const disreq = require("./Middleware/reqLogger") 

app.use(express.urlencoded({extended:false}))

app.use(express.json())

app.use(cookieParser())

app.use(disreq);

app.use(router)

app.listen(PORT,()=>{
    console.log("server is running !");
})                      