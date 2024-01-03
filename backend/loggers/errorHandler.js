const fs = require("fs");
const { promisify } = require("util");
const appendFile = promisify(fs.appendFile);
async function errorHandler(error, req, res, next) {
    try {

        let errorMessage = error.message;
        let status = error.status ? error.status : 500;
        const logMessage = `${new Date()} - ${req.method} - ${req.url} - ${status} - ${errorMessage} \n`;

        await appendFile("ErrorLog.txt", logMessage);

        res.status(status).send({
            "message": errorMessage
        });
    } catch (err) {
        next(err);
    }






}
module.exports = errorHandler;