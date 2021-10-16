const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
  });


  const User = mongoose.model('user',UserSchema)
  //User.createIndexes();  //(mongodb comapss me indexs me bani hai email k liye)yeh same user ki double entry na ho ishliye likha h
  //ab yeh schema ko use krne k liye export krna hoga : ishko hum routes me use krenge
  module.exports = User