import dotenv from "dotenv"
import { app } from "./app.js";
// import dbConnection from "./db/index.js"

dotenv.config()

const PORT = process.env.PORT || 5656

// dbConnection()
// .then(()=>{
//     app.on("error",()=>{
//         console.log("Error occured while db connection at entry point");
//     })

//     app.listen(PORT,()=>{
//         console.log(`Server is runing on the port ${PORT}`)
//     })
// })
// .catch((error)=>{
//     console.log("Error occured while db connection at entry point")
// })

app.listen(PORT,()=>{
    console.log(`Server is runing on the port ${PORT}`)
})