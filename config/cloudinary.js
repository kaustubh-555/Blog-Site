const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.Cuser,
    api_key: process.env.Capi,
    api_secret: process.env.Csecret
});

module.exports=cloudinary;