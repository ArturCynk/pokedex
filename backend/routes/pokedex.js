const express = require('express');
const { getPokedex } = require('../controllers/pokedex');

const routesPokedex = express.Router();

routesPokedex.get('/',getPokedex);
routesPokedex.get('/:name')

module.exports = routesPokedex;