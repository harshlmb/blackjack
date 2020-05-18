let mongoose = require("mongoose");

let players = new mongoose.Schema({
  
    
          name : String, 
          round_no : Number, 
          game_no : Number, 
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
      
 
});

module.exports = mongoose.model("players", players);
