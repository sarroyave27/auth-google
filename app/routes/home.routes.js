import { Router } from "express";

const route = Router();

route.get('/about', (req,res)=>{res.render("about")});
route.get('/blog', (req,res)=>{res.render("blog")});
route.get('/contact', (req,res)=>{res.render("contact")});
route.get('/index', (req,res)=>{res.render("index")});
route.get('/services', (req,res)=>{res.render("services")});

export default route;