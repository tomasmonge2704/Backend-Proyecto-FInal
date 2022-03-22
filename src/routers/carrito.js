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
       
      res.status(200).send(result[0].productos);
    }
  });
});
carritoApiRouter.post("/", (req, res) => {
    try {
        
      carrito.guardar(req.body).then(function (result) {
          if(result === undefined){
              res
              .status(200)
              .send({ message: "el id de carrito ya existe"});
          }else{
              res
              .status(200)
              .send({ message: "el carrito se ha creado", carrito: result });
          }
        
      });
    } catch (err) {
      console.log("error", err);
    }
  });

carritoApiRouter.post("/:id/productos", (req, res) => {
  try {
      
    carrito.actualizar(req.body,req.params.id).then(function (result) {
        if(result === undefined){
            res
            .status(200)
            .send({ message: "No se ha podido guardar"});
        }else{
            res
            .status(200)
            .send({ message: "productos agregadors:", producto: result });
        }
      
    });
  } catch (err) {
    console.log("error", err);
  }
});

carritoApiRouter.delete("/:id", (req, res) => {
    carrito.borrar(req.params.id).then(function (result) {
    if (result === undefined) {
      res.status(200).send({ message: "el carrito no se ha encontrado" });
    } else {
      res
        .status(200)
        .send({ message: "el carrito se ha borrado", carrito: result });
    }
  });
});
carritoApiRouter.delete("/:id/productos/:id_prod", (req, res) => {
    carrito.borrar(req.params.id,req.params.id_prod).then(function (result) {
    res.status(200).send(`se ha borrado este producto: ${result}`);
  });
});

export default carritoApiRouter;
