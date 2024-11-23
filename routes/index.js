const prometheusClient = require('prom-client');
const collectDefaultMetrics = prometheusClient.collectDefaultMetrics;
const express = require('express');
collectDefaultMetrics();

module.exports = (app) => {
    app.get('/metrics', async (req, res) => {
        res.set('Content-Type', prometheusClient.register.contentType);
        res.end(await prometheusClient.register.metrics());
    });

    app.get("/", (req, res) => {
        // res.send("Hello World!");
        setTimeout(() => {
            res.send("Hello after a random delay!");
        }, Math.floor(Math.random() * 5000));
    });

    app.post("/", (req, res) => {
        res.send("Hello World!");
    });
}