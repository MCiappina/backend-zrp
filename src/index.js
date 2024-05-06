const express = require("express");
const app = express();
const pokemonRouter = require('./routes/pokemon.js')

app.use(express.json());
app.use('/pokemon', pokemonRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
