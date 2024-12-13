// END POINTS DE REPARACIONES

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

const { reparacionesGet, reparacionesPost, reparacionesPut, reparacionesPorElementoGet, reparacioPorEstado, reparacionPorFechas } = require('../controllers/reparaciones');

// Rutas 

const router = Router();

router.get('/', reparacionesGet );
router.get('/buscarPorElemento', [validarJWT], reparacionesPorElementoGet );
router.get('/buscarPorEstado', [validarJWT], reparacioPorEstado );
router.get('/buscarPorFechas', [validarJWT], reparacionPorFechas)

router.post('/', [
        validarJWT,
        check('descripcionReparacion', 'La descripcion es obligatoria').not().isEmpty(), // no esté vacío  
        
], reparacionesPost );

router.put('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
], reparacionesPut ); // requerimos un id

router.delete('/:id', [
        validarJWT,
        esAdminRole,
], reparacionesPut );

// Compartimos el módulo
module.exports = router;
