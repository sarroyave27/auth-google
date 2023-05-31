import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fetch from "node-fetch"


dotenv.config();

const dash = Router();

dash.get("/inicio", (req, res) => {
    if (req.cookies.ckswf){
    try {
        const token = jwt.verify(req.cookies.ckswf, process.env.SECRET_KEY);
        res.render("dash", {
            "nombre":token.nombre,
            "foto":token.foto,
            "menu": 0
        });

    } catch (error) {
        res.redirect("/");
    }

    } else {
        res.redirect("/");
    }
});

dash.get("/usuario",  async(req, res) => {
    if (req.cookies.ckswf){
    try {
        const token = jwt.verify(req.cookies.ckswf, process.env.SECRET_KEY);
        let ruta = "http://localhost:3000/api/user";
        let option = {
            method:"GET"
        }
        let datos = {};
        const result = await fetch(ruta, option)
        .then(response => response.json())
        .then(data => {
            datos = data[0]
        })
        .catch(err => console.error("Error en peticion: " + err))



        res.render("dash", {
            "nombre":token.nombre,
            "foto":token.foto,
            "menu": 1,
            "datos": datos
        });

    } catch (error) {
        res.redirect("/");
    }

    } else {
        res.redirect("/");
    }
});

dash.post("/guardar", (req, res) => {
    if(req.body.name){


        let data = {
            name: req.body.name
        }

        let metodo = "POST";

        if(req.body.id){
            data = {
                id: req.body.id,
                name: req.body.name
            }
            metodo = "PUT";
        }

        let ruta = "http://localhost:3000/api/user";

        let option = {
            method: metodo,
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        try {
            const result = fetch(ruta, option)
            .then(res=>res.json())
            .then(data=>{
                console.log("datos guardados");
                
            })
            .catch(err=>console.log("error" + err));
            res.redirect("/v1/usuario");
        } catch (error) {
            
        }
    }
});

dash.get("/salir", (req, res) => {
    res.clearCookie("ckswf");
    res.redirect("/");
});

dash.get("/edit-user", (req, res) => {
    const id = req.query.id;
    const name = req.query.name;

    let datos = {
        id: id,
        name: name
    }

    if (req.cookies.ckswf){
        try {
            const token = jwt.verify(req.cookies.ckswf, process.env.SECRET_KEY);
            res.render("dash",  {
                "nombre":token.nombre,
                "foto":token.foto,
                "menu": 4,
                "datos": datos
            });
        } catch (error) {
            console.error("Error verifying")
        }
    }

});


dash.get("/borrar", async(req, res) => {
    const id = req.query.id;

    if (req.cookies.ckswf){
        try {
            const token = jwt.verify(req.cookies.ckswf, process.env.SECRET_KEY)

            const url = `http://localhost:3000/api/user/${id}`;

            const option ={

                method: "DELETE"
            };

            const result = await fetch(url, option)
            .then(response => response.json())
            .then(data => {
                if (data[0].affectedRows==1){


                }else {
                    console.log("No borrado");
                }
            })

            res.redirect("/v1/usuario")

        } catch (error) {
            console.error("Error verifying")
        }
    }
    // res.send({"datos": id})
});


export default dash;