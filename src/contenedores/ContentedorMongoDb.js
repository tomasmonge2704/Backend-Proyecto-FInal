import * as modelProd from "../models/productos.js";
import * as modelCart from "../models/carritos.js";
import generateId from "../utils/faker.js";
var hoy = new Date();
var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
var fechaYHora = fecha + ' ' + hora;
class ContenedorMongo {
  constructor(ruta) {
    this.ruta = ruta;
  }
  async listar(id) {
    try {
      if (this.ruta === "productos") {
        const buscado = await modelProd.productos.find({ _id: id }).lean();
        return buscado;
      } else {
        const buscado = await modelCart.carritos.find({ id: id }).lean();
        return buscado[0].productos;
      }
    } catch (error) {
      return undefined;
    }
  }
  async listarAll() {
    try {
      if (this.ruta === "productos") {
        let elems = await modelProd.productos.find({}).lean();
        return elems;
      } else {
        let elems = await modelCart.carritos.find({}).lean();
        return elems;
      }
    } catch (error) {
      return undefined;
    }
  }
  async listarCategoria(categoria) {
    try {
      if (this.ruta === "productos") {
        let elems = await modelProd.productos.find({ categoria: categoria }).lean();
        return elems;
       
      }
    } catch (error) {
      return undefined;
    }
  }
  async guardar(elem,id) {
    
    try {
      if (this.ruta === "productos") {
          elem.timestamp = fechaYHora
          elem.id = generateId()
          const e = await new modelProd.productos(elem).save();
          return e;
      } else {
        elem.id = id
        elem.timestamp = fechaYHora
        let buscado = await modelCart.carritos.find({ id: id });
        if (buscado.length === 0){
          const e = await new modelCart.carritos(elem).save();
          return e;
        }
        else{
          return undefined
        }   
      }
    } catch (error) {
      return undefined;
    }
  }
  async actualizar(elem, id) {
    try {
      if (this.ruta === "productos") {
        let productoUpdate = await modelProd.productos.updateOne(
          { id: id },
          { $set: elem }
        );
        return productoUpdate;
      } else {
        let cartUpdate = await modelCart.carritos.updateOne(
          { id: id },
          { $set: { productos: elem } }
        );
        return cartUpdate;
      }
    } catch (error) {
      return undefined;
    }
  }
  async actualizarProd(elem, id) {
    try {
      let productos = await this.listar(id);
      if (productos == undefined){
        const e = new modelCart.carritos({id:id,timestamp:fechaYHora,productos:elem}).save();
        return e
      }else{
        productos.push(elem)
          let cartUpdate = await modelCart.carritos.updateOne(
            { id: id },
            { $set: { productos: productos } }
          );
          return cartUpdate;
      }
      
    
    } catch (error) {
      return undefined;
    }
  }
  async borrar(id) {
    try {
      if (this.ruta === "productos") {
        let elemDelete = await modelProd.productos.deleteOne({ id: id });
        return elemDelete;
      } else {
        let elemDelete = await modelCart.carritos.deleteOne({ id: id });
        if(elemDelete.deletedCount == 0){
          elemDelete = undefined
        }
        return elemDelete;
      }
    } catch (error) {
      return undefined;
    }
  }
  async borrarProd(id, id_prod) {
    try {
        let buscado = await modelCart.carritos.find({ id: id });
        buscado = buscado[0].productos.filter((e) => e.id !== id_prod)
        let cartUpdate = await modelCart.carritos.updateOne(
            { id: id },
            { $set: { productos: buscado } }
          );
          return cartUpdate;
        }
       catch (error) {
        return undefined
      }
  }
  async borrarAll() {
    try {
      if (this.ruta === "productos") {
        let deleteAll = await modelProd.productos.deleteMany({});
        return deleteAll;
      } else {
        let deleteAll = await modelCart.carritos.deleteMany({});
        return deleteAll;
      }
    } catch (error) {
      return undefined;
    }
  }
}

export default ContenedorMongo;
