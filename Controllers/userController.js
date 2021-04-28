const Usuario = require('../Models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }
    const {email, password} = req.body;

    try {
        //Revisar que el usuario registrado sea unico


        let user = await Usuario.findOne({email});
        if (user) {
            return res.status(400).json({msg: 'El usuario ya existe'});
        }

        user = new Usuario(req.body);

        //Hashear el password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt); //El metodo hash necesita dos parametros ( el string de password y el metodo para encriptar salt)


        await user.save();

        //Crear y firmar JsonWebToken
        const payload = {
            user: {
                id:user.id
            }
        };
        //Firmar el JWT
        jwt.sign(payload,process.env.SECRET, {
            expiresIn: 3600
        }, (err, token) =>{
            if(err) throw err;
            res.json({token});

        });

    } catch (err) {
        console.log(err);
        res.status(400).send('Ha habido un error');
    }

}