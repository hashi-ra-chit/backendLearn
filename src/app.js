// ye file app express ke liye hai and isme 
// middlewares , cors , bodyparsers and kaafi 
// kaafi kuch hoga 
// data kaafi jagaho se aata hai some of them are
// form submission ,cookies, json format mein , se
import express from 'express';
import cors from "cors";
// server se user browser par crud operations kar paau
import cookieparser from "cookie-parser";
const app = express();

// yahan hum cors setup kar rhe 
// jisme konsa origin allowed hai wo diya hai
// and credentials allow kre hain

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))
// yahan par incoming request jo bhi aayi hai kahin se bhi
// like kisi ne username , password daala to iss chhez ko json me 
// convert karta express
// limit is for security purpose ki koi attacker
// overload na kar de app so uski parse ki limit set kari gyi hai yahhan 
app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({extended : true , limit : "16kb "}))
app.use(express.static("public"));
app.use(cookieparser());
export default app;