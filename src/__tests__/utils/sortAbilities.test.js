const sortAbilities = require("../../utils/sortAbilities");

describe("sortAbilities", () => {
    it("should sort abilities alphabetically by name", () => {
      const abilities = [
        { ability: { name: "static" } },
        { ability: { name: "lightning-rod" } },
        { ability: { name: "surge-surfer" } },
      ];
      const sortedAbilities = sortAbilities(abilities);
      const expectedSortedAbilities = [
        { ability: { name: "lightning-rod" } },
        { ability: { name: "static" } },
        { ability: { name: "surge-surfer" } },
      ];
      expect(sortedAbilities).toEqual(expectedSortedAbilities);
    });
  });