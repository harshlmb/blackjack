let mongoose = require("mongoose");

let blackJack = new mongoose.Schema({
  game_status : Boolean, 
  history : {
      player_info : {
          name : String, 
          round_no : Number, 
          is_dealer : Boolean, 
          cards : [
              {
                  type : String, 
                  value : Number
              }, 
              {
                  type : String, 
                  value : Number
              }
          ]
      }
  }, 
  no_of_deck_used : Number
});

module.exports = mongoose.model("blackjack", blackJack);
