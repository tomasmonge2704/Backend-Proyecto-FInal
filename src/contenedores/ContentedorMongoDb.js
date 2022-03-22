
import * as model from '../models/usuario.js'

class ContenedorMongo{

    constructor(ruta){
        this.ruta = ruta;
    }
    async listar(id) {
        const elems = await this.listarAll()
        const buscado = elems.find( e.id == id)
        return buscado
    }
    async listarAll(){
        try {
            let productos = await model.productos.find({})
            return productos
        } catch (error){
            return []
        }
    }

    async guardar(elem){
        const elems = await this.listarAll()
        let newId
        if(elems.length == 0 ) {
            newId = 1
        } else {
            newId = elems[elems.length - 1].id + 1
        }
        const newElem = {...elem, id: newId}
        elems.push(newElem)
        try {
                const usuario = { nombre: 'juan', apellido:'Perez', email: 'jp@gmail.com'}
        const usuarioSaveModel = new model.productos(usuario);
        let usuarioSave = await usuarioSaveModel.save()
            return newId
        } catch (error){
            throw new Error(`Error al guardar: ${error}`)
        }
    }
    async actualizar(elem) {
        const elems = await this.listarAll()
        const index = elems.findIndex( e=> e.id == elem.id)
        if(index == -1) {
            throw new Error(`Error al acutalizar: no se encontro el Id ${elem.id}`)
        } else {
            elems[index] = elem
            try{
                await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2))
            } catch (error){
                throw new Error (`Error al borrar: ${error}`)
            }
        }
    }
    async borrar(id) {
        const elems = await this.listarAll()
        const index = elems.findIndex(e => e.id == id)
        if (index == -1){
            throw new Error(`Error al borrar: no se encontro el Id ${id}`)
        }
        elems.splice(index, 1)
        try{
            await fs.writeFile(this.ruta, JSON.stringify(elems, null,2))
        } catch (error){
            throw new Error(`Error al borrar: ${error}`)
        }
    }
    async borrarAll(){
        try{
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
        } catch (error){
            throw new Error(`Error al borrar todo:${error}`)
        }
    }
}

export default ContenedorMongo