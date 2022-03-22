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
    try {
      let id = elem.id;
      let doc = this.query.doc(`${id}`);
      await doc.create(elem);
      return elem;
    } catch (error) {
      return undefined;
    }
  }
  async actualizar(elem) {
    try {
      const doc = this.query.doc(`${elem.id}`);
      const item = await doc.update({ elem });
      return item;
    } catch (error) {
      return console.log("error", error);
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
