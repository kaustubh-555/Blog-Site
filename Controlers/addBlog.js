const Blogs=require("../Models/blogSchema")

const addBlog=async (req,res)=>{
    console.log(req.body)
    try{
        const result = await Blogs.create(req.body)
        res.json({status:"success"})
    }
    catch(err){
        console.log(err.message)
        res.json({status: "failed"})
    }
}

module.exports = addBlog