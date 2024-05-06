const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController.js');

router.post('/', pokemonController.searchPokemon);

module.exports = router;