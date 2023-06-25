import awdizToken from "../models/awdizToken.js";
import users from "../models/users.js";
import encrypt from "encryptjs";

export const checkRegister = (req,res,next) =>{
    try{
        const {username, email, password, confirmPassword, role, pin, number} = req.body;
        if(!username) return res.send("Name is required.");
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("Password field is required.");
        if(!confirmPassword) return res.send("Confirm password field is required.");
        if(!role) return res.send("Please enter a proper role.");
        if(!pin) return res.send("Pin is required.");
        if(!number) return res.send("Contact number is required.");

        if(password.length < 8 || confirmPassword.length < 8){
            return res.send("Password should be more than 8 characters.");
        }
        if(password !== confirmPassword){
            return res.send("Passwords do not match.");
        }
        next();
    }catch(err){
        return res.send(err);
    }
}

export const checkLogin = async (req,res,next) =>{
    try{
        const {email, password} = req.body;
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("Password is required.");

        const user = await users.find({email}).exec();
        if(!user.length) return res.send("User not found. Please proceed to register.");

        let secretKeyPass = "secretKeyPass";
        const decryptPass = encrypt.decrypt(user[0].password, secretKeyPass, 256);

        if(password !== decryptPass){
            return res.send("Incorrect credentials.");
        }
        next();
    }catch(err){
        return res.send(err);
    }
}

export const checkUser = async (req,res,next) =>{
    try{
        const {email, password} = req.body;
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("Password is required.");

        const user = await users.find({email}).exec();
        if(!user.length) return res.send("User not found.");

        let secretKeyPass = "secretKeyPass";;
        const decryptPass = encrypt.decrypt(user[0].password, secretKeyPass, 256);

        if(password !==decryptPass){
            return res.send("Incorrect credentials.");
        }
        next();
    }catch(err){
        return res.send(err);
    }
}

export const checkRole = async(req,res,next) =>{
    try{
        const {email, password, pin , pName, pPrice, pCategory, tokenData} = req.body;
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("Password is required.");
        if(!pin) return res.send("Pin is required.");
        if(!pName) return res.send("Product name is required.");
        if(!pPrice) return res.send("Product price is required.");
        if(!pCategory) return res.send("Product category is required.");
        if(!tokenData) return res.send("Token is required. Please generate one from /generateToken.");

        const user = await users.find({email}).exec();
        if(!user.length) return res.send("User not found.");
        let secretKeyPass = "secretKeyPass";
        const decryptPass = encrypt.decrypt(user[0].password, secretKeyPass, 256);
        let secretKeyPin = "secretKeyPin";
        const decryptPin = encrypt.decrypt(user[0].pin, secretKeyPin, 256);

        const response = await awdizToken.find({}).exec();
        if(!response.length) return res.send("Generate another token.");


        if(password !== decryptPass || pin !==decryptPin){
            return res.send("Incorrect Credentials.");
        }
        let flag = false;
        if(tokenData == response[0].sessionToken && (user[0].role =='seller' || user[0].role == 'admin')){
            flag = true;
        }
        if(flag){
            next();
        }else{
            return res.send("Please check if you are registered as a seller or admin.");
        }
    }catch(err){
        return res.send(err);
    }
}

export const checkGetProductRole = async (req,res,next) =>{
    try{
        const {email, password, pin, tokenData} = req.body;
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("Password is required.");
        if(!pin) return res.send("Pin is required.");
        if(!tokenData) return res.send("Token is required. Please generate one from /generateToken.");

        const user = await users.find({email}).exec();
        if(!user.length) return res.send("User not found.");
        const response = await awdizToken.find({}).exec();
        if(!response.length) return res.send("Generate another token.");
        let secretKeyPass = "secretKeyPass";
        const decryptPass = encrypt.decrypt(user[0].password, secretKeyPass, 256);
        let secretKeyPin = "secretKeyPin";
        const decryptPin = encrypt.decrypt(user[0].pin, secretKeyPin, 256);

        if(password !== decryptPass || pin !== decryptPin){
            return res.send("Incorrect credentials.");
        }
        let flag = true;
        if(tokenData == response[0].sessionToken && (user[0].role == 'buyer' || user[0].role == 'admin')){
            flag = true;
        }
        if(flag){
            next();
        }else{
            return res.send("Please check if you are registered as a buyer or admin.");
        }
    }catch(err){
        return res.send(err);
    }
}

export const checkAdminRole = async (req,res,next) =>{
    try{
        const {email, password, pin, tokenData, _id} = req.body;
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("Password is required.");
        if(!pin) return res.send("Pin is required.");
        if(!tokenData) return res.send("Token is required. Please generate one from /generateToken.");
        if(!_id) return res.send("Product ID is required.");

        const user = await users.find({email}).exec();
        if(!user.length) return res.send("User not found.");
        const response = await awdizToken.find({}).exec();
        if(!response.length) return res.send("Please generate another token.");

        let secretKeyPass = "secretKeyPass";
        const decryptPass = encrypt.decrypt(user[0].password, secretKeyPass, 256);
        let secretKeyPin = "secretKeyPin";
        const decryptPin = encrypt.decrypt(user[0].pin, secretKeyPin, 256);

        if(password !== decryptPass || pin !== decryptPin){
            return res.send("Incorrect credentials.");
        }
        let flag = false;
        if(tokenData == response[0].sessionToken && user[0].role =='admin'){
            flag = true;
        }

        if(flag){
            next();
        }else{
            return res.send("Please check if you are verified as an admin.");
        }
    }catch(err){
        return res.send(err);
    }
}