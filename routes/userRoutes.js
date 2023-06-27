import express from "express";
import { checkAdminRole, checkGetProductRole, checkLogin, checkRegister, checkRole, checkUser } from "../middlewares/auth.js";
import { login, register } from "../controllers/userController.js";
import { CronJob } from "cron";
import awdizToken from "../models/awdizToken.js";
import { getToken } from "../controllers/tokenController.js";
import { addProduct, deleteProduct, getProduct } from "../controllers/prodControllers.js";


const router = express.Router();

let job = new CronJob('*/1 */4 * * *', 
async () =>{
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcedfghijklmnopqrstuvwxyz0123456789';
        let charlength = characters.length;
        let length = 100;
        let accessToken = "";
        for(let i=0;i<length;i++){
            accessToken += characters.charAt(Math.floor(Math.random() * charlength));
        }
        console.log(accessToken);

        //update the same existing token.
        const token = await awdizToken.findOne({}).exec();
        if(token){
            token.sessionToken = accessToken;
            await token.save();
        }

        const newToken = new awdizToken({
            sessionToken : accessToken
        });
        await newToken.save();
        console.log("created.");
});
job.start();


router.post("/register", checkRegister, register);
router.post("/login", checkLogin, login);
router.post("/generateToken", checkUser, getToken);
router.post("/addProduct", checkRole, addProduct);
router.post("/getProduct", checkGetProductRole, getProduct);
router.post("/deleteProduct", checkAdminRole, deleteProduct);
export default router;