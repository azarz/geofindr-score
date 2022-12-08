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

function scoreOfCell(playerCell) {
  const round = playerCell.dataset.round;
  const answerCell = document.getElementById("last-row").querySelector(`[data-round="${round}"]`);
  return distanceToScore(ditanceBetweenCells(playerCell, answerCell))
}

function displayScore(playerCell) {
  const score = scoreOfCell(playerCell);
  playerCell.querySelector(".score").innerHTML = score;
}

function computePlayerScores(playerRow) {
  let total = 0;
  playerRow.querySelectorAll("td").forEach(playerCell => {
    if (playerCell.classList.contains("totalScore")) {
      playerCell.innerHTML = total;
    } else {
      total += scoreOfCell(playerCell);
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
