import * as model from "../models/usuario.js";

class ContenedorMongo {
  constructor(ruta) {
    this.ruta = ruta;
  }
  async listar(id) {
      try{const buscado = await model.productos.find({ id: id });
      return buscado;}
      catch (error) {
        return console.log("error", error);
      }
    
  }
  async listarAll() {
    try {
      let productos = await model.productos.find({});
      return productos;
    } catch (error) {
      return console.log("error", error);
    }
  }

  async guardar(elem) {
    const e = await new model.productos(elem).save();
    return e;
  }
  async actualizar(elem) {
    try {
      let productoUpdate = await model.productos.updateOne(
        { id: elem.id },
        { $set: { elem } }
      );
      return productoUpdate;
    } catch (error) {
      return console.log("error", error);
    }
  }
  async borrar(id) {
    try {
      let prodDelete = await model.productos.deleteOne({ _id: id });
      console.log(prodDelete);
      return prodDelete;
    } catch (error) {
      return console.log("error", error);
    }
  }
  async borrarAll() {
    await model.productos.deleteMany({});
  }
}

export default ContenedorMongo;
