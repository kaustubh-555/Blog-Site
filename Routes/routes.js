const express = require("express")
const app=express()
const router = express.Router();
const path =require("path")
const {loginControler,auth,refresh} = require("../Controlers/loginControler")
router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","Public","index.html"))
})
router.get("*.css",(req,res)=>{
    let filename= req.url.substring(req.url.lastIndexOf('/'))
    res.sendFile(path.join(__dirname,"..","Public","styles",filename));
})
router.get("*.html",(req,res)=>{
    let filename= req.url.substring(req.url.lastIndexOf('/'))
    res.sendFile(path.join(__dirname,"..","Public",filename));
})
router.get("*.js",(req,res)=>{
    let filename= req.url.substring(req.url.lastIndexOf('/'))
    res.sendFile(path.join(__dirname,"..","Public","scripts",filename));
})
router.get("*.jpg",(req,res)=>{
    let filename= req.url.substring(req.url.lastIndexOf('/'))
    res.sendFile(path.join(__dirname,"..","Public","images",filename));
})
router.get("*.png",(req,res)=>{
    let filename= req.url.substring(req.url.lastIndexOf('/'))
    res.sendFile(path.join(__dirname,"..","Public","images",filename));
})
router.post("/login",loginControler)
router.post("/auth",auth)
router.get("/refresh",refresh)
module.exports = router