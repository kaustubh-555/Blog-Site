const mongoose=require("mongoose")
const schema=mongoose.Schema

const userSchema=new schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})
module.exports= mongoose.model('User',userSchema)