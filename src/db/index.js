import mongoose from "mongoose";


const dbConnection = async ()=> {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
        console.log("DB Successfull Connected");
    } catch (error) {
        console.log("DB Connection Error",error);
        process.exit(1)
    }
}

export default dbConnection