import { Router } from "express";
import config from "../config.js";
import carritoApiArchivo from "../daos/carritos/CarritosDaoArchivo.js";
import CarritosApiFirebase from "../daos/carritos/CarritosDaoFirebase.js";
import carritosApiMongo from "../daos/carritos/CarritosDaoMongoDb.js";
const carrito =
  config.DB === "mongo"
    ? carritosApiMongo
    : carritoApiArchivo || "firebase"
    ? CarritosApiFirebase
    : carritoApiArchivo;

const carritoApiRouter = new Router();

carritoApiRouter.get("/", (req, res) => {
    carrito.listarAll().then(function (result) {
    if (result === undefined) {
      res.status(200).send({message:"no se han encontrado carritos"});
    } else {
      res.status(200).send(result);
    }
  });
});
carritoApiRouter.get("/:id/productos", (req, res) => {
    carrito.listar(req.params.id).then(function (result) {
    if (result === undefined) {
      res.status(200).send({message:`no se ha encontrado un carrito con este ID: ${req.params.id}`});
    } else {
      res.status(200).send(result);
    }
  });
});
carritoApiRouter.post("/", (req, res) => {
    try {
        
      carrito.guardar(req.body).then(function (result) {
          if(result === undefined){
              res
              .status(200)
              .send({ message: "el id de producto ya existe"});
          }else{
              res
              .status(200)
              .send({ message: "el producto se ha creado", producto: result });
          }
        
      });
    } catch (err) {
      console.log("error", err);
    }
  });

carritoApiRouter.post("/:id/productos", (req, res) => {
  try {
      
    carrito.guardar(req.body).then(function (result) {
        if(result === undefined){
            res
            .status(200)
            .send({ message: "el id de producto ya existe"});
        }else{
            res
            .status(200)
            .send({ message: "el producto se ha creado", producto: result });
        }
      
    });
  } catch (err) {
    console.log("error", err);
  }
});

carritoApiRouter.delete("/:id", (req, res) => {
    carrito.borrar(req.params.id).then(function (result) {
    if (result === undefined) {
      res.status(200).send({ message: "el producto no se ha encontrado" });
    } else {
      res
        .status(200)
        .send({ message: "el producto se ha borrado", productoId: result });
    }
  });
});
carritoApiRouter.delete("/:id/productos/:id_prod", (req, res) => {
    carrito.borrarAll(req.params.id).then(function () {
    res.status(200).send({ message: "se han borrado todos los carritos"});
  });
});

export default carritoApiRouter;
