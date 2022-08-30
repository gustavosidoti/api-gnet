const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Middlewares - funciones predefinidas
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

    }

    middlewares(){

        // CORS
        this.app.use( cors() );

        // Parseo y lectura del body
        this.app.use( express.json() ); // lo que venga lo va a meter en json

        // Base de datos
        dbConnection();


        // Directorio público
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.authPath, require('../router/auth'));
        this.app.use( this.usuariosPath, require('../router/usuarios'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });

    }

}

module.exports = Server;
