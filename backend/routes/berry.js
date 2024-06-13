const express = require('express');
const { getBerrys } = require('../controllers/berry');

const routesBerry = express.Router();

routesBerry.get('/', getBerrys);

module.exports = routesBerry;