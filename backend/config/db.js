const mongoose = require('mongoose');

const connectDb = async ()=>{
    try{
         await mongoose.connect('mongodb://localhost:27017/notes-db');
         console.log('mongodb connected');
    }
    catch(err){
        console.log(err);
    }

}

module.exports = connectDb;