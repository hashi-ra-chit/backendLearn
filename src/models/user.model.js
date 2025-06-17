import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// we cannot use these directly we want ki 
// data base me save hone se just pehle 
// kuch kaam kre hum data pr then wo save ho
// kaam = incrypt , tokens 
// so we'll use (pre) hook .. data save hone se 
// pehle ka kaam we can do using this hook
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
        // jab bhi database searching thodi aasan karn i ho 
        // to make this change index : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        // jab bhi database searching thodi aasan karn i ho 
        // to make this change index : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        index : true
        // jab bhi database searching thodi aasan karn i ho 
        // to make this change index : true
    },
    avatar : {
        type : String,
        required : true,
    },
    coverImage :{
        type : String,  //cloudinary url
    },
    watchHistory:[{
        type : mongoose.Schema.type.ObjectId,
        ref : "Video"
    }],
    password :{
        type : String,
        required : [true , "Password is REQUIRED"],
        // we can type a message with required field 
    },
    refreshToken :{
        type : String,
    }
    
} ,{
    timestamps : true,
});
//  event we wanna use on pre hook
//  ki kis event ke pehle kya krna chahte ho
// save , validate , remove , updateOne , deleteOne , init
// yahan call back isliye nhi likh skte 
// kyuki call back function does'nt have this reference

userSchema.pre("save" , async function(req , res , next) {
    // yahan problem ye thi ki har baar jb bhi kuch
    // bhi user change krta .. whether photo
    // use password change krna hi pdta so we applied a check
    if(!this.isModified("password")){
        return next();
    }
    this.password = bcrypt.hash(this.password , 10);
    next();
})
// creating the custom method so that we can check whether
// password is correct or not and then go to frontend
userSchema.methods.IsPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password);
    //  true , false me bata deta hai 
}
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        // payload(data)
        {
            _id : this._id,
            email : this.email,
            usename : this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIN : process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
    // payload(data)
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIN : process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}
export const User = mongoose.model("User" , userSchema);