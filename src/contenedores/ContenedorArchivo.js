import { promises as fs } from "fs";

class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }
  async listar(id) {
    try {
      const elems = await this.listarAll();
      const buscado = elems.find((e) => e.id == id);
      return buscado;
    } catch (error) {
      return undefined;
    }
  }
  async listarAll() {
    try {
      const elems = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(elems);
    } catch (error) {
      return console.log("error", error);
    }
  }

  async guardar(elem) {
    const elems = await this.listarAll();
    let newId;
    if (elems.length == 0) {
      newId = 1;
    } else {
      newId = elems[elems.length - 1].id + 1;
    }
    const newElem = { ...elem, id: newId };
    elems.push(newElem);
    try {
      await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2));
      return newElem;
    } catch (error) {
      return undefined;
    }
  }
  async actualizar(elem) {
    const elems = await this.listarAll();
    const index = elems.findIndex((e) => e.id == elem.id);
    if (index == -1) {
      throw new Error(`Error al acutalizar: no se encontro el Id ${elem.id}`);
    } else {
      elems[index] = elem;
      try {
        await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2));
        return elem;
      } catch (error) {
        throw new Error(`Error al borrar: ${error}`);
      }
    }
  }
  async borrar(id) {
    const elems = await this.listarAll();
    const index = elems.findIndex((e) => e.id == id);
    if (index == -1) {
      throw new Error(`Error al borrar: no se encontro el Id ${id}`);
    }
    elems.splice(index, 1);
    try {
      await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2));
      return index;
    } catch (error) {
      return undefined
    }
  }
  async borrarAll() {
    try {
      await fs.writeFile(this.ruta, JSON.stringify([], null, 2));
    } catch (error) {
      throw new Error(`Error al borrar todo:${error}`);
    }
  }
}

export default ContenedorArchivo;
