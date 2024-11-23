/*
This middleware will record the duration of each request and store it in a histogram.
*/
const prometheusClient = require('prom-client');

// Define a list of paths to exclude from the count.
const excludes = ['/metrics'];

// Create a new Histogram metric to record the duration of requests.
const httpRequestDurationMicroseconds = new prometheusClient.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [50, 100, 200, 300, 400, 500, 1000] // You can adjust these buckets as needed
});

module.exports = (req, res, next) => {
    // Exclude certain paths from the count.
    if (excludes.includes(req.path)) {
        return next();
    }

    // Increment the counter for the request
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        httpRequestDurationMicroseconds
            .labels(req.method, req.route ? req.route.path : req.path, res.statusCode)
            .observe(duration);

        console.log(`Request to ${req.path} took ${duration}ms`);
    });
    next();
};