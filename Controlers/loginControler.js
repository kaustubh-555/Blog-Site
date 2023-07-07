const jwt =require("jsonwebtoken")
const User = require("../Models/userSchema")

const loginControler = async(req,res)=>{
    let userobj=req.body;
    console.log(req.body)
    console.log(userobj)
    let status;
    const result= await User.findOne({username:userobj.username}).exec()
    if(result){
        if(result.password==userobj.password){
            let userinfo={
                username: result.username,
                password: result.password,
                gender: result.gender,
                role: result.role
            }
            status=userinfo
        }
    }
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