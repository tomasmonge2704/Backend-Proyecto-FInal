import mongoose from "mongoose";

const carritosCollection = "carritos";

const carritoSchema = new mongoose.Schema({
  id: { type: String, require: true },
  timeStamp: { type: String, require: true },
  productos: [
    {
      id: { type: String, require: true },
      timestamp: { type: String, require: true },
      nombre: { type: String, require: true },
      descripcion: { type: String, require: true },
      codigo: { type: String, require: true, max: 100 },
      fotoURL: { type: String, require: true, max: 100 },
      precio: { type: String, require: true, max: 100 },
      stock: { type: String, require: true, max: 100 },
    },
  ],
});

export const carritos = mongoose.model(carritosCollection, carritoSchema);
