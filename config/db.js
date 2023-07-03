const mongoose = require('mongoose');
const config = require('config');
const connectDB = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017");
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB; 