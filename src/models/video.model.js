import mongoose from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
const videoSchema = new mongoose.Schema({
    videoFile :{
        type : String, //cloudnary url
        required : true
    },
    thumbnail :{
        type : String, //cloudnary url
        required : true
    },
    title :{
        type : String, 
        required : true
    },
    description :{
        type : String, 
        required : true
    },
    duration :{
        // duration and videos , photos details automatically 
        // cloudinary se aajati hain so
        type : Number, //cloudnary url
        required : true
    },
    views :{
        type : Number,
        default : 0
    },
    isPublished:{
        type : Boolean,
        default : true
    },
    owner:{
        type : mongoose.Schema.type.Object.Id,
        ref : "User"
    }
});
videoSchema.plugin(mongooseAggregatePaginate);
// now we can write queries .. aggregation queries
export const Video = mongoose.model("Video" , videoSchema);