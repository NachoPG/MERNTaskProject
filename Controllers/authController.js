const Usuario = require('../Models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autentificarUsuario = async (req, res) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    const {email, password} = req.body;

    try {
        //Revisar que sea un usuario registrado
        let user = await Usuario.findOne({email})
        if (!user) {
            return res.status(400).json({msg: 'Este usuario no existe'});
        }

        const passwordCorrect = await bcryptjs.compare(password, user.password);
        if (!passwordCorrect) {
            return res.status(400).json({msg: 'La contraseña es incorrecta'})
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;
            res.json({token});
        })

    } catch (err) {
        console.log(err);
    }

}

exports.usuarioAutenticado = async (req, res) => {

    try {
        const user = await Usuario.findById(req.user.id).select('-password'); // Para que no nos devuelva la password
        res.json({user});


    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Hubo un error'});
    }
}