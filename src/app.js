import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin:"*",
    credentials:true
}))

app.use(express.urlencoded({
    extended:true,
    limit:"50kb"
}))

app.use(express.json({
    limit:"50kb"
}))


// Global Error handler 

app.use((err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
});

// Data Route Declaration

import dataRouter from "./routes/data.route.js"
app.use("/api/v1/data",dataRouter)

// Dcoument Route Declaration

import documnetRouter from "./routes/document.route.js"
app.use("/api/v1/document/",documnetRouter)

// Alert Route Declaration

import alertRouter from "./routes/alert.route.js"
app.use("/alert",alertRouter)


export {app}
