import { Router } from "express";
import productosApiArchivo from "../daos/productos/ProductosDaoArchivo.js";
import productosApiMongo from "../daos/productos/ProductosDaoMongoDb.js";
import config from "../config.js";
import mongoose from "mongoose";

const productos =
  config.DB === "mongo" ? productosApiMongo : productosApiArchivo;

if (config.DB === "mongo") {
  async function CRUD() {
    try {
      const URL =
        "mongodb+srv://tomas2:1roZJIVtj5JnG5HH@cluster0.nmb6c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
      let rta = await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("base de datos conectada");
    } catch (error) {
      console.log(`Error en CRUD: ${error}`);
    }
  }
  CRUD();
}
const productosApiRouter = new Router();

productosApiRouter.get("/", (req, res) => {
  productos.listarAll().then(function (result) {
    res.status(200).send(result);
  });
});

productosApiRouter.get("/:id", (req, res) => {
  productos.listar(req.params.id).then(function (result) {
      if(result === undefined){
        res.status(200).send("id no encontrado");
      } else{
        res.status(200).send(result);
      }
    
  });
});

productosApiRouter.post("/", (req, res) => {
  productos.guardar(req.body).then(function (result) {
    res.status(200).send({message:"el producto se ha creado", producto:result});
  });
});
productosApiRouter.put("/:id", (req, res) => {
    productos.actualizar(req.body).then(function (result) {
        res.status(200).send({message:"el producto se ha actualizado", productoId:result});
      });
});
productosApiRouter.delete("/:id", (req, res) => {
    productos.borrar(req.params.id).then(function (result) {
        res.status(200).send({message:"el producto se ha borrado", productoId:result});
      });
});
productosApiRouter.delete("/", (req, res) => {
    productos.borrarAll(req.params.id).then(function () {
        res.status(200).send({message:"se han borrado todos los productos"});
      });
});

export default productosApiRouter;
