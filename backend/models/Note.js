const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        //kisi dusre model ki object id me yaha rkhunga
        type: mongoose.Schema.Types.ObjectId,
        ref:'user' //User.js (model)
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  //ab yeh schema ko use krne k liye export krna hoga : ishko hum routes me use krenge
  module.exports = mongoose.model('notes',NotesSchema)