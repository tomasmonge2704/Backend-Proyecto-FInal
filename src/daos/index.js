//firebase
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
import config from "../config.js";
const require = createRequire(import.meta.url); // construct the require method
var admin = require("firebase-admin");
var serviceAccount = require(config.Firebase_URL);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


//mongo
import mongoose from "mongoose";
async function InitMongo() {
  try {
    const URL =
      config.MongoAtlas_URL;
    let rta = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(`Error en CRUD: ${error}`);
  }
}

export { admin, InitMongo };
