const mongoose = require('mongoose');

const noteSchema =mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    }
},
{timestamps:true}
)
const Notes = mongoose.model('Notes',noteSchema);

module.exports = Notes;