import { Router } from "express";

const dash = Router();

dash.get("/dashboard", (req, res) => {
    res.render("dash");
});

export default dash;