// CONTROLADOR DE CARRERAS
var mongoose = require('mongoose');
const { response } = require('express'); // lo desestructuramos para utilizar los res.
// importaciones internas
const Carrera = require('../models/carreras');



// inicio lógica del controlador

const carrerasGet = async(req, res = response, next) => {

    const desde = req.query.desde | 0; // tomamos el desde de el request
    var criterio = req.query.criterio | "";
    // Si no viene colocamos 0 por defecto
    try {
        
        const cantidadCarreras = await Carrera.count({estado: true});
    
        const [carreras] = await Promise.all([ // ARRAY DE PROMESAS
            Carrera
            .find({estado: true}, 'nombreCarrera' )
            .find({nombreCarrera: new RegExp( req.query.criterio, 'i')}) // ,  los campos que queremos
            .skip(desde) // se saltea los anteriores a este número
            .limit(5) // nos muestra hasta este número
    
          
        ]);
    
        res.status(200).json({
            ok: true,
            carreras,
            cantidad: cantidadCarreras
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


};


const carrerasPost = async (req, res = response) => { // el post de usuarios - Agregar

    // al pasar por el token ya nos indica que estamos logueados, tenemos uid
    
    const carrera = new Carrera(req.body);
    try {
        
        // guardamos un BD
       // const carreraDB = await carrera.save();
        let respuesta = await carrera.save();

        res.status(200).json({
            ok: true,
            msg: respuesta
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

    const id = new mongoose.Types.ObjectId(req.params.id);

    console.log(id);
    
    try {

        const updatedCarrera = await Carrera.findOneAndUpdate({_id: id}, {$set: req.body}, {new: true});
        if(!updatedCarrera) {
          return res.status(404).json({
            error: 'Document not found'
          });
        }
        return res.status(201).json({
          success: 'Document updated',
          msg: 'Carrera Actualizada'
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

   
    // const id = new mongoose.Types.ObjectId(req.params.id);
    let id = req.query.id
    

    try {

        let cambios = {
            estado: false
        }
        
        const updatedCarrera = await Carrera.findOneAndUpdate({_id: id}, {$set: cambios}, {new: true});
        if(!updatedCarrera) {
          return res.status(404).json({
            error: 'Document not found'
          });
        }
        return res.status(201).json({
          success: 'Document updated',
          msg: 'Carrera Eliminada'
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