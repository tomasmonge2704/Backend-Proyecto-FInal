import config from "../../config.js";

import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

const productosApiArchivo = new ContenedorArchivo("./Productos.json",'productos')

export default productosApiArchivo