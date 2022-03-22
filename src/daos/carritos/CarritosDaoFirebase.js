import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js"
import { admin } from "../index.js";
const db = admin.firestore()
const queryCarts = db.collection('Carritos')
const CarritosApiFirebase = new ContenedorFirebase(queryCarts)


export default CarritosApiFirebase