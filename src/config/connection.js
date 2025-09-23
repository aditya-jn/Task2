const mongoose = require('mongoose');

const connectDb = async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/task2')
        console.log("Connected Successfully");
    }
    catch(err){
        console.log("Error occured",err)
    }
}

module.exports = connectDb;