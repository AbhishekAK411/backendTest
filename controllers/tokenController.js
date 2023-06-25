import awdizToken from "../models/awdizToken.js";

export const getToken = async (req,res) =>{
    try{
        const token = await awdizToken.findOne({}).exec();
        return res.send(token.sessionToken);
    }catch(err){
        return res.send(err);
    }
}

