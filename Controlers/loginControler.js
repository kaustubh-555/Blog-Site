const jwt =require("jsonwebtoken")
const path=require("path")
const fspromises = require("fs").promises
let users = {
    usersList : require("../Models/usersList.json"),
    updateUsers : (data)=>{
        this.usersList=data;
    }
}
let tokens={
    tokenList : require("../Models/refreshTokens.json"),
    updateTokens: (data)=>{
        
    }
}
const loginControler = (req,res)=>{
    let username = req.body.username;
    let password  =req.body.password;
    let status = false;
    users.usersList.forEach(element=>{
        if(element.username==username){
            if(element.password == password){
                status = true;
                userobj={
                    username : username,
                    password : password
                }
                let token=jwt.sign(userobj,process.env.ACCESS_SECRET_KEY,{expiresIn:"30s"})
                let refToken = jwt.sign(userobj,process.env.REFRESH_SECRET_KEY,{expiresIn:"1d"})
                res.cookie("RefreshToken",refToken,{httpOnly:true})
                userobj.AccessToken=token
                res.json(userobj);
                userobj.refreshToken=refToken
                for(let i=0;i<tokens.tokenList.length;i++){
                    if(userobj.username==tokens.tokenList[i].username){
                        tokens.tokenList[i].refreshToken=userobj.refreshToken
                    }
                }
                fspromises.writeFile(path.join(__dirname,"..","Models","refreshTokens.json"),JSON.stringify(tokens.tokenList))
                return
            }
        }
    })
    if(!status)
    res.json({"message": status});
}
const refresh=(req,res)=>{
    try{
        let cookies=req.cookies;
        let refToken=cookies.RefreshToken;
        let decodedToken = jwt.verify(refToken,process.env.REFRESH_SECRET_KEY)
        let tokenexp=decodedToken.exp;
        let currentTimestamp = Math.floor(Date.now()/1000)
        if(currentTimestamp>tokenexp){
            res.json({message:"Need to Log Out !"})
        }
        else{
            for(let i=0;i<tokens.tokenList.length;i++){
                if(tokens.tokenList[i].refreshToken==refToken){
                    let userobj={
                        username: tokens.tokenList[i].username,
                        password: tokens.tokenList[i].password
                    }
                    let newToken = jwt.sign(userobj,process.env.ACCESS_SECRET_KEY,{expiresIn:"30s"})
                    let refreshobj = {
                        status: true,
                        accessToken: newToken,
                        username: tokens.tokenList[i].username
                    }
                    res.json(refreshobj)
                    return
                }
            }
            res.json({status: false})
        }
    }
    catch(err){
        console.log(err.message)
        res.json({status: false})
    }
        
}
const auth = (req,res)=>{
    let token = req.body.token;
    console.log(req.body)
    console.log(token)
    try{
        let decodedToken =jwt.verify(token,process.env.ACCESS_SECRET_KEY);
        
        let currentTimestamp= Math.floor(Date.now/1000);
        let tokenTimeStamp=decodedToken.exp; 

        if(currentTimestamp>tokenTimeStamp){
            res.json({status : "expired"})
            console.log(1)
            
        }else{
            res.json({"status" : "verified"})
            console.log(2)
        }
    }catch(err){
        console.log(err.message)
        res.json({status : "verification Failed"})    
    }
}
module.exports = {loginControler,auth,refresh};