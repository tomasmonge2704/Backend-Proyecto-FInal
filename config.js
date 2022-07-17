import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const dotenv = require('dotenv');
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
  });
console.log(__dirname, process.env.NODE_ENV + '.env')
export default {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 3001,
    DB:"mongo"
    //mongo o firebase
    ,
    CLUSTER:"no"
    //on
    ,telefono:"+5491167843278"
    ,mailAdmin:"tomasmongevidal@hotmail.com"
    ,TWILIO_TOKEN:"eeee99cecd28a545268628c243a59288"
    ,Firebase_URL:"./backend-4df83-firebase-adminsdk-tl00v-825e02ec91.json"
    ,MongoAtlas_URL:"mongodb+srv://tomas2:1roZJIVtj5JnG5HH@cluster0.nmb6c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  }