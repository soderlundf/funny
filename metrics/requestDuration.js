/*
This middleware will record the duration of each request and store it in a histogram.
*/
const prometheusClient = require('prom-client');

// Define a list of paths to exclude from the count.
const excludes = ['/metrics'];

// Create a new Histogram metric to record the duration of requests.
const httpRequestDurationMicroseconds = new prometheusClient.Histogram({
    name: 'http_request_duration_microseconds',
    help: 'Duration of HTTP requests in microseconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [50000, 100000, 200000, 300000, 400000, 500000, 1000000],
    unit: 'microseconds',
    type: 'histogram'
});

module.exports = (req, res, next) => {
    // Exclude certain paths from the count.
    if (excludes.includes(req.path)) {
        return next();
    }

    // Increment the counter for the request
    const start = process.hrtime();
    res.on("finish", () => {
        const diff = process.hrtime(start);
        const duration = diff[0] * 1e6 + diff[1] / 1e3; // convert to microseconds
        httpRequestDurationMicroseconds
            .labels(req.method, req.route ? req.route.path : req.path, res.statusCode)
            .observe(duration);

        console.log(`Request to ${req.path} took ${duration}µs`);
    });
    next();
};