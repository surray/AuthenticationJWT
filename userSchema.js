const mongoose =require('mongoose');

const UserSchema =mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
        },
    email:{
        type:String,
        required:true,
        },
    password:{
        type:String,
        required:true,
        }

});
module.exports = mongoose.model('User',UserSchema);