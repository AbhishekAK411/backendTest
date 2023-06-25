import users from "../models/users.js";
import encrypt from "encryptjs";

export const register = async (req,res) =>{
    try{
        const {username, email, password, role, pin, number} = req.body;

        const user = await users.find({email}).exec();
        if(user.length) return res.send("User is already registered.");

        let secretKeyPass = "secretKeyPass";
        const encryptPass = encrypt.encrypt(password, secretKeyPass, 256);

        let secretKeyPin = "secretKeyPin";
        const encryptPin = encrypt.encrypt(pin, secretKeyPin, 256);
        const newUser = new users({
            username,
            email,
            password : encryptPass,
            role,
            pin : encryptPin,
            number
        });

        await newUser.save();
        return res.send("You have registered successfully.");
    }catch(err){
        return res.send(err);
    }
}

export const login = async(req,res) =>{
    try{
        const {email, password} = req.body;
        if(email && password){
            return res.send("You have logged in successfully.");
        }
    }catch(err){
        return res.send(err);
    }
}