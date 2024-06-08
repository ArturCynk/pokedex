const express = require('express')
const routesPokedex = require('./routes/pokedex')

const app = express()
const port = 3000

app.use(routesPokedex);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))