const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const condicion = { estado: true };
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(condicion),
    Usuario.find(condicion).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};
const usuariosPost = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //VERIFICAR SI EL CORREO EXISTE

  /* const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return res.status(400).json({
      msg: "CORREO Ya REGISTRADO",
    });
  } */
  //ENCRIPTAR LA CONTRASEÑA
  const salt = bcryptjs.genSaltSync();
  console.log("USUARIO", usuario);
  usuario.password = bcryptjs.hashSync(password, salt);
  console.log("CRYPT_USER", usuario);

  //GUARDAR EN BD

  await usuario.save();

  res.json({
    msg: "POST api from CTRL",
    usuario,
  });
};
const usuariosPut = async (req, res) => {
  const id = req.params.id;
  const { _id, password, google, correo, ...resto } = req.body;
  //TODO validar ID vs Database
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.json(usuario);
};
const usuariosPatch = (req, res) => {
  res.json({
    msg: "PATCH api from CTRL",
  });
};
const usuariosDelete = async (req, res) => {
  const { id } = req.params;

  //BORRADO REAL
  //const usuario = await Usuario.findByIdAndDelete(id);

  //UPDATE DE ESTADO
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({
    id,
    borrado: usuario,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
  usuariosPut,
};
