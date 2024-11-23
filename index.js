const express = require("express");
const prometheusClient = require('prom-client');
const app = express();
const port = 3000;

const collectDefaultMetrics = prometheusClient.collectDefaultMetrics;
collectDefaultMetrics();

app.use(require('./metrics/numOfRequests'));
app.use(require('./metrics/userAgents'));
app.use(require('./metrics/requestDuration'));
app.use(require('./metrics/countClient'));

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', prometheusClient.register.contentType);
  res.end(await prometheusClient.register.metrics());
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`);
});
