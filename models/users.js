import mongoose from "mongoose";
import { Schema } from "mongoose";

const user = new Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    pin : {
        type : String,
        required : true
    },
    number : {
        type : String,
        required : true
    }
});

export default mongoose.model("Users", user);