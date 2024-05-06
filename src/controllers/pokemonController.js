exports.searchPokemon = async (req, res) => {
  try {
    const { pokemon } = req.body;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).send(errorText);
    }

    const parsedResponse = await response.json();

    res.status(response.status).json(parsedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};