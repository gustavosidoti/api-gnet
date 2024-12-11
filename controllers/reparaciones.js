// CONTROLADOR DE REPARACIONES

const { response } = require('express'); // lo desestructuramos para utilizar los res.
// importaciones internas
const Reparaciones = require('../models/reparaciones');


// inicio lógica del controlador

const reparacionesGet = async(req, res = response, next) => {

    const desde = parseInt(req.query.desde, 10) || 0;
    
    const cantidadRep = await Reparaciones.count();
    const bus = req.query.criterio;
    
        // Realizamos la consulta
        const reparaciones = await Reparaciones
        .find({estado: true, reparacionNro: new RegExp( bus, 'i')})
            .populate("elemento")
            .skip(desde)
            .limit(5);


    res.status(200).json({
        ok: true,
        reparaciones: reparaciones,
        cantidad: cantidadRep

    });


};


const reparacionesPost = async (req, res = response) => { // el post de usuarios - Agregar


            // Obtiene la fecha actual
        const fechaActual = new Date();

        // Extrae el día, mes y año
        const dia = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1; // Los meses van de 0 a 11
        const anio = fechaActual.getFullYear();

        // Formatea la fecha en el formato dd/mm/aaaa
        const fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;

    try {

     // 1- obtenemos el ultimo numero de reparación
        let ultimaReparacion = await Reparaciones.count();
        
        if(ultimaReparacion > 0){
        ultimaReparacion = ultimaReparacion + 1;
        }else{
            ultimaReparacion = 1;
        }
        // actualizar
        const reparacionCompleta = new Reparaciones ({
            ...req.body,
            fechaIngreso: fechaFormateada,
            estado: true,
            estadoRep: "En proceso",
            reparacionNro: "REP-" + ultimaReparacion,
            usuario: req.usuario.id
        });


        // guardamos un BD
        const reparacionDB = await reparacionCompleta.save();

        res.status(200).json({
            ok: true,
            reparaciones: reparacionDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    

}

const reparacionesPut = async(req, res = response) => { // el put de usuarios - Actualizar

    const id = req.params.id;
    const uid = req.uid; // uid del usuario porque lo tenemos al pasar por JWT

    try {

        const reparacionDB = await Reparaciones.findById(id);

        if (!reparacionDB) {
            res.status(404).json({
                ok: true,
                msg: 'Reparación no encontrado por id'
            });
        }

        // actualizar
        const cambiosReparacion = {
            ...req.body,
            usuario: uid
        };

        const reparacionActualizada = await Reparaciones.findByIdAndUpdate(id, cambiosReparacion, { new: true });

        res.json({
            ok: true,
            persona: reparacionActualizada
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const reparacionesDelete = async(req, res = response) => { // el delete de usuarios - eliminar

    const id = req.params.id;
    const uid = req.uid; // uid del usuario porque lo tenemos al pasar por JWT

    try {

        const reparacionDB = await Reparaciones.findById(id);

        if (!reparacionDB) {
            res.status(404).json({
                ok: true,
                msg: 'Elemento no encontrado por id'
            });
        }

        // actualizar el estado para no eliminar de BD
        const cambiosReparacion = {
            estado : false,
            usuario: uid
        };

        const reparacionActualizada = await Personas.findByIdAndUpdate(id, cambiosReparacion, { new: true });

        res.json({
            ok: true,
            elemento: reparacionActualizada
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

    const reparacionesPorElementoGet = async (req, res = response) => {

        const desde = req.query.desde | 0; // tomamos el desde de el request
        // Si no viene colocamos 0 por defecto
        
        const cantidadRep = await Reparaciones.count();
    
        const [reparaciones] = await Promise.all([ // ARRAY DE PROMESAS
            Reparaciones
            .find({estado: true, elemento: req.query.criterio}, 'reparacionNro fechaIngreso fechaFinReparacion descripcionReparacion observaciones estadoRep elemento usuario') // los campos que queremos
            .populate("elemento")
            .skip(desde) // se saltea los anteriores a este número
            .limit(5) // nos muestra hasta este número
           
        ]);
    
        res.status(200).json({
            ok: true,
            reparaciones: reparaciones,
            cantidad: cantidadRep
    
        });

    }

    const reparacioPorEstado = async (req, res = response) => {

        const desde = req.query.desde | 0; // tomamos el desde de el request
        // Si no viene colocamos 0 por defecto
        
        const cantidadRep = await Reparaciones.count();
    
        const [reparaciones] = await Promise.all([ // ARRAY DE PROMESAS
            Reparaciones
            .find({estado: true, estadoRep: new RegExp( req.query.estadorep,'i')}, 'reparacionNro fechaIngreso fechaFinReparacion descripcionReparacion observaciones estadoRep elemento usuario') // los campos que queremos
            .populate("elemento")
            .skip(desde) // se saltea los anteriores a este número
            .limit(5) // nos muestra hasta este número
           
        ]);
    
        res.status(200).json({
            ok: true,
            reparaciones: reparaciones,
            cantidad: cantidadRep
    
        });

    }

module.exports = {
    reparacionesGet,
    reparacionesPost,
    reparacionesPut,
    reparacionesDelete,
    reparacionesPorElementoGet,
    reparacioPorEstado
}