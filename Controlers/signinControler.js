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
        this.tokenList=data
    }
}
const signinControler=(req,res)=>{
    console.log(req.body)
    userobj=req.body
    let token=jwt.sign(userobj,process.env.ACCESS_SECRET_KEY,{expiresIn:"30s"})
    let refToken = jwt.sign(userobj,process.env.REFRESH_SECRET_KEY,{expiresIn:"1d"})
    res.cookie("RefreshToken",refToken,{httpOnly:true})
    userobj.AccessToken=token
    res.json(userobj);
    let newUserList=[...users.usersList,userobj]
    fspromises.writeFile(path.join(__dirname,"..","Models","usersList.json"),JSON.stringify(newUserList));
    userobj.refreshToken=refToken
    users.updateUsers(newUserList)
    let newTokensList=[...tokens.tokenList,{username: userobj.username,password:userobj.password,refreshToken:userobj.refreshToken}]
    fspromises.writeFile(path.join(__dirname,"..","Models","refreshTokens.json"),JSON.stringify(newTokensList))
    tokens.updateTokens(newTokensList)
}

module.exports=signinControler