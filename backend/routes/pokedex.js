const express = require('express');
const { getPokedex, getPokemon } = require('../controllers/pokedex');

const routesPokedex = express.Router();

routesPokedex.get('/',getPokedex);
routesPokedex.get('/:name',getPokemon);

module.exports = routesPokedex;