// Importar módulos
const mongoose = require("mongoose");

// Definir un esquema o estructura que tendrán los documentos
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Se crea y exporta el modelo User que se conecta con MongoDB, en donde se convierte a la colección users. Cuando se usa require('./models/User') esto es lo que se devuelve
module.exports = mongoose.model("User", UserSchema);
