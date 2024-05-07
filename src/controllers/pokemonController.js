require("dotenv").config();

const sortAbilities = require('../utils/sortAbilities');

exports.searchPokemon = async (req, res) => {
  try {
    const { pokemon } = req.body;
    const response = await fetch(`${process.env.POKE_API_URL}${pokemon}`);

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).send(errorText);
    }

    const parsedResponse = await response.json();
    const sortedAbilities = sortAbilities(parsedResponse.abilities);

    const serializedResponse = {
      ...parsedResponse,
      abilities: sortedAbilities
    };

    res.status(response.status).json(serializedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};