import mongoose from "mongoose";

const usuariosCollection = 'productos';

const UsuarioSchema = new mongoose.Schema({
    nombre: {type:String, require:true, max:100},
    apellido: {type:String, require:true, max:100},
    email: {type:String, require:true, max:100},
   usuario: {type:String, require:true, max:100},
   id:{type:Number,require:true, max:100}
})

export const productos = mongoose.model(usuariosCollection, UsuarioSchema)