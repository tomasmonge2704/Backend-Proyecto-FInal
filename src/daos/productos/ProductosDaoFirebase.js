import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js"
import { admin } from "../index.js";
const db = admin.firestore()
const queryProds = db.collection('Productos')
const productosApiFirebase = new ContenedorFirebase(queryProds)


export default productosApiFirebase