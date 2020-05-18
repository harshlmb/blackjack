let mongoose = require("mongoose");

let game_info = new mongoose.Schema({
  game_status : Boolean, 
  round_no : Number, 
  history : [
       {
          player_number : String, 
          is_dealer : Boolean, 
          cards : []
      }
    ], 
  no_of_deck_used : Number,
  remaining_cards:[]
});

module.exports = mongoose.model("game_info", game_info);
