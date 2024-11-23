/*
    This middleware is used to count the number of requests made to the server.
*/

// Import the prom-client module
const prometheusClient = require('prom-client');

// Create a new Counter metric to count the number of requests
const numOfRequests = new prometheusClient.Counter({
    name: 'num_of_requests',
    help: 'Number of requests made',
    labelNames: ['method', 'route', 'code'],
});

// Export the middleware function
module.exports = (req, res, next) => {
    // Increment the counter for the request
    numOfRequests
        .labels(req.method, req.route ? req.route.path : req.path, res.statusCode)
        .inc();

    // Call the next middleware in the chain
    next();
};