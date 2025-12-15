import express from "express";
import filesRoutes from "#api/files";
import foldersRoutes from "#api/folders";

const app = express();
export default app;

//body parser
app.use(express.json());

//logger

app.use((req, res, next)=>{
    console.log(req.method, req.originalUrl);
    next();
});

//folder route
app.use('/folders', foldersRoutes);

// file route
app.use('/files', filesRoutes);

// general error handler

app.use((err, req, res, next)=>{
    console.log(err);
    res.status(500).send("Something went wrong with the request!");
    
});
