const disreq=(req,res,next)=>{
    console.log(req.url)
    next();
}

module.exports=disreq