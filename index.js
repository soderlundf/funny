const express = require("express");
const prometheusClient = require('prom-client');
const app = express();
const port = 3000;

const collectDefaultMetrics = prometheusClient.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestDurationMicroseconds = new prometheusClient.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [50, 100, 200, 300, 400, 500, 1000] // You can adjust these buckets as needed
});

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    httpRequestDurationMicroseconds
      .labels(req.method, req.route ? req.route.path : req.path, res.statusCode)
      .observe(duration);
    console.log(`Request to ${req.path} took ${duration}ms`);
  });
  next();
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', prometheusClient.register.contentType);
  res.end(await prometheusClient.register.metrics());
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
