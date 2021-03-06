import { Router } from "express";
import { productos } from "./productos.js";
import { carrito } from "./carrito.js";
import { passport, checkAuthentication,findUser } from "./passport.js";
import {mailUser,mailProductos} from "../utils/mail.js"
import {twilioSMS,twilioWPP} from "../utils/twilio.js"
import {loggerTodos} from "../utils/log4js.js"
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
pageRouter.get('/productos',checkAuthentication,getProds)
pageRouter.get('/productos/:categoria',checkAuthentication,getProdsCategoria)
pageRouter.get('/producto/:id',checkAuthentication,getProdId)
pageRouter.get('/chat',checkAuthentication,chat)
pageRouter.get('/chat/:email',checkAuthentication,ChatEmail)
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
    res.redirect('/productos')
}
//PROCESS SIGNUP
function postSignup (req, res){
    var user = req.body;
    mailUser(user)
    twilioWPP(user.telefono)
    res.redirect('/')
}
function getFaillogin (req,res){
    console.log('error en login');
    res.render('login-error',{});
}
function getFailsignup(req,res){
    loggerTodos.error("error en signup, el usuario ya existe")
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
async function getProds(req,res){
    const username = req.user.username
    productos.listarAll().then(function (contenido) {
    res.render('index',{username,contenido})
})
}
async function getProdsCategoria(req,res){
    productos.listarCategoria(req.params.categoria).then(function (contenido) {
    res.render('productos',{contenido})
})
}
async function getProdId(req,res){
    const id = req.params.id
    const username = req.user.username
    productos.listarId(id).then(function (contenido) {
    res.render('detalleProducto',{contenido,id,username})
})
}
async function postCart(req,res){
    const username =  req.user
    let user = await findUser(username.username)
    contenido = await carrito.listar(username.username)
    mailProductos(username,contenido)
    twilioSMS(user.telefono)
    twilioWPP(user.username,contenido)
    carrito.borrar(username.username)
    res.status(200).render('exitosa')
}
async function getUser(req,res){
    let user = await findUser(req.user.username)
    res.render('user',{user})
}
async function chat(req,res){
    let user = await findUser(req.user.username)
    res.render('chat')
}
async function ChatEmail(req,res){
    let user = await findUser(req.user.username)
    res.render('chatEmail')
}
export {pageRouter,failRoute}