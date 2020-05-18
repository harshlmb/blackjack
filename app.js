const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const services = require("./service");
const dbconnection = require("./dbConnection");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log(req);
  res.status(201).send("welcome to the home page");
});

app.get("/v1/api/start/game/:players_count", services.start);
app.get("/v1/api/start/game/drawcard/:game_id/:player_number", services.draw_new_card);
app.get("/v1/api/start/game/history/:game_id/:player_number", services.get_history);

app.listen(3000, () => {
  console.log("server is running at port 3000");
});
