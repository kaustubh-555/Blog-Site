const jwt =require("jsonwebtoken")
const path=require("path")
const fspromises = require("fs").promises
const loginControler = (req,res)=>{
    let userobj=req.body;
    let usersList=require("../Models/usersList.json");
    console.log(req.body)
    console.log(userobj)
    let status;
    usersList.forEach(element=>{
        if(element.username==userobj.username){
            if(element.password==userobj.password){         
              status=element;
              return  
            }
            else{
                res.json({status: false,reason: "Incorrect Password !"})
            }
        }
    })
    if(status!=undefined){
        at=jwt.sign(status,process.env.ACCESS_SECRET_KEY,{expiresIn: "30s"});
        rt=jwt.sign(status,process.env.REFRESH_SECRET_KEY,{expiresIn:"1d"});
        res.cookie("RefreshToken",rt,{httpOnly:true})
        res.cookie("user",JSON.stringify(status),{httpOnly:true})
        res.json({AccessToken: at});
    }
    else{
        res.json({status: false,reason: "No such user found !"})
    }
}
module.exports = loginControler