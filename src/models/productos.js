import mongoose from "mongoose";

const productosCollection = 'productos';

const productosSchema = new mongoose.Schema({
    id:{type:String,require:true, max:100},
    timestamp: {type:String, require:true, max:100},
    nombre: {type:String, require:true, max:100},
    descripcion: {type:String, require:true, max:100},
    codigo: {type:String, require:true, max:100},
    fotoURL: {type:String, require:true, max:100},
    precio: {type:String, require:true, max:100},
    stock: {type:String, require:true, max:100},
})

export const productos = mongoose.model(productosCollection, productosSchema)