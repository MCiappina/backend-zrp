function sortAbilities(abilities) {
  return abilities.sort((a, b) => a.ability.name.localeCompare(b.ability.name));
}

module.exports = sortAbilities;