//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../Controllers/userController');
const {check} = require('express-validator');


//Crea un usuario
//  api/users
router.post('/',[
    check('nombre','El nombre de usuario es obligatorio').not().isEmpty(),
    check('email','El email debe ser un correo valido').isEmail(),
    check('password','El password debe ser minimo de 6 caracteres').isLength({min: 6})
], usuarioController.crearUsuario);


module.exports = router;