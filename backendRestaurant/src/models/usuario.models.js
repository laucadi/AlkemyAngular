const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const usuarioSchema = new Schema(
  
  {
  correo: String,  
  contrasena:  String , 
}
);
module.exports = mongoose.model("usuario", usuarioSchema);
