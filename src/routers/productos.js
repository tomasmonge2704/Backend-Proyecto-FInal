import { Router } from "express";
import productosApiArchivo from "../daos/productos/ProductosDaoArchivo.js";
import productosApiMongo from "../daos/productos/ProductosDaoMongoDb.js";
const productos = process.env.DB =="sql" ? productosApiMongo : productosApiArchivo

const productosApiRouter = new Router()


productosApiRouter.get('/',(req, res) => {
    const contenido = productos.listarAll()
    console.log(contenido)
    res.status(200).send();
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