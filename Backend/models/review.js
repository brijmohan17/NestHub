const mongoose=require("mongoose");
const User=require('./user.js');
const { required } = require("joi");
const Schema=mongoose.Schema;

const reviewSchema=new Schema({
    comment:String,
    rating:{
        type:Number,
        min:0,
        max:5,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
})

module.exports = mongoose.model('Review', reviewSchema);