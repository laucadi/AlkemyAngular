const usuarioCtrl = {};
const usuarioModels = require("../models/usuario.models");
const jwt = require("jsonwebtoken");


usuarioCtrl.crear = async (req, res) => {
  const {
    correo,
    contrasena
  } = req.body;
  const nuevoUsuario = new usuarioModels({
    correo,
    contrasena
  });
  const correoUsuario = await usuarioModels.findOne({ correo: correo });
  if (correoUsuario) {
    res.json({
      mensaje: "Este usuario ya existe, trata con un nuevo correo",
    });
  } else {
    nuevoUsuario.contrasena = contrasena;
    const token = jwt.sign({ _id: nuevoUsuario._id }, "Secreta");
    await nuevoUsuario.save();
    res.json({
      mensaje: "Bienvenido",
      id: nuevoUsuario._id,
      correo: nuevoUsuario.correo,
      contrasena: nuevoUsuario.contrasena,
      token
    });
  }
};

usuarioCtrl.login = async (req, res) => {
  const { correo, contrasena } = req.body;
  const usuario = await usuarioModels.findOne({ correo: correo});
  if (!usuario) {
    return res.json({
      mensaje: "correo Incorrecto",
    });
  }
  const coincide = await usuarioModels.findOne({ contrasena: contrasena});

  if (coincide) {
    const token = jwt.sign({ _id: usuario._id }, "Secreta");
    res.json({
      mensaje: "Bienvenido",
      id: usuario.id,
      token,
    });
  } else {
    res.json({
      mensaje: "Contrasena incorrecta",
    });
  }
};
module.exports = usuarioCtrl;
