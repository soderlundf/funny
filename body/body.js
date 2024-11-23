module.exports = (req, res, next) => {
    // if (req.body.length > 0) {
    console.log(req.body);
    // }

    // Call the next middleware in the chain
    next();
}