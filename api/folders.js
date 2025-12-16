
import express from "express";
import { getFolders, getFolderById, createFile } from "#db/query/file-folder-queries";

const foldersRoutes = express.Router();

foldersRoutes.route('/')
.get(async (req, res, next) => {
    try {
        const folders = await getFolders();
        res.send(folders);
    } catch (error) {
        next(error);
    }
});

foldersRoutes.route('/:id')
.get(async (req, res, next) => {
    try {
        const { id } = req.params;
        const folder = await getFolderById(id);

        if (!folder) {
            return res.status(404).send({ error: "Folder not found" });
        }

        res.send(folder);
    } catch (error) {
        next(error);
    }
});

foldersRoutes.route('/:id/files')
.post(async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if required fields exist
        const { name, size } = req.body || {};

        if (!name || size === undefined || size === null) {
            return res.status(400).send({ error: "Missing required fields: name and size" });
        }

        // Try to create the file 
        try {
            const file = await createFile({ name, size, folderId: id });
            res.status(201).send(file);
        } catch (dbError) {
            //Error
            if (dbError) {
                return res.status(404).send({ error: "Folder not found" });
            }
            throw dbError;
        }
    } catch (error) {
        next(error);
    }
});

export default foldersRoutes;