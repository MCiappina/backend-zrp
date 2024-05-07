const { searchPokemon } = require("../../controllers/pokemonController");

describe("searchPokemon", () => {
  const mockRequest = (body) => ({ body });
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return serialized response with sorted abilities", async () => {
    const req = mockRequest({ pokemon: "pikachu" });
    const res = mockResponse();
    const mockData = {
      abilities: [
        { ability: { name: "static" } },
        { ability: { name: "lightning-rod" } },
        { ability: { name: "surge-surfer" } },
      ],
    };
    const mockSerializedResponse = {
      ...mockData,
      abilities: [
        { ability: { name: "lightning-rod" } },
        { ability: { name: "static" } },
        { ability: { name: "surge-surfer" } },
      ],
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockData),
    });

    await searchPokemon(req, res);

    expect(fetch).toHaveBeenCalledWith(`${process.env.POKE_API_URL}pikachu`);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockSerializedResponse);
    expect(console.error).not.toHaveBeenCalled();
  });

  it("should return error response when fetching fails", async () => {
    const req = mockRequest({ pokemon: "pikachu" });
    const res = mockResponse();

    global.fetch = jest.fn().mockRejectedValue(new Error("Failed to fetch"));

    await searchPokemon(req, res);

    expect(fetch).toHaveBeenCalledWith(`${process.env.POKE_API_URL}pikachu`);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Internal Server Error");
    expect(console.error).toHaveBeenCalled();
  });

  it("should handle internal server errors", async () => {
    const req = mockRequest({ pokemon: "pikachu" });
    const res = mockResponse();

    global.fetch = jest.fn().mockRejectedValue(new Error("Internal Server Error"));

    await searchPokemon(req, res);

    expect(fetch).toHaveBeenCalledWith(`${process.env.POKE_API_URL}pikachu`);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Internal Server Error");
    expect(console.error).toHaveBeenCalled();
  });
});