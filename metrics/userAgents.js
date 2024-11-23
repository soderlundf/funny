/*
    This middleware is used to count the number of unique user-agents that have accessed the server.
*/

// Import the prom-client module
const prometheusClient = require('prom-client');

// Create a new Counter metric to count the number of unique user-agents
const userAgentCounter = new prometheusClient.Counter({
    name: 'user_agent_count',
    help: 'Count of unique user-agents',
    labelNames: ['user_agent'],
});

// Export the middleware function
module.exports = (req, res, next) => {
    // Get the user-agent from the request headers
    const userAgent = req.headers['user-agent'] || 'unknown';

    // Increment the counter for the user-agent
    userAgentCounter.labels(userAgent).inc();

    // Call the next middleware in the chain
    next();
};