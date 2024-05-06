const express = require("express");

const app = express();
app.use(express.json());

app.post("/pokemon", async (req, res) => {
  let { body } = req;

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${body?.pokemon}`
    );

    if (response.ok) {
      const parsedResponse = await response.json();
      res.status(response.status).send(parsedResponse.abilities);
    } else {
      const errorText = await response.text();
      res.status(response.status).send(errorText);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen("8080", () => {
  console.log("Server listening on port 8080");
});
