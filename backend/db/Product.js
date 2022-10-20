const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   bookName:String,
   description:String,
   authorName:String,
   imageUrl:String
});

module.exports = mongoose.model("products",productSchema);