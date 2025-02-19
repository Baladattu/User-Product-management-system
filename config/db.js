const mongoose = require('mongoose');

const connectDB = async (req, res) => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Database');
    }catch(err){
        res.status(500).json({message:'Error Connecting to Database'});
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;