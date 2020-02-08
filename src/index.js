const steamGames = require("./steamGames");
const steamScore = require("./steamScore");
const geforceNowGames = require("./geforceNowGames");

async function main() {
  const steamGamesList = await steamGames();
  //console.log(JSON.stringify(steamGamesList));
  const geforceNowGamesList = await geforceNowGames();
  //console.log(JSON.stringify(geforceNowGamesList));

  const supportedGames = geforceNowGamesList.filter(g1 => g1.appId);
  console.log(supportedGames.map(JSON.stringify).join("\n"));
  console.log("=====================");

  const matchedGames = geforceNowGamesList.filter(
    g1 => g1.appId && steamGamesList.find(g2 => g2.appId == g1.appId)
    );
  // console.log(matchedGames.map(JSON.stringify).join("\n"));
  // console.log("=====================");

  const scoredGames = (
    await Promise.all(matchedGames.map(g => steamScore(g.appId)))
  ).map((score, i) => ({
    ...matchedGames[i],
    review: score.review_score_desc,
    reviews: score.total_reviews,
    positive_avg: Math.round(score.total_positive / score.total_reviews * 100) + '%',
  }));
  console.log('SALES:\n', scoredGames.map(g => JSON.stringify(g, null, 2)).join("\n"));
}

main();
