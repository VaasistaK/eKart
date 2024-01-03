var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');
var productsController = require('../controllers/productsController');
var cartController = require('../controllers/cartController');

router.post('/signup', usersController.userSignup);

router.post('/login', usersController.userLogin);

router.post('/:username/update', usersController.updatePassword);

router.post('/findUser/:username', usersController.findUser);

router.get('/getProducts', productsController.getProducts);

router.get('/getProduct/:productId', productsController.getProductById);

router.get('/viewCart/:username', cartController.viewCart);

router.post('/addToCart/:username', cartController.addToCart);

router.delete('/removeItemsFromCart/:username', cartController.removeItemsFromCart);

router.put('/modifyCart/:username', cartController.modifyCart);

router.post('/placeOrder/:username', cartController.placeOrder);

router.get('/getOrders/:username', cartController.getOrders);

router.all('*', (req, res, next) => {
    try {
        let err = new Error("Request does not Exist!");
        err.status = 404;
        throw err;
    } catch (error) {
        next(error);
    }
})

module.exports = router;
