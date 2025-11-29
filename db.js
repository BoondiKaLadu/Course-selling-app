const  mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:Aditya%401320@cluster0.pj1eck8.mongodb.net/Course-selling");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;



const userSchema = new Schema({
email : {type : String, unique : true},
password : String,
firstName : String,
lastName: String

});

const adminSchema = new Schema({
email : {type : String, unique : true},
password : String,
firstName : String,
lastName: String,

});

const coursesSchema = new Schema({
title : String,
description : String,
price: Number,
imageurl : String,
creatorId : ObjectId


});


//user will also purchase some schema 

const purchaseSchema = new Schema({
// this user (tagged by his object id) 
// purchased a course (tagged by his object id)

userId :ObjectId,
courseId : ObjectId


});

const userModel     = mongoose.model("user", userSchema);
const adminModel    = mongoose.model("admin", adminSchema);
const courseModel   = mongoose.model("course", coursesSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);




module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
};