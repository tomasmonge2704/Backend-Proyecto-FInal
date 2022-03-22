import { Router } from "express";
import productosApiArchivo from "../daos/productos/ProductosDaoArchivo.js";
import productosApiMongo from "../daos/productos/ProductosDaoMongoDb.js";
import config from "../config.js";
import mongoose from "mongoose";

const productos = config.DB ==="mongo" ? productosApiMongo : productosApiArchivo

if(config.DB === "mongo"){
    async function CRUD(){
        try{
            const URL = 'mongodb+srv://tomas2:1roZJIVtj5JnG5HH@cluster0.nmb6c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
            let rta = await mongoose.connect(URL, {
                useNewUrlParser: true,
                useUnifiedTopology:true
            })
            console.log("base de datos conectada")
        }
        catch (error){
            console.log(`Error en CRUD: ${error}`)
        }
    }
    CRUD()
}
const productosApiRouter = new Router()


productosApiRouter.get('/',(req, res) => {
    const contenido = productos.listarAll()
    console.log(productos.listarAll())
    res.status(200).send(contenido);
})

productosApiRouter.get('/:id',(req, res) => {
    const contenido = productos.listar(req.params.id)
    console.log(contenido)
    res.status(200).send();
})

productosApiRouter.post('/',(req, res) => {
    const contenido = productos.guardar()
    console.log(contenido)
    res.status(200).send();
})
productosApiRouter.put('/:id',(req, res) => {
    const contenido = productos.modificar(req.params.id)
    console.log(contenido)
    res.status(200).send();
})
productosApiRouter.delete('/:id',(req, res) => {
    const contenido = productos.borrar(req.params.id)
    console.log(contenido)
    res.status(200).send();
})

export default productosApiRouter