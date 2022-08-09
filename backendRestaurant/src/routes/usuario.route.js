const { Router } = require("express");
const router = Router();
const usuarioCtrl = require("../controller/usuario.controller");

router.post("/loginUsuario", usuarioCtrl.login);
router.post("/crearUsuario", usuarioCtrl.crear);

module.exports = router;
