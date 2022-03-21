import config from "../../config.js";

import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

const productosApiMongo = new ContenedorArchivo("../../contenedores/Productos.json",'productos')

export default productosApiMongo