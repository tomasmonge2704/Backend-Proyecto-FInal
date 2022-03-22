import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js"
import config from "../../config.js";
import { InitFirebase } from "../../contenedores/index.js";
if (config.DB === "firebase") {
    InitFirebase();
}

const productosApiFirebase = new ContenedorFirebase("")


export default productosApiFirebase