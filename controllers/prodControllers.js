import products from "../models/products.js";

export const addProduct = async(req,res) =>{
    try{
        const {pName, pPrice, pCategory} = req.body;

        const newProduct = new products({
            pName,
            pPrice,
            pCategory
        });

        await newProduct.save();
        return res.send("Product added successfully.");
    }catch(err){
        return res.send(err);
    }
}

export const getProduct = async(req,res) =>{
    try{
        const productData = await products.find({}).exec();
        return res.send(productData);
    }catch(err){
        return res.send(err);
    }
}

export const deleteProduct = async(req,res) =>{
    try{
        const {_id} = req.body;
        await products.findOneAndDelete({_id}).exec();
        return res.send("Product removed successfully.");
    }catch(err){
        return res.send(err);
    }
}