import productosApiArchivo from "../daos/productos/ProductosDaoArchivo.js";
import productosApiMongo from "../daos/productos/ProductosDaoMongoDb.js";
import productosApiFirebase from "../daos/productos/ProductosDaoFirebase.js";
import config from "../config.js";

let productos = productosApiArchivo
if(config.DB === "mongo"){
    productos = productosApiMongo
}
if(config.DB === "firebase"){
    productos = productosApiFirebase
} 
let contenido = []
//index
function getRoot(req,res){
    const username = req.user.username
    try {
        productos.listarAll().then(function (result) {
            contenido = result
            res.render('index',{username,contenido})
        });
      } catch (err) {
        res.status(400).send(err);
      }
}
//login
function getLogin(req, res){
    if(req.isAuthenticated()) {
        let user = req.user;
        res.render('login');
    }
    else{
        console.log('user No logueado');
        res.render('login')
    }
}
//signup
function getSignup(req,res){
    res.render('signup')
}
//PROSSER LOGIN
function postLogin (req, res){
    var user = req.user;
    res.redirect('/')
}
//PROCESS SIGNUP
function postSignup (req, res){
    var user = req.body;
    res.redirect('/')
}
function getFaillogin (req,res){
    console.log('error en login');
    res.render('login-error',{});
}
function getFailsignup(req,res){
    console.log('error en signup');
    res.render('signup-error',{})
}
//LOGOUT
function getLogout(req,res){
    req.logout();
    res.redirect('/login')
}
function failRoute(req,res){
    res.status(404).render('routing-error',{})
}

export {getRoot,getLogin,getSignup,postLogin,postSignup,getFaillogin,getFailsignup,getLogout,failRoute}