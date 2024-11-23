const prometheusClient = require('prom-client');

const ipRequestCount = new prometheusClient.Histogram({
    name: 'ip_request_count',
    help: 'Count of requests per IP address',
    labelNames: ['ip'],
    buckets: [1, 2, 3, 4, 5, 10, 20, 50, 100] // Adjust buckets as needed
});

module.exports = (req, res, next) => {
    const ip = req.ip || req.ip;
    ipRequestCount.labels(ip).observe(1);
    next();
};