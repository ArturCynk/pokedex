const express = require('express');
const cors = require('cors');
const routesPokedex = require('./routes/pokedex')

const app = express()
const port = 5000

app.use(cors());

app.use(routesPokedex);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))