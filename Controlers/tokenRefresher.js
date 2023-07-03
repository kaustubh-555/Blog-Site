const jwt=require("jsonwebtoken")
const refresh=(req,res)=>{
    try{
    let cookies=req.cookies;
    let refToken=cookies.RefreshToken;
    let userobj=JSON.parse(cookies.user)
    let decodedToken = jwt.verify(refToken,process.env.REFRESH_SECRET_KEY)
    let tokenexp=decodedToken.exp;
    let currentTimestamp = Math.floor(Date.now()/1000)
    if(currentTimestamp>tokenexp){
        res.json({message:"token Expired!"})
    }
    else{
        let newAccessToken = jwt.sign(userobj,process.env.ACCESS_SECRET_KEY,{expiresIn:"30s"})
        res.json({"AccessToken":newAccessToken,"message": "success!"})
    }
}   
catch(err){
    console.log("catch block called !")
    res.cookie('user', '', {expires: new Date(0)});
    res.cookie('RefreshToken', '', {expires: new Date(0)});
    res.json({"message": "Error !"})
}
}
const auth=(req,res)=>{
    try{
        let accessToken = req.body.AccessToken;
        let decodedToken=jwt.verify(accessToken,process.env.ACCESS_SECRET_KEY)
        console.log(decodedToken.signature)
        res.json({status: 'verified',AccessToken: accessToken})     
    }
    catch(err){
        res.json({status:"expired"})
        console.log(err.message)
    }
}
module.exports={refresh,auth}