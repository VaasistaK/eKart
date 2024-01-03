const { cart } = require('../models/schema');
var models = require('../models/schema');

exports.viewCart = async (req, res, next) => {
    try {

        let cartItems = await models.cart.find({ username: req.params.username });
        if (cartItems.length === 0) {
            let error = new Error("Cart is empty");
            error.status = 400;
            throw error;
        } else {
            res.status(200).send(cartItems[0]);
        }
    } catch (error) {
        next(error);
    }
}

exports.addToCart = async (req, res, next) => {
    try {
        let productDetails = req.body.productDetails;
        let quantity = req.body.quantity;
        let cartItems = await models.cart.find({ username: req.params.username });
        if (cartItems.length === 0) {

            let cartItem = {};
            cartItem.username = req.params.username;
            // cartItem.quantity = quantity;
            productDetails.quantity = quantity;
            cartItem.productDetails = productDetails;
            cartItem.totalQuantity = quantity;
            cartItem.totalDeliveryCharge = quantity * productDetails.deliveryCharge;
            let totalPrice = (quantity * Number.parseInt(productDetails.dicountedPrice));
            cartItem.totalPrice = totalPrice;
            cartItem.grandTotal = (totalPrice + (quantity * productDetails.deliveryCharge));
            let createdObj = await models.cart.create(cartItem);
            //if(createdObj !== null){
            res.status(200).send({
                "message": "Item Added to Cart Successfully!"
            })

        }else{
            
            let cartItem = cartItems[0];

            let productIds = cartItem.productDetails.filter(a => a.productId === productDetails.productId);
            if (productIds.length === 0) {
                productDetails.quantity = quantity;
                cartItem.productDetails.push(productDetails);
            } else {
                productIds[0].quantity += quantity;
            }

            cartItem.totalQuantity += quantity;
            cartItem.totalDeliveryCharge += quantity * productDetails.deliveryCharge;
            let totalPrice = (quantity * Number.parseInt(productDetails.dicountedPrice));
            cartItem.totalPrice += totalPrice;
            cartItem.grandTotal += (totalPrice + (quantity * productDetails.deliveryCharge));
            let updatedObj = await models.cart.updateOne({ username: req.params.username }, cartItem);
            console.log(updatedObj);
            if (updatedObj.modifiedCount === 1) {
                res.status(200).send({
                    "message": "Item added to Cart Successfully!"
                })
            } else {
                let error = new Error("Some Error occured! Please try again");
                error.status = 400;
                throw error;
            }
        }
        // }else{
        //     let error = new Error("Some Error occured! Please try again");
        //     error.status = 400;
        //     throw error;
        // }
    } catch (error) {
        next(error);
    }
}

exports.modifyCart = async (req, res, next) => {
    try {

        let productDetails = req.body.productDetails;
        let IncomingQuantity = req.body.quantity;
        let cartItems = await models.cart.find({ username: req.params.username });

        let cartItem = cartItems[0];
        let productInCart = cartItem.productDetails.filter(a => a.productId === productDetails.productId)[0];
        let differenceOfQuantity = IncomingQuantity - productInCart.quantity;



        cartItem.totalQuantity += differenceOfQuantity;
        //productInCart.quantity += differenceOfQuantity;

        if(differenceOfQuantity !== 0){
            cartItem.productDetails.forEach(a => {
                if(a.productId === productDetails.productId){
                    a.quantity += differenceOfQuantity;
                }
            });
            let totalPrice = (differenceOfQuantity * Number.parseInt(productInCart.dicountedPrice));

            cartItem.totalDeliveryCharge += (differenceOfQuantity * productInCart.deliveryCharge);
            cartItem.totalPrice += totalPrice;
            cartItem.grandTotal += (totalPrice);

        }else{
            cartItem.productDetails = cartItem.productDetails.filter(a => a.productId !== productInCart.productId);
            if(cartItem.productDetails.length !== 0){
                let totalPrice = (IncomingQuantity * Number.parseInt(productInCart.dicountedPrice));

                cartItem.totalPrice -= totalPrice;
                cartItem.grandTotal -= (totalPrice + (IncomingQuantity * productInCart.deliveryCharge));
                cartItem.totalDeliveryCharge -= (IncomingQuantity * productInCart.deliveryCharge);
                cartItem.totalQuantity -= IncomingQuantity;
            }else{
                cartItem.totalPrice = cartItem.grandTotal = cartItem.totalDeliveryCharge = cartItem.totalQuantity = 0;
            }
            
        }
        
        //cartItem.totalDeliveryCharge -= productInCart.deliveryCharge;
        

        let updatedObj = await models.cart.updateOne({username: req.params.username},cartItem);
        console.log(updatedObj);

        if(updatedObj.modifiedCount !== 1){
            let error = new Error("Some Error occured! Please try again");
            error.status = 400;
            throw error;
        }else{
            res.status(200).send({
                "message": "Updated Cart Successfully!"
            })
        }

    } catch (error) {
        next(error);
    }
}

exports.removeItemsFromCart = async (req, res, next) => {
    try {
        let deletedObj = await models.cart.remove({ username: req.params.username });
        res.status(200).send({
            "message": "Items removed from cart successfully!"
        })
    } catch (error) {
        next(error);
    }
}

exports.placeOrder = async (req, res, next) => {
    try {
        let orders = await models.orders.find({});
        let newId = this.idGenerator(orders.length);

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate()+7);

        let orderItem = {};
        orderItem.orderId = newId;
        orderItem.username = req.params.username;
        orderItem.cartDetails = req.body;
        orderItem.orderedOn = Date.now();
        orderItem.expectedOn = tomorrow;

        let createdObj = await models.orders.create(orderItem);
        res.status(201).send({
            "message": "Order Placed Successfully!"
        })
    } catch (error) {
        next(error);
    }
};

exports.getOrders = async (req, res, next) => {
    try {
        let orders = await models.orders.find({"username": req.params.username});
        if(orders.length === 0){
            let error = new Error("No Orders Available!");
            error.status = 400;
            throw error;
        }else{
            res.status(200).send(orders);
        }
    } catch (error) {
        next(error);
    }
}

exports.idGenerator = (length) => {
    let prefix = 'O1';
    let suffix = length < 9 ? '0' : '';

    return prefix + suffix + (length + 1);
}