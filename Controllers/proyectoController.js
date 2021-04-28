const Proyecto = require('../Models/Proyecto');
const Tarea = require('../Models/Tarea');

const {validationResult} = require('express-validator');

exports.crearProyecto = async (req, res) => {

    //REvisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    try {
        const proyecto = new Proyecto(req.body);

        //Guardar el creador via JWT
        proyecto.creador = req.user.id

        //Guardamos el proyecto
        await proyecto.save();
        res.json(proyecto);


    } catch (err) {
        console.log(err);
        res.status(404).send('Hubo un error')
    }

}

//Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({creador: req.user.id});
        res.json({proyectos});
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Hubo un error'});
    }

}

//Actualizar un proyecto
exports.actualizarProyecto = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }
    const {nombre} = req.body;
    const nuevoProyecto = {};

    if (nombre) {
        nuevoProyecto.nombre = nombre;
    }

    try {
        //Revisar el id que exista un proyecto
        let proyecto = await Proyecto.findById(req.params.id);

        //si el proyecto existe o no
        if (!proyecto) {
            return res.status(404).json({msg: 'Proyecto encontrado'});
        }


        //Verificar el creador del proyecto
        if (proyecto.creador.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'})
        }
        //Actualziar el proyecto
        proyecto = await Proyecto.findOneAndUpdate({_id: req.params.id}, {$set: nuevoProyecto}, {new: true});
        return res.json({proyecto});

    } catch (err) {
        console.log(err);
        res.status(500).send('Error en el servidor');
    }
}

//Eliminar un Proyecto
exports.eliminarProyecto = async (req, res) => {

    try {
        //Revisar el id que exista un proyecto
        let proyecto = await Proyecto.findById(req.params.id);
        //si el proyecto existe o no
        if (!proyecto) {
            return res.status(404).json({msg: 'Proyecto encontrado'});
        }
        //Verificar el creador del proyecto
        if (proyecto.creador.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'})
        }

        //Eliminar el Proyecto
        await Tarea.deleteMany({ proyecto: req.params.id });
        await Proyecto.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Proyecto eliminado'});


    } catch (err) {
        console.log(err);
        res.status(500).send('Error en el servidor');

    }

}