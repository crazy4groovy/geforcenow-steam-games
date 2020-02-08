const fetch = require("node-fetch");

module.exports = async function() {
  const games = await fetch(
    "https://static.nvidiagrid.net/supported-public-game-list/gfnpc.json?JSON"
  ).then(d => d.json());

  return games
    .map(g => ({
      name: g.title.toUpperCase(),
      appId: (g.steamUrl.match(/\d+/) || [])[0],
    }));
};
