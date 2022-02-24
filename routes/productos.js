const express = require("express");
const { Router } = express;
const apiProductos = Router();
var hoy = new Date();
var fecha =
  hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();
var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
var fechaYHora = fecha + " " + hora;
const fs = require("fs");
//rutas Productos
apiProductos.get("/", (req, res) => {
  
    async function leerArchivo() {
      try {
        const contenido = JSON.parse(
          await fs.promises.readFile("./productos.json", "utf-8")
        );
        res.status(200).send({ products: contenido });
      } catch (err) {
        console.log("error", err);
      }
    }
    leerArchivo();
    
  });
  apiProductos.get("/:id", (req, res) => {
    async function leerArchivo() {
      try {
        const contenido = JSON.parse(
          await fs.promises.readFile("./productos.json", "utf-8")
        );
        let contenidoId = contenido.find((e) => e.id == req.params.id);
        if (contenidoId === undefined) {
          contenidoId = null;
        } else {
          console.log(contenidoId);
        }
  
        res.status(200).send({ producto: contenidoId });
      } catch (err) {
        console.log("error", err);
      }
    }
  
    leerArchivo();
  });
  apiProductos.post("/", (req, res) => {
    producto = req.body;
  
    async function escribirArchivo() {
      try {
        //lee el contenido del archivo
        let contenido = JSON.parse(
          await fs.promises.readFile("./productos.json", "utf-8")
        );
        //le asigna un iD en base al contenido
        producto.id = contenido.length + 1;
        producto.timestamp = fechaYHora;
        contenido.push(producto);
        res
          .status(200)
          .send({ message: "el producto se ha recibido", producto: producto });
        //sobreescribe el archivo
        await fs.promises.writeFile(
          "./productos.json",
          JSON.stringify(contenido)
        );
      } catch (err) {
        console.log("error de lectura!", err);
      }
    }
    escribirArchivo();
  });
  
  apiProductos.put("/:id", (req, res) => {
    producto = req.body;
    async function leerArchivo() {
      try {
        //lee el archivo json
        let contenido = JSON.parse(
          await fs.promises.readFile("./productos.json", "utf-8")
        );
        //encuentra el producto por su Id
        let contenidoId = contenido.find((e) => e.id == req.params.id);
        if (contenidoId === undefined) {
          console.log("no se ha encontrado ese ID");
          contenidoId = null;
        }
        //le asigna el mismo Id que tenia el anterior
        producto.id = contenidoId.id;
        producto.timestamp = fechaYHora;
        res
          .status(200)
          .send({ producto: contenidoId, productoActualizado: producto });
        //sobreescribe el archivo
        contenido = contenido.filter((i) => i.id !== contenidoId.id);
        contenido.push(producto);
        await fs.promises.writeFile(
          "./productos.json",
          JSON.stringify(contenido)
        );
      } catch (err) {
        console.log("error", err);
      }
    }
  
    leerArchivo();
  });
  
  apiProductos.delete("/:id", (req, res) => {
    async function leerArchivo() {
      try {
        //lee el archivo json
        let contenido = JSON.parse(
          await fs.promises.readFile("./productos.json", "utf-8")
        );
        //encuentra el producto por su Id
        let contenidoId = contenido.find((e) => e.id == req.params.id);
        if (contenidoId === undefined) {
          res.status(200).send("No se ha encontrado un producto con ese Id ");
        }
        res.status(200).send({ ProductoEliminado: contenidoId });
        //sobreescribe el archivo
        contenido = contenido.filter((i) => i.id !== contenidoId.id);
        await fs.promises.writeFile(
          "./productos.json",
          JSON.stringify(contenido)
        );
      } catch (err) {
        console.log("error", err);
      }
    }
  
    leerArchivo();
  });

  module.exports = apiProductos;