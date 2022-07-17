import ContenedorMongo from "../../contenedores/ContentedorMongoDb.js";
import config from "../../../config.js";
import { InitMongo } from "../index.js";
if(config.DB === "mongo"){
    InitMongo()
}
const productosApiMongo = new ContenedorMongo("productos")

export default productosApiMongo