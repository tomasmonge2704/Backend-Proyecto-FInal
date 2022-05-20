var hoy = new Date();
var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
var fechaYHora = fecha + ' ' + hora;
import generateId from "./faker.js";
class ContenedorFirebase {
  constructor(query) {
    this.query = query;
  }
  async listar(id) {
    try {
      const doc = this.query.doc(`${id}`);
      const item = await doc.get();
      const response = item.data();
      return response;
    } catch (error) {
      return undefined;
    }
  }
  async listarAll() {
    try {
      const querySnapshot = await this.query.get();
      let docs = querySnapshot.docs;
      const response = docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre,
        email: doc.data().email,
      }));
      return response;
    } catch (error) {
      return console.log("error", error);
    }
  }

  async guardar(elem) {
    elem.timestamp = fechaYHora
    try {
    const querySnapshot = await this.query.get();
      let id = generateId()
      let doc = this.query.doc(`${id}`);
      elem.id = id
      await doc.create(elem);
      return elem;
    } catch (error) {
      return console.log(error);
    }
  }
  async actualizar(elem, id) {
    try {
      const doc = this.query.doc(`${id}`);
      const item = await doc.update(elem);
      return item;
    } catch (error) {
      return undefined
    }
  }
  async actualizarProd(elem, id) {
    try {
      const doc = this.query.doc(`${id}`);
      const item = await doc.update({productos:elem});
      return item;
    } catch (error) {
      return undefined
    }
  }
  async borrar(id) {
    try {
      const doc = this.query.doc(`${id}`);
      const item = await doc.get();
      await doc.delete();
      const response = item.data();
      return response;
    } catch (error) {
      return undefined;
    }
  }
  async borrarProd(id, id_prod) {
    try {
      const doc = this.query.doc(`${id}`);
      const item = await doc.get();
      const response = item.data();
      const prod = response.productos.filter((e) => e.id !== parseInt(id_prod))
      await doc.update({productos:prod});
      return id_prod
    } catch (error) {
      return undefined;
    }
  }
  async borrarAll() {
    try {
      let docs = this.query.doc()
      await docs.delete();
    } catch (error) {
      return undefined;
    }
  }
}

export default ContenedorFirebase;
