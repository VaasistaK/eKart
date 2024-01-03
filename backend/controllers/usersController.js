var models = require('../models/schema');

exports.userSignup = async (req, res, next) => {
    //res.send('respond with a resource');
    try {

        let alreadyPresent = await models.users.find({"username": req.body.username});
        if(alreadyPresent.length > 0){
            let error = new Error("User already Present. Please try another username");
            error.status = 400;
            throw error;
        }
        let createdObj = await models.users.create(req.body);
        res.status(201).send({
            "message": "User Created Successfully!"
        })

    } catch (error) {
        next(error);
    }
};

exports.userLogin = async (req, res, next) => {
    try {
        let users = await models.users.find({ "username": req.body.username });
        if (users.length === 0) {

            let error = new Error("User not found!");
            error.status = 400;
            throw error;

        } else {
            let user = users[0];
            if (user.password !== req.body.password) {
                let error = new Error("Username/Password is incorrect!");
                error.status = 400;
                throw error;
            } else {
                res.status(200).send({
                    "message": "Login Successful!"
                });
            }
        }

    } catch (error) {
        next(error);
    }
};

exports.updatePassword = async (req, res, next) => {
    try {
        let user = await models.users.find({ "username": req.params.username });
        if (user.length === 0) {
            let error = new Error("User not found!");
            error.status = 400;
            throw error;
        } else {
            let updateObj = await models.users.updateOne({ "username": req.params.username }, { $set: { "password": req.body.password } });
            //console.log(updateObj);
            if (updateObj.modifiedCount === 1) {
                res.status(200).send({
                    "message": "Password updated Successfully!"
                })
            } else {
                let error = new Error("Some Problem Occured while updating password. Please try again!");
                error.status = 400;
                throw error;
            }
        }
    } catch (error) {
        next(error);
    }
};

exports.findUser = async (req, res, next) => {
    try {

        let user = await models.users.find({"username":req.params.username});
        if(user.length > 0){
            res.status(200).send({
                "userPresent": true
            })
        }else{
            res.status(200).send({
                "userPresent": false
            })
        }
        
    } catch (error) {
        next(error);
    }
}