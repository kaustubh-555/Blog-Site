const userdetails=(req,res)=>{
    let usercookie=JSON.parse(req.cookies.user);
    res.json(usercookie)
}
module.exports=userdetails