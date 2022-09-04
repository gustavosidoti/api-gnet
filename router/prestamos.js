// END POINTS DE PRESTAMOS

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

const { prestamosGet, prestamosPost, prestamosPut, prestamosDelete } = require('../controllers/prestamos');

// Rutas 

const router = Router();

router.get('/', prestamosGet );

router.post('/', [
        validarJWT,  
        validarCampos // llamamos el middleware que hará la última revisión
], prestamosPost );

router.put('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
], prestamosPut ); // requerimos un id

router.delete('/:id', [
        validarJWT,
        esAdminRole,
], prestamosDelete );

// Compartimos el módulo
module.exports = router;
