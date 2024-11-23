const express = require('express');

const allowedContentTypes = ['application/json', 'text/plain; version=0.0.4; charset=utf-8'];

module.exports = (req, res, next) => {
    if (!allowedContentTypes.includes(req.headers['content-type'])) {
        res.status(400).json('Invalid content type');
        return;
    }
    next();
}