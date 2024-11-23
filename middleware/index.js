const express = require('express');

module.exports = (app) => {
    app.use(express.json());
    app.use(require('../body/body'))
    app.use(require('../headers/headers'));
    // app.use(require('./headers/contentType'));
    app.use(require('../metrics/numOfRequests'));
    app.use(require('../metrics/userAgents'));
    app.use(require('../metrics/requestDuration'));
    app.use(require('../metrics/countClient'));
}