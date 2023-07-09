const mongoose=require("mongoose")
const blogSchema = mongoose.Schema({
    blogId: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})
module.exports=mongoose.model('Blogs',blogSchema)