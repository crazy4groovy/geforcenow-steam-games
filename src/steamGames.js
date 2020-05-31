const fetch = require("node-fetch");
const cheerio = require("cheerio");
// const sanitizeHtml = require('sanitize-html')

module.exports = async function () {
  const raw = await fetch("https://steamdb.info/sales/", {
    method: "get",
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36",
    },
  }).then((d) => d.text());
  // const $ = cheerio.load(sanitizeHtml(raw, {}))

  const $ = cheerio.load(raw);

  const rows = $("tr.app");
  const cells = $("td", "tr.app");
  const nameLinks = $("tr.app a.b");
  const highestDiscount = $("tr.app span.highest-discount");
  const priceDiscount = $("tr.app td.price-discount");

  console.log(
    "https://steamdb.info/sales/",
    rows.length,
    cells.length,
    nameLinks.length,
    highestDiscount.length,
    priceDiscount.length
  );

  return nameLinks
    .map((i, e) => {
      const el = $(e);
      const name = el.text().toUpperCase();
      const appId = el.attr("href").match(/\d+/)[0];
      return { name, appId };
    })
    .get();
};
