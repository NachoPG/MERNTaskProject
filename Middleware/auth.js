const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    //leer el token del header
    const token = req.header('x-auth-token');
    console.log(token);

    //Revisar si no hay token
    if (!token) {
        return res.status(401).json({msg: 'No hay token, permiso no valido'});
    }

    //Verificar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRET);
        req.user = cifrado.user;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Token no valido'});
    }
}