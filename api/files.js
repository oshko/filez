
import express from "express";
const filesRoutes = express.Router();

filesRoutes.route('/')
.get( (req, res) => {
    res.send("Hello from Files route");
});

export default filesRoutes;