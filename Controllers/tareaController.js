const Tarea = require('../Models/Tarea');
const Proyecto = require('../Models/Proyecto');
const {validationResult} = require("express-validator");


exports.crearTarea = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }


    try {

        const {proyecto} = req.body;

        //Extraer el proyecto y comprobar si existe - ID
        const existProyecto = await Proyecto.findById(proyecto);
        if (!existProyecto) {
            res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        //Revisar si el proyecto acutal pertenece al usuario que ha iniciado sesion
        if (existProyecto.creador.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        //Creamos tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});

    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error en el servidor');
    }


}

exports.obtenerTareas = async (req, res) => {

    const {proyecto} = req.query;


    try {
        const existProject = await Proyecto.findById(proyecto);
        if (!existProject) {
            res.status(404).json({msg: 'No hay ningun proyecto con la id proporcionada'});
        }

        if (existProject.creador.toString() !== req.user.id) {
            res.status(401).json({msg: 'No autorizado'});
        }

        //Obtener las tareas por Proyecto
        const getTareas = await Tarea.find({proyecto}).sort({fecha: -1});
        res.json({Tareas: getTareas});


    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error en el servidor');
    }

}

exports.actualizarTarea = async (req, res) => {

    try {
        const {proyecto, nombre, estado} = req.body;

        const existTarea = await Tarea.findById(req.params.id);
        if (!existTarea) {
            res.status(404).json({msg: 'Esta tarea no existe'});
        }

        const existProject = await Proyecto.findById(proyecto);
        if (existProject.creador.toString() !== req.user.id) {
            res.status(401).json({msg: 'No autorizado'});
        }

        const nuevaTarea = {};
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;


        const tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new: true});
        res.json({tarea});

    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error en el servidor');
    }

}

exports.eliminarTarea = async (req, res) => {


    try {
        const {proyecto} = req.query;

        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            res.status(404).json({msg: 'No ha encontrado una tarea con la id proporcionada'});
        }

        const existProyecto = await Proyecto.findById(proyecto);
        if (existProyecto.creador.toString() !== req.user.id) {
            res.status(401).json({msg: 'Usuario no autorizado'});
        }

        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Se ha eliminado con exito'});

    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error');
    }
}