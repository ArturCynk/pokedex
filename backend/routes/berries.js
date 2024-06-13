const express = require('express');
const { getBerrys, getBerry } = require('../controllers/berries');

const routesBerry = express.Router();

routesBerry.get('/', getBerrys);
routesBerry.get('/:name', getBerry);

module.exports = routesBerry;