var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/localdatabase", { useNewUrlParser: true });

var db = mongoose.connection
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.log(err);
  });
  
exports.db = db;
