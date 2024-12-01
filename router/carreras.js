// END POINTS DE CARRERAS

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

const { carrerasPost, carrerasGet, carrerasDelete, carrerasPut, carrerasAllGet } = require('../controllers/carreras');

// Rutas 

const router = Router();

router.get('/', carrerasGet );
router.get('/todas', carrerasAllGet );

router.post('/', [
        validarJWT,
        check('nombreCarrera', 'El nombre de la carrera es obligatorio').not().isEmpty(), // no esté vacío  
        validarCampos // llamamos el middleware que hará la última revisión
], carrerasPost );

router.put('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
], carrerasPut ); // requerimos un id

router.delete('/delete', [
        validarJWT,
       // esAdminRole,
       tieneRole('ADMIN_ROLE', 'USER_ROLE'),
], carrerasDelete );

// Compartimos el módulo
module.exports = router;
