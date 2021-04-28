const express = require('express');
const router = express.Router();
const tareaController = require('../Controllers/tareaController');
const auth = require('../Middleware/auth');
const {check} = require('express-validator');


//api/tareas
router.post('/', auth, [
    check('nombre', 'El nombre de la Tarea es obligatorio').not().isEmpty(),
    check('proyecto', 'El proyecto es obligatorio').not().isEmpty()

], tareaController.crearTarea)


//Obtener las tareas por Proyecto
router.get('/', auth, tareaController.obtenerTareas);

//Actualizar Tareas
router.put('/:id',auth,tareaController.actualizarTarea);

//Eliminar Tareas
router.delete('/:id',auth,tareaController.eliminarTarea);

module.exports = router;