import { Router } from "express";
import config from "../config.js";
import carritoApiArchivo from "../daos/carritos/CarritosDaoArchivo.js";
import CarritosApiFirebase from "../daos/carritos/CarritosDaoFirebase.js";
import carritosApiMongo from "../daos/carritos/CarritosDaoMongoDb.js";
import { passport, checkAuthentication } from "./passport.js";
let carrito = carritoApiArchivo;
if (config.DB === "mongo") {
  carrito = carritosApiMongo;
}
if (config.DB === "firebase") {
  carrito = CarritosApiFirebase;
}

const carritoApiRouter = new Router();
let contenido = [];

carritoApiRouter.post("/", checkAuthentication, postCarrito);
carritoApiRouter.get("/:id/productos", checkAuthentication, getProdCarrito);
carritoApiRouter.delete("/:id", checkAuthentication, deleteCarrito);
carritoApiRouter.post("/:id/productos", checkAuthentication, postProdCarrito);
carritoApiRouter.delete(
  "/:id/productos/:id_prod",
  checkAuthentication,
  deleteProdCarrito
);

function deleteProdCarrito(req, res) {
  carrito.borrarProd(req.params.id, req.params.id_prod).then(function (result) {
    if (result == undefined) {
      res.status(404).send({ message: "el producto no se ha encontrado" });
    } else {
      res
        .status(200)
        .send({ message: "producto borrado:", productoId: result });
    }
  });
}

function postProdCarrito(req, res) {
  try {
    carrito.actualizarProd(req.body, req.params.id).then(function (result) {
      if (result === undefined) {
        res.status(404).send({ message: "No se ha podido guardar" });
      } else {
        res.status(200).send({ result: result });
      }
    });
  } catch (err) {
    console.log("error", err);
  }
}
function deleteCarrito(req, res) {
  carrito.borrar(req.params.id).then(function (result) {
    if (result === undefined) {
      res.status(404).send({ message: "el carrito no se ha encontrado" });
    } else {
      res
        .status(200)
        .send({ message: "el carrito se ha borrado", carrito: result });
    }
  });
}
function postCarrito(req, res) {
  try {
    carrito.guardar(req.body, req.user.username).then(function (result) {
      if (result === undefined) {
        res.status(400).send({ message: "el id de carrito ya existe" });
      } else {
        res
          .status(200)
          .send({ message: "el carrito se ha creado", carrito: result });
      }
    });
  } catch (err) {
    console.log("error", err);
  }
}
function getProdCarrito(req, res) {
  carrito.listar(req.params.id).then(function (result) {
    if (result == undefined) {
      res.status(404).send({ message: "el carrito no se ha encontrado" });
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
}

export {carrito,carritoApiRouter};
