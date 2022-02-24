const express = require("express");
const { Router } = express;
const apiCarritos = Router();
var hoy = new Date();
var fecha =
  hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();
var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
var fechaYHora = fecha + " " + hora;
const fs = require("fs");
// Router Carrito
apiCarritos.post("/", (req, res) => {
    productos = req.body;
    async function escribirArchivo() {
      try {
        //lee el contenido del archivo
        let contenido = JSON.parse(
          await fs.promises.readFile("./carrito.json", "utf-8")
        );
        let Idcontenido = contenido.length + 1;
        const carrito = {
          id: Idcontenido,
          timestamp: fechaYHora,
          productos: [{ productos }],
        };
        contenido.push(carrito);
        res
          .status(200)
          .send({ message: "el carrito se ha creado", id: Idcontenido });
        //sobreescribe el archivo
        await fs.promises.writeFile("./carrito.json", JSON.stringify(contenido));
      } catch (err) {
        console.log("error de lectura!", err);
      }
    }
    escribirArchivo();
  });
  
  apiCarritos.delete("/:id", (req, res) => {
    async function leerArchivo() {
      try {
        //lee el archivo json
        let contenido = JSON.parse(
          await fs.promises.readFile("./carrito.json", "utf-8")
        );
        //encuentra el producto por su Id
        let contenidoId = contenido.find((e) => e.id == req.params.id);
        if (contenidoId === undefined) {
          res.status(200).send("No se ha encontrado un producto con ese Id ");
        }
        res.status(200).send({ ProductoEliminado: contenidoId });
        //sobreescribe el archivo
        contenido = contenido.filter((i) => i.id !== contenidoId.id);
        await fs.promises.writeFile("./carrito.json", JSON.stringify(contenido));
      } catch (err) {
        console.log("error", err);
      }
    }
  
    leerArchivo();
  });
  
  apiCarritos.get("/:id/productos", (req, res) => {
    async function leerArchivo() {
      try {
        const contenido = JSON.parse(
          await fs.promises.readFile("./carrito.json", "utf-8")
        );
        let carritoId = contenido.find((e) => e.id == req.params.id);
        if (carritoId === undefined) {
          carritoId = null;
        }
        res.status(200).send(carritoId.productos);
      } catch (err) {
        console.log("error", err);
      }
    }
  
    leerArchivo();
  });
  apiCarritos.post("/:id/productos", (req, res) => {
    productos = req.body;
    async function leerArchivo() {
      try {
        //lee el archivo json
        let contenido = JSON.parse(
          await fs.promises.readFile("./carrito.json", "utf-8")
        );
        //encuentra el producto por su Id
        let carritoId = contenido.find((e) => e.id == req.params.id);
        if (carritoId === undefined) {
          console.log("no se ha encontrado ese ID");
          carritoId = null;
        }
        carritoId.productos.push(productos);
        res.status(200).send({ productoActualizado: carritoId });
        //sobreescribe el archivo
        contenido = contenido.filter((i) => i.id !== carritoId.id);
        contenido.push(carritoId);
        await fs.promises.writeFile("./carrito.json", JSON.stringify(contenido));
      } catch (err) {
        console.log("error", err);
      }
    }
  
    leerArchivo();
  });
  
  apiCarritos.delete("/:id/productos/:id_prod", (req, res) => {
    async function leerArchivo() {
      try {
        //lee el archivo json
        let contenido = JSON.parse(
          await fs.promises.readFile("./carrito.json", "utf-8")
        );
        //encuentra el producto por su Id
        let contenidoId = contenido.find((e) => e.id == req.params.id);
        let productoId = contenidoId.productos.find(
          (e) => e.id == req.params.id_prod
        );
        contenidoId.productos = contenidoId.productos.filter(
          (e) => e.id !== req.params.id_prod
        );
        if (productoId === undefined) {
          res.status(200).send("No se ha encontrado un producto con ese Id ");
        } else {
          res
            .status(200)
            .send({
              ProductoEliminado: productoId,
              ProductosRestantes: contenidoId.productos,
            });
        }
  
        //sobreescribe el archivo
        contenido = contenido.filter((i) => i.id !== contenidoId.id);
        contenido.push(contenidoId);
        await fs.promises.writeFile("./carrito.json", JSON.stringify(contenido));
      } catch (err) {
        console.log("error", err);
      }
    }
  
    leerArchivo();
  });

  module.exports = apiCarritos;