//RUTAS PARA AUTENTICAR USUARIOS
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../Controllers/authController');
const auth = require('../Middleware/auth');



//Iniciar sesion
//  api/auth
router.post('/',authController.autentificarUsuario);

router.get('/',auth,authController.usuarioAutenticado);

module.exports = router;