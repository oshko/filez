
import express from "express";
const foldersRoutes = express.Router();

foldersRoutes.route('/')
.get( (req, res) => {
    res.send("Hello from Folders route");
});

export default foldersRoutes;