
import * as model from '../models/usuario.js'

class ContenedorMongo{

    constructor(ruta){
        this.ruta = ruta;
    }
    async listar(id) {
        const buscado = await model.productos.find({id:id})
        return buscado
    }
    async listarAll(){
        try {
            let productos = await model.productos.find({})
            return productos
        } catch (error){
            return console.log("error", err);
        }
    }

    async guardar(elem){
        const e = await new model.productos(elem).save()
         return e
    }
    async actualizar(elem) {
        console.log(elem)
         let productoUpdate = await model.productos.updateOne( {nombre:elem.nombre}, {$set:{elem}})
         return productoUpdate
    }
    async borrar(id) {
        let prodDelete = await model.productos.deleteOne({_id:id})
        return prodDelete
    }
    async borrarAll(){
        await model.productos.deleteMany({})
    }
}

export default ContenedorMongo