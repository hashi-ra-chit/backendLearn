// approach 2 to connect db
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// ek call back function banaya and usme try 
// try catch ke andr db connect kr rhe hain
const connectDB = async () =>{
    try{
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority`);
        console.log(`\n MongoDB connected !! DB host :${connectionInstance.connection.host}`);
    }
    catch(error){
        console.log("MongoDB connection error " , error);
        process.exit(1);
    }
}
export default connectDB;