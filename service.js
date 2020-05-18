const blackjack = require("./models/balckjack");
const players = require("./models/players");
const cards = require("./models/cards");
const game_info = require("./models/game_info");
const helper = require("./helpers/helper");
const response = require("./response");

const service = {
 
  start: (req, res) => {
    cards
      .find({})
      .then((result) => {
        let totalcards = result.concat(result.concat(result));
        let shuffled_cards = helper.shuffle(totalcards);
        let data = [];

        for (let i = 0; i < req.params.players_count; i++) {
          let count = 0;
          let obj = {
            player_number: 1,
            cards: [],
          };
          while (count < 2) {
            obj.player_number = i + 1;

            obj.cards.push({
              type: shuffled_cards[shuffled_cards.length - 1].type,
              value: shuffled_cards[shuffled_cards.length - 1].value,
            });

            shuffled_cards = shuffled_cards.splice(
              0,
              shuffled_cards.length - 1
            );

            if (count == 1) data.push(obj);

            count++;
          }
        }
        let obj2 = {
          player_number: 0,
          cards: [],
        };
        obj2.cards.push({
          type: shuffled_cards[shuffled_cards.length - 1].type,
          value: shuffled_cards[shuffled_cards.length - 1].value,
        });
        shuffled_cards = shuffled_cards.splice(0, shuffled_cards.length - 1);
        obj2.cards.push({
          type: shuffled_cards[shuffled_cards.length - 1].type,
          value: shuffled_cards[shuffled_cards.length - 1].value,
        });
        data.push(obj2);
        let final_obj = {
          remaining_cards: shuffled_cards,
          players_cards: data,
        };
      
        service.create_new_game(final_obj);
        res.status(200).send(response.success(final_obj));
      })
      .catch((err) => {
        console.log("err", err);
        res.status(200).send(response.fail(err));
      });
  },

  create_new_game: (game_data) => {
    let new_game = new game_info({
      remaining_cards: game_data.remaining_cards,
      no_of_deck_used: 3,
      game_status: true,
      history: game_data.players_cards,
    });

    new_game
      .save(new_game)
      .then((result) => {
        console.log("Game created", result);
      })
      .catch((err) => {
        console.log("err", err);
        throw err;
      });
  },

  draw_new_card: (req, res) => {
    game_info.find({ _id: req.params.game_id }).then((result) => {
      let obj = {
        player_number: "",
        cards: [],
      };
      let data = [];

      obj.player_number = req.params.player_number;

      obj.cards.push({
        type:
          result[0].remaining_cards[result[0].remaining_cards.length - 1].type,
        value:
          result[0].remaining_cards[result[0].remaining_cards.length - 1].value,
      });

      result[0].remaining_cards = result[0].remaining_cards.splice(
        0,
        result[0].remaining_cards.length - 1
      );

      data.push(obj);

    
      game_info
        .update(
          { _id: req.params.game_id },
          {
            $set: { remaining_cards: result[0].remaining_cards },
            $push: { history: data },
          }
        )
        .then((res) => {
      
        });
      res.status(200).send(response.success(data));
     
    });
  },

  // history function
  get_history: (req, res) => {
    game_info
      .find({
        _id: req.params.game_id,
        history: {
          $elemMatch: {
            player_number: req.params.player_number,
          },
        },
      })
      .then((result) => {
        
        let player_history = result[0].history.filter((e)=>{
          if (e.player_number == req.params.player_number) return e
        })
        res.status(200).send(response.success(player_history));
      });
  },
};

module.exports = service;
