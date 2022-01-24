const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  name:{type: String,require:true},
  branch:{type: String,require :true},
  creator:{type: mongoose.Schema.Types.ObjectID,ref:"User",required:true}


})

module.exports= mongoose.model('Student',StudentSchema)
