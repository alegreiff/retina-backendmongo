const { Schema, model } = require("mongoose");

const PeliculaSchema = Schema({
  rol: {
    type: String,
    required: [true, "El nombre de rol es necesario"],
  },
});

module.exports = model("Pelicula", RoleSchema);
