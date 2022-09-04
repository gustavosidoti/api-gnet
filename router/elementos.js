// END POINTS DE ELEMENTOS

// Importaciones

const { Router } = require('express');
const { check } = require('express-validator');


// Middlewares
const {
        validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole
} = require('../middlewares');


// Importaciones internas

const { elementosGet,
        elementosPost,
        elementosPut,
        elementosDelete } = require('../controllers/elementos');



// Rutas 

const router = Router();

router.get('/', elementosGet );

router.post('/', [
        validarJWT,
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(), // no esté vacío  
        validarCampos // llamamos el middleware que hará la última revisión
], elementosPost );

router.put('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
], elementosPut ); // requerimos un id

router.delete('/:id', [
        validarJWT,
        esAdminRole,
], elementosDelete );

// Compartimos el módulo
module.exports = router;
