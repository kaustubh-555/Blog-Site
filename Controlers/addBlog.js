const Blogs=require("../Models/blogSchema")

const addBlog=async (req,res)=>{
    console.log(req.body)
    try{
        let count = await Blogs.find().count();
        let blogobj=req.body;
        blogobj.blogId=count+1;
        const result = await Blogs.create(blogobj)
        res.json({status:"success"})
    }
    catch(err){
        console.log(err.message)
        res.json({status: "failed"})
    }
}

module.exports = addBlog