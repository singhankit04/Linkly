import mongoose from"mongoose"

const urlSchema = new mongoose.Schema({
        longUrl:{
            type:String,
            unique: true,
            required: true, 
            // index: true  
        },
        shortUrl:{
            type:String,
            required: true,  
            unique:true,
            index: true   
        },
        clicks:{
            type:Number,
            default:0,
        },
        // user:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref:"user",
        //     required:true,
        // }
}, {timestamps:true});


const urlModel = mongoose.model("url", urlSchema);

export default urlModel;