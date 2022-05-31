import { createRequire } from "module"; // Bring in the ability to create the 'require' method
import { loggerConsola } from "../utils/log4js.js";
const require = createRequire(import.meta.url); // construct the require method
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//mongo
const mongoose = require("mongoose");
var bCrypt = require("bcryptjs");
const url = `mongodb+srv://tomas2:1roZJIVtj5JnG5HH@cluster0.nmb6c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    loggerConsola.info("passport.js|Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    nombre: String,
    apellido: String,
    edad: String,
    telefono: String
  })
);
//mongo fin
//passport
function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log("User Not Found with username " + username);
        return done(null, false);
      }
      if (!isValidPassword(user, password)) {
        console.log("Invalid Password");
        return done(null, false);
      }

      return done(null, user);
    });
  })
);

//singup
passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          console.log("Error in SignUp: " + err);
          return done(err);
        }

        if (user) {
          console.log("User already exists");
          return done(null, false);
        }
        const newUser = {
          username: username,
          password: createHash(password),
          email: req.body.email,
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          edad: req.body.edad,
          telefono: req.body.telefono
        };
        User.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("Error in Saving user: " + err);
            return done(err);
          }
          console.log("User Registration succesful");
          return done(null, userWithId);
        });
      });
    }
  )
);

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).render("login");
  }
}
function findUser(username) {
  let user = User.findOne({ username: username }).lean()
  return user
}
//fin passport

export { passport, checkAuthentication, findUser };
