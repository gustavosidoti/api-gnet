// ARCHIVO PARA DEFINIR RUTAS DE AUTH

// Importaciones de terceros

const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const {
    validarCampos,
} = require('../middlewares');

// importaciones internas

const { login } = require('../controllers/auth');

// código de este archivo

// Rutas

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoriaaaaaaaaaaa').not().isEmpty(),
    validarCampos
],login );

// EXPORTACIONES 
module.exports = router;
