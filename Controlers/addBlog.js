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

const getHomeBlogs=async (req,res)=>{
    try{
        let blogsList=await Blogs.find({}).select({username:true,title:true,content:true,blogId:true})
        res.json(blogsList)
    }
    catch(err){
        console.log(err.message)
    }
}

const getBlogById=async(req,res)=>{
    try{
        console.log(req.url)
        let id=req.url.substring(req.url.lastIndexOf('/')+1)
        console.log(id)
        let blog=await Blogs.find({_id:id})
        res.json(blog)
    }catch(err){
        console.log(err.message)
    }
}

module.exports = {addBlog,getHomeBlogs,getBlogById}