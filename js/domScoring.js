import { distanceToScore } from "./scoring.js";
import { distance } from "./gis.js";

function ditanceBetweenCells(playerCell, answerCell) {
  const playerLat = playerCell.querySelector(".latitude").value;
  const playerLng = playerCell.querySelector(".longitude").value;

  if (!playerLat || !playerLng) {
    return 1e7
  }

  const answerLat = answerCell.querySelector(".latitude").value;
  const answerLng = answerCell.querySelector(".longitude").value;
  return distance(playerLat, playerLng, answerLat, answerLng)
}

function distanceOfCell(playerCell) {
  const round = playerCell.dataset.round;
  const answerCell = document.getElementById("last-row").querySelector(`[data-round="${round}"]`);
  return ditanceBetweenCells(playerCell, answerCell)
}

function scoreOfCell(playerCell) {
  return distanceToScore(distanceOfCell(playerCell))
}

function displayScore(playerCell) {
  const score = scoreOfCell(playerCell);
  let distance = distanceOfCell(playerCell);
  if (distance == 1e7) {
    distance = "n/a";
  } else {
    distance = distance.toFixed(1);
  }
  playerCell.querySelector(".score").innerHTML = score;
  playerCell.querySelector(".distance").innerHTML = distance;
}

function computePlayerScores(playerRow) {
  let totalScore = 0;
  playerRow.querySelectorAll("td").forEach(playerCell => {
    if (playerCell.classList.contains("totalScore")) {
      playerCell.innerHTML = `${totalScore}`;
    } else {
      totalScore += scoreOfCell(playerCell);
      displayScore(playerCell);
    }
  });
}

function computeAllPlayerScores(table) {
  table.querySelectorAll("tr").forEach(playerRow => {
    if ( !(playerRow.id == "first-row" || playerRow.id == "last-row") ) {
      computePlayerScores(playerRow);
    }
  });
}

export { computeAllPlayerScores };
