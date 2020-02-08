const fetch = require("node-fetch");

module.exports = async function(appId) {
  return fetch(`https://store.steampowered.com/appreviews/${appId}?json=1`)
    .then(d => d.json())
    .then(d => d.query_summary);
};
