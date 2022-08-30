/* ------------------------ Importaciones de terceros ----------------------- */
require('dotenv').config();

// importaciones locales
const Server = require('./models/server');

const server = new Server();

server.listen();
