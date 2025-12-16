
import express from "express";
import { getFiles } from "#db/query/file-folder-queries";

const filesRoutes = express.Router();

filesRoutes.route('/')
.get(async (req, res, next) => {
    try {
        const files = await getFiles();
        res.send(files);
    } catch (error) {
        next(error);
    }
});

export default filesRoutes;