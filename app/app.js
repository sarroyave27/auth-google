import express from "express";
import dotenv from "dotenv";
import { loginRouter } from "./routes/login.routes.js";
import passport from "passport";
import "./middlewares/google.js";


dotenv.config();
const app = express();

app.set("port", process.env.PORT || 9999);

app.use(express.json());
app.use(passport.initialize());

app.use("/auth", passport.authenticate("auth-google",{

    scope:[
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ],
    session:false
}), loginRouter);

app.get("/", (req, res)=>{
    res.send("Hola");
})

export default app;
