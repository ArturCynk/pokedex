const express = require('express');
const { getPokedex } = require('../controllers/pokedex');

const routesPokedex = express.Router();

routesPokedex.get('/api/pokedex',getPokedex);

module.exports = routesPokedex;