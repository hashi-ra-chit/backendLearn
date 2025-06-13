// hum sbse pehle dotenv ko configure kar dete 
// hain uss file ke through jo sbse pehle 
// run hone waali hai so that env variable saari Files 
// tak pohch jaaye 
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './db/index.js';
// data base ka jab bhi use kro to async await , try catch ka use kro hi 
//  kyuki database boht door rkha rehta hia time lgta hai
import { DB_NAME } from "./constants.js";
import express from "express";
const app = express();

connectDB()














// use kiya effy ka so that ye code immediately execute ho jaye
// to connect Data Base
//  hum simply ek line me bhi 
//  mongoose.connect({process.env.MONGODB_URI}) krke kr skte the 
// but ye bad practice hai

// approach 1 to connect db
/*(async ()=>{
    try{
       await mongoose.connect(`${process.env.MONGODB_URI} / ${DB_NAME}`);
       app.on("error" , (error) => {
            console.log(error);
            throw error
       })
       app.listen(process.env.PORT , ()=>{
            console.log(`App is listening on PORT : ${process.env.PORT}`)
       })
    }
    catch(error){
        console.log(error);    
    }
})()*/
