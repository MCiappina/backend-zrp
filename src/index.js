const express = require("express");
const cors = require('cors');
const app = express();
const pokemonRouter = require('./routes/pokemon.js')
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use('/pokemon', pokemonRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
