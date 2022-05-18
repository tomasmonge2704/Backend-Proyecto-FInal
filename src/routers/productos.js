import { Router } from "express";
import productosApiArchivo from "../daos/productos/ProductosDaoArchivo.js";
import productosApiMongo from "../daos/productos/ProductosDaoMongoDb.js";
import productosApiFirebase from "../daos/productos/ProductosDaoFirebase.js";
import config from "../config.js";

let productos = productosApiArchivo
if(config.DB === "mongo"){
    productos = productosApiMongo
}
if(config.DB === "firebase"){
    productos = productosApiFirebase
} 

const productosApiRouter = new Router();
let contenido = []
productosApiRouter.get("/", (req, res) => {
  try {
    productos.listarAll().then(function (result) {
      contenido = result
      res.status(200).render('productos',{contenido})
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

productosApiRouter.get("/:id", (req, res) => {
  productos.listar(req.params.id).then(function (result) {
    if (result === undefined) {
      res.status(200).send({message:`no se ha encontrado un producto con este ID: ${req.params.id}`});
    } else {
      res.status(200).send(result);
    }
  });
});

productosApiRouter.post("/", (req, res) => {
  try {
      
    productos.guardar(req.body).then(function (result) {
        if(result === undefined){
            res
            .status(200)
            .send({ message: "el id de producto ya existe"});
        }else{
            res
            .status(200)
            .redirect('/')
        }
      
    });
  } catch (err) {
    console.log("error", err);
  }
});
productosApiRouter.put("/:id", (req, res) => {
  productos.actualizar(req.body,req.params.id).then(function (result) {
    if (result === undefined) {
      res
        .status(200)
        .send({ message: "el producto no se ha encontrado" });
    } else {
      res
        .status(200)
        .send({ message: "el producto se ha actualizado", productoId: result });
    }
  });
});
productosApiRouter.delete("/:id", (req, res) => {
  productos.borrar(req.params.id).then(function (result) {
    if (result === undefined) {
      res.status(200).send({ message: "el producto no se ha encontrado" });
    } else {
      res
        .status(200)
        .send({ message: "el producto se ha borrado", productoId: result });
    }
  });
});
productosApiRouter.delete("/", (req, res) => {
  productos.borrarAll(req.params.id).then(function () {
    res.status(200).send({ message: "se han borrado todos los productos"});
  });
});

export default productosApiRouter;
