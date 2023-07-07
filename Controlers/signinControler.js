const User=require("../Models/userSchema")

const signinControler=async(req,res)=>{
    let userobj=req.body;
    const result =await User.create(userobj)
    console.log(result)
    res.json(userobj)
}

module.exports=signinControler