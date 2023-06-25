import mongoose from "mongoose";
import { Schema } from "mongoose";

const product = new Schema({
    pName : {
        type : String,
        required : true
    },
    pPrice : {
        type : String,
        required : true
    },
    pCategory : {
        type : String,
        required : true
    }
});

export default mongoose.model("Products", product);