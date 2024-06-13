const express = require('express');
const { getBerrys } = require('../controllers/berries');

const routesBerry = express.Router();

routesBerry.get('/', getBerrys);

module.exports = routesBerry;