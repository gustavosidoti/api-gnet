//Importaciones 
const mongoose = require('mongoose'); // referencia a la librería


const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {});
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs')
    }

};

module.exports = {
    dbConnection
};