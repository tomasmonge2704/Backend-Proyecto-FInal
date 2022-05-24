import { Router } from "express";
import productosApiArchivo from "../daos/productos/ProductosDaoArchivo.js";
import productosApiMongo from "../daos/productos/ProductosDaoMongoDb.js";
import productosApiFirebase from "../daos/productos/ProductosDaoFirebase.js";
import config from "../config.js";
import carritoApiArchivo from "../daos/carritos/CarritosDaoArchivo.js";
import CarritosApiFirebase from "../daos/carritos/CarritosDaoFirebase.js";
import carritosApiMongo from "../daos/carritos/CarritosDaoMongoDb.js";
import { passport, checkAuthentication,findUser } from "./passport.js";
import {mailUser,mailProductos} from "../contenedores/mail.js"
import twilioo from "../contenedores/twilio.js"
let productos = productosApiArchivo
if(config.DB === "mongo"){
    productos = productosApiMongo
}
if(config.DB === "firebase"){
    productos = productosApiFirebase
} 
let carrito = carritoApiArchivo;
if (config.DB === "mongo") {
  carrito = carritosApiMongo;
}
if (config.DB === "firebase") {
  carrito = CarritosApiFirebase;
}
let contenido = []
const pageRouter = new Router();
pageRouter.get('/', checkAuthentication, getRoot);
pageRouter.get('/login', getLogin)
pageRouter.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), postLogin)
pageRouter.get('/faillogin', getFaillogin);
pageRouter.get('/signup', getSignup);
pageRouter.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), postSignup);
pageRouter.get('/failsignup', getFailsignup);
pageRouter.get('/logout', getLogout)
pageRouter.get('/carrito',checkAuthentication,getCart)
pageRouter.post('/carrito',checkAuthentication,postCart)
pageRouter.get('/user',checkAuthentication,getUser)
//index
function getRoot(req,res){
    const username = req.user.username
    try {
        productos.listarAll().then(function (result) {
            contenido = result
            contenido.forEach(element => {
                element.username = username
            });
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
    mailUser(user)
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
async function getCart(req,res){
    const username = req.user.username
    contenido = await carrito.listar(req.user.username)
    res.render('carrito',{username,contenido})
}
async function postCart(req,res){
    const username =  req.user
    let user = await findUser(username.username)
    contenido = await carrito.listar(username.username)
    mailProductos(username,contenido)
    twilioo(user.telefono)
    res.status(200).render('compra-exitosa',{})
}
async function getUser(req,res){
    let user = await findUser(req.user.username)
    res.render('user',{user})
}
export {pageRouter,failRoute}