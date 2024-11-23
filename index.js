const express = require("express");
// const prometheusClient = require('prom-client');
const app = express();
const port = 3000;

// const collectDefaultMetrics = prometheusClient.collectDefaultMetrics;
// collectDefaultMetrics();

// Import all enabled middleware functions.
require('./middleware')(app);

// Import all enabled routes.
require('./routes')(app);

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`);
});
