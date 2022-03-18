import { Router } from "express";
import ContenedorMongo from "../contenedores/ContentedorMongoDb.js";
import ContenedorArchivo from "../contenedores/ContenedorArchivo.js";

// const productos = process.env.DB =="mongo" ? ContenedorMongo : ContenedorArchivo
    
const productos = ContenedorArchivo
const productosApiRouter = new Router()

productosApiRouter.get('/'),(req, res) => {
    //productos.listar()
    res.status(200).send("funcions");
}

export default productosApiRouter