// END POINTS DE PERSONAS

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

const {personasGet,
       personasPost,
       personasPut,
       personasDelete } = require('../controllers/personas');



// Rutas 

const router = Router();

router.get('/', personasGet );

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(), // no esté vacío  
        validarCampos // llamamos el middleware que hará la última revisión
], personasPost );

router.put('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
], personasPut ); // requerimos un id

router.delete('/:id', [
        validarJWT,
        esAdminRole,
], personasDelete );

// Compartimos el módulo
module.exports = router;
