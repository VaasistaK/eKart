var models = require('../models/schema');

exports.getProducts = async (req, res, next) => {
    try {

        let products = await models.products.find({});
        if(products.length === 0){
            let error = new Error("Products Not Found!");
            error.status = 400;
            throw error;
        }else{
            res.status(200).send(products);
        }

        
    } catch (error) {
        next(error);
    }
};

exports.getProductById = async (req, res, next) => {
    try {

        let product = await models.products.find({"productId": req.params.productId});
        if(product.length === 0){
            let error = new Error("Product Not Found!");
            error.status = 400;
            throw error;
        }else{
            res.status(200).send(product[0]);
        }
        
    } catch (error) {
        next(error);
    }
}