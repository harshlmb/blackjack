let mongoose = require("mongoose");

let cards = new mongoose.Schema({
  type:String,
  value:Number
});

module.exports = mongoose.model("cards", cards);
