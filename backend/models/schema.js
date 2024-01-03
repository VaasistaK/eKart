const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ekartdb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var obj = {};

var userSchema = new mongoose.Schema({
        username:{
            type: String,
            unique: true,
            required: [true, 'Required Field']
        },
        name:{
            type: String,
            required: [true, 'Required Field']
        },
        password:{
            type: String,
            required: [true, 'Required Field']
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    });

var userModel = mongoose.model('users', userSchema);
obj.users = userModel;

var productsSchema = new mongoose.Schema({
    
    productId:{
        type: String,
        unique: true,
        required: [true, 'Required Field']
    },
    productName:{
        type: String,
        unique: true,
        required: [true, 'Required Field']
    },
    manufacturer:{
        type: String,
        unique: true,
        required: [true, 'Required Field']
    },
    price:{
        type: String,
        unique: true,
        required: [true, 'Required Field']
    },
    description:{
        type: String
    },
    category: {
        type: String,
        unique: true,
        required: [true, 'Required Field']
    },
    isDiscountAvailable:{
        type: Boolean
    },
    discountPercentage:{
        type: Number
    },
    discountedPrice:{
        type: Number
    },
    deliveryCharge:{
        type: Number
    },
    isDealOfTheDay:{
        type: Boolean
    },
    rating:{
        type: Number
    },
    reviews:{
        type: Array
    },
    imageUrl:{
        type: String
    }
});

var productsModel = new mongoose.model('products', productsSchema);
obj.products = productsModel;

var cartSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Required Field']
    },
    productDetails: {
        type: Array
    },
    totalQuantity: {
        type: Number
    },
    totalDeliveryCharge: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    grandTotal: {
        type: Number
    }
});

var cartModel = mongoose.model('cart', cartSchema);
obj.cart = cartModel;

var orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
        required: [true, 'Required field']
    },
    username: {
        type: String,
        required: [true, 'Required field']
    },
    cartDetails:{
        type: Object,
        required: [true, 'Required field']
    },
    orderedOn: {
        type: Date,
        required: [true, 'Required field']
    },
    expectedOn: {
        type: Date,
        required: [true, 'Required field']
    }
});

var orderModel = mongoose.model('orders', orderSchema);
obj.orders = orderModel;

module.exports = obj;