//firebase
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
var admin = require("firebase-admin");
var serviceAccount = require("./backend-4df83-firebase-adminsdk-tl00v-825e02ec91.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


//mongo
import mongoose from "mongoose";
async function InitMongo() {
  try {
    const URL =
      "mongodb+srv://tomas2:1roZJIVtj5JnG5HH@cluster0.nmb6c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    let rta = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("base de datos conectada");
  } catch (error) {
    console.log(`Error en CRUD: ${error}`);
  }
}

export { admin, InitMongo };
