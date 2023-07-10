const express = require("express")
const app=express()
const router = express.Router();
const path =require("path")
const loginControler=require("../Controlers/loginControler")
const signinControler=require("../Controlers/signinControler")
const {refresh,auth}=require("../Controlers/tokenRefresher")
const userdetails=require("../Controlers/profile")
const {addBlog,getHomeBlogs,getBlogById}=require("../Controlers/addBlog")
router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","Public","index.html"))
})
router.get("*.css",(req,res)=>{
    let filename= req.url.substring(req.url.lastIndexOf('/'))
    res.sendFile(path.join(__dirname,"..","Public","styles",filename));
})
router.get("*.html*",(req,res)=>{
    let filename
    if(req.url.endsWith(".html")){
        filename= req.url.substring(req.url.lastIndexOf('/'))
    }
    else{
        filename= req.url.substring(req.url.lastIndexOf('/'),req.url.lastIndexOf('?'))
    }
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
router.post("/auth",auth)
router.post("/login",loginControler)
router.post("/signin",signinControler)
router.get("/refresh",refresh)
router.get("/userdetails",userdetails)
router.post("/create",addBlog)
router.get("/homeBlogs",getHomeBlogs);
router.get("/getBlogData*",getBlogById)
module.exports = router