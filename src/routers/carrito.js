import { Router } from "express";
import config from "../config.js";
import carritoApiArchivo from "../daos/carritos/CarritosDaoArchivo.js";
import CarritosApiFirebase from "../daos/carritos/CarritosDaoFirebase.js";
import carritosApiMongo from "../daos/carritos/CarritosDaoMongoDb.js";

let carrito = carritoApiArchivo;
if (config.DB === "mongo") {
  carrito = carritosApiMongo;
}
if (config.DB === "firebase") {
  carrito = CarritosApiFirebase;
}

const carritoApiRouter = new Router();
let contenido = [];

carritoApiRouter.get("/:id/productos", (req, res) => {
  carrito.listar(req.params.id).then(function (result) {
    if (result === undefined) {
      res.status(200).render("carrito", { contenido });
    } else {
      contenido = result[0];
      contenido = contenido.productos;
      console.log(contenido);
      res.status(200).render("carrito", { contenido });
    }
  });
});
carritoApiRouter.post("/", (req, res) => {
  try {
    carrito.guardar(req.body).then(function (result) {
      if (result === undefined) {
        res.status(200).send({ message: "el id de carrito ya existe" });
      } else {
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
    carrito.listar(req.params.id).then(function (result) {
      if (result == undefined) {
        carrito.guardar(req.body);
        res.status(200).render("carrito", { contenido });
        
      } else {
        carrito.actualizarProd(req.body, req.params.id).then(function (result) {
          if (result === undefined) {
            res.status(200).send({ message: "No se ha podido guardar" });
          } else {
            res.status(200).render("carrito", { contenido });
          }
        });
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
  carrito.borrarProd(req.params.id, req.params.id_prod).then(function (result) {
    res.status(200).send({ message: "producto borrado:", productoId: result });
  });
});

export default carritoApiRouter;
