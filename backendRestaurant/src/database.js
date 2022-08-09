const mongoose = require("mongoose");
//URL = "mongodb://localhost/restaurantApp";
URL = ("mongodb+srv://LauCaicedo:1234@cluster0.xquioqa.mongodb.net/?retryWrites=true&w=majority");

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Base de datos conectada:", db.connection.name))
  .catch((error) => console.log(error));

module.exports = mongoose;
