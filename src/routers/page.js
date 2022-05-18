import { Router } from "express";

const pageRouter = new Router();

pageRouter.get("/", (req, res) => {
    res.render('index')
});

pageRouter.get("/login", (req, res) => {
    res.render('login')
});

pageRouter.get("/signup", (req, res) => {
    res.render('signup')
});
pageRouter.post("/login", (req, res) => {
    res.redirect('/')
});
pageRouter.post("/signup", (req, res) => {
    res.redirect('/')
});
pageRouter.get("/logout", (req, res) => {
    res.redirect('/login')
});
pageRouter.get("*", (req, res) => {
    res.status(404).render('routing-error',{})
});
export default pageRouter;