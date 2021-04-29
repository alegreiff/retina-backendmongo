const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  rol: {
    type: String,
    required: [true, "El nombre de rol es necesario"],
  },
});

module.exports = model("Role", RoleSchema);
