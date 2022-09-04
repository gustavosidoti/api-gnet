// CONTROLADOR DE CARRERAS

const { response } = require('express'); // lo desestructuramos para utilizar los res.
// importaciones internas
const Carreras = require('../models/carreras');


// inicio lógica del controlador

const carrerasGet = async(req, res = response, next) => {

    const desde = 0; // tomamos el desde de el request
    // Si no viene colocamos 0 por defecto

    const [carreras] = await Promise.all([ // ARRAY DE PROMESAS
        Carreras
        .find({estado: true}, 'nombreCarrera usuario') // los campos que queremos
        .skip(desde) // se saltea los anteriores a este número
        .limit(5), // nos muestra hasta este número

        Carreras.countDocuments()
    ]);

    res.status(200).json({
        ok: true,
        carreras,
    });


};


const carrerasPost = async (req, res = response) => { // el post de usuarios - Agregar

    // al pasar por el token ya nos indica que estamos logueados, tenemos uid
    const uid = req.uid;
    const carrera = new Carreras({
        usuario: uid,
        ...req.body
    });

    try {
        // guardamos un BD
        const carreraDB = await carrera.save();

        res.status(200).json({
            ok: true,
            carreraDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    

}

const carrerasPut = async(req, res = response) => { // el put de usuarios - Actualizar

    const id = req.params.id;
    const uid = req.uid; // uid del usuario porque lo tenemos al pasar por JWT

    try {

        const carreraDB = await Carreras.findById(id);

        if (!carreraDB) {
            res.status(404).json({
                ok: true,
                msg: 'Carrera no encontrada por id'
            });
        }

        // actualizar
        const cambiosCarrera = {
            ...req.body,
            usuario: uid
        };

        const CarreraActualizada = await Carreras.findByIdAndUpdate(id, cambiosCarrera, { new: true });

        res.json({
            ok: true,
            elemento: CarreraActualizada
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const carrerasDelete = async(req, res = response) => { // el delete de usuarios - eliminar

    const id = req.params.id;
    const uid = req.uid; // uid del usuario porque lo tenemos al pasar por JWT

    try {

        const carreraDB = await Carreras.findById(id);

        if (!carreraDB) {
            res.status(404).json({
                ok: true,
                msg: 'Elemento no encontrado por id'
            });
        }

        // actualizar el estado para no eliminar de BD
        const cambiosCarrera = {
            estado : false,
            usuario: uid
        };

        const carreraActualizada = await Carreras.findByIdAndUpdate(id, cambiosCarrera, { new: true });

        res.json({
            ok: true,
            elemento: carreraActualizada
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    carrerasGet,
    carrerasPost,
    carrerasPut,
    carrerasDelete
}