const express = require('express');
const cors = require('cors');
const routesPokedex = require('./routes/pokedex');
const routesBerry = require('./routes/berries');

const app = express()
const port = 5000

app.use(cors());

app.use('/api/pokedex',routesPokedex);
app.use('/api/berry',routesBerry)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

lol
