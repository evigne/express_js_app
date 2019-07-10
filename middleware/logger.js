const moment = require ('moment');


//creating a middleware --- next=> to call next middle ware function in stack
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`)
    next();
  }

module.exports = logger;  