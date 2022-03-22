import mongoose from "mongoose";

const carritosCollection = 'carritos';

const carritoSchema = new mongoose.Schema({
    id: {type:Number, require:true},
    timeStamp: {type:String, require:true},
    productos:[{id:{type:Number, require:true},timestamp:{type:String, require:true},nombre:{type:String, require:true}}]
})

export const carritos = mongoose.model(carritosCollection, carritoSchema)