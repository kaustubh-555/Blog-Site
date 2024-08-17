const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const uri = process.env.MONGOOSE_URI;
        console.log(`Connecting to MongoDB with URI: ${uri}`);
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
};

module.exports = connectDB;
