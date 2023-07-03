const jwt =require("jsonwebtoken")
const path=require("path")
const fspromises = require("fs").promises
const signinControler=(req,res)=>{
    let userobj=req.body;
    let usersList=require("../Models/usersList.json")
    let newUsersList=[...usersList,userobj]
    fspromises.writeFile(path.join(__dirname,"..","Models","usersList.json"),JSON.stringify(newUsersList))
    res.json(userobj)
}
module.exports=signinControler