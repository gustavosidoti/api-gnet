const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
        usuarios: '/api/usuarios',
        carreras: '/api/carreras',
        elementos: '/api/elementos',
        prestamos: '/api/prestamos',
        personas: '/api/personas',
        reparaciones: '/api/reparaciones',
        //historiales: '/api/historiales',
        //buscar: '/api/buscar',
        auth : '/api/auth'
        }
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
        this.app.use( this.paths.auth, require('../router/auth'));
        //this.app.use( this.paths.buscar, require('../router/buscar'));
        this.app.use( this.paths.carreras, require('../router/carreras'));
        this.app.use( this.paths.elementos, require('../router/elementos'));
        //this.app.use( this.paths.historiales, require('../router/historiales'));
        this.app.use( this.paths.personas, require('../router/personas'));
        this.app.use( this.paths.prestamos, require('../router/prestamos'));
        this.app.use( this.paths.reparaciones, require('../router/reparaciones'));
        this.app.use( this.paths.usuarios, require('../router/usuarios'));
        
        

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });

    }

}

module.exports = Server;
