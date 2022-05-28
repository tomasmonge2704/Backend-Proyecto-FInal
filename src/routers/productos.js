import { Router } from "express";
import productosApiArchivo from "../daos/productos/ProductosDaoArchivo.js";
import productosApiMongo from "../daos/productos/ProductosDaoMongoDb.js";
import productosApiFirebase from "../daos/productos/ProductosDaoFirebase.js";
import config from "../config.js";
import { passport, checkAuthentication } from "./passport.js";
let productos = productosApiArchivo;
if (config.DB === "mongo") {
  productos = productosApiMongo;
}
if (config.DB === "firebase") {
  productos = productosApiFirebase;
}

const productosApiRouter = new Router();
let contenido = [];

productosApiRouter.get("/", checkAuthentication, getProductos);
productosApiRouter.get("/:id", checkAuthentication, getProducto);
productosApiRouter.post("/", checkAuthentication, postProducto);
productosApiRouter.put("/:id", checkAuthentication, putProducto);
productosApiRouter.delete("/:id", checkAuthentication, deleteProd);

function deleteProd(req, res) {
  productos.borrar(req.params.id).then(function (result) {
    if (result === undefined) {
      res.status(404).send({ message: "el producto no se ha encontrado" });
    } else {
      res
        .status(200)
        .send({ message: "el producto se ha borrado", productoId: result });
    }
  });
}
function putProducto(req, res) {
  productos.actualizar(req.body, req.params.id).then(function (result) {
    if (result === undefined) {
      res.status(404).send({ message: "el producto no se ha encontrado" });
    } else {
      res
        .status(200)
        .send({ message: "el producto se ha actualizado", productoId: result });
    }
  });
}
function postProducto(req, res) {
  try {
    productos.guardar(req.body).then(function (result) {
      if (result === undefined) {
        res.status(404).send({ message: "el id de producto ya existe" });
      } else {
        res.status(200).send({message: "el producto se ha creado con exito",result:result});
      }
    });
  } catch (err) {
    console.log("error", err);
  }
}
function getProducto(req, res) {
  productos.listar(req.params.id).then(function (result) {
    if (result === undefined) {
      res
        .status(200)
        .send({
          message: `no se ha encontrado un producto con este ID: ${req.params.id}`,
        });
    } else {
      res.status(200).send(result);
    }
  });
}
function getProductos(req, res) {
  try {
    productos.listarAll().then(function (result) {
      res.status(200).send(result)
    });
  } catch (err) {
    res.status(400).send(err);
  }
}

export {productos,productosApiRouter};
