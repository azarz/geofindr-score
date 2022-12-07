/**
 * Creates the HTML code for a table cell (player)
 * the cell elements have 3 classes: the element type, the round number and the player name
 * @param {float} latitude latitude of the cell
 * @param {float} longitude longitude of the cell
 * @param {string} player player name, null if answer
 * @param {int} round round number
 * @returns {string} HTML code of the cell
 */
function tablePlayerCellHtml(latitude, longitude, round, player) {
  let cellHTML = "<td>";
  cellHTML += `<label>lat: <input type="text" class="latitude ${player} ${round}" value="${latitude}"/></label>`;
  cellHTML += `<label>lng: <input type="text" class="longitude ${player} ${round}" value="${longitude}"/></label>`;
  cellHTML += `<p>Score: <span class="score ${player} ${round}"></span></p>`;
  cellHTML += "</td>";
  return cellHTML
}

/**
 * Creates the HTML code for a table cell (answer)
 * the cell elements have 3 classes: the element type, the round number and the player name
 * @param {float} latitude latitude of the cell
 * @param {float} longitude longitude of the cell
 * @param {string} player player name, null if answer
 * @param {int} round round number
 * @returns {string} HTML code of the cell
 */
 function tableAnswerCellHtml(latitude, longitude, round) {
  let cellHTML = "<td>";
  cellHTML += `<label>lat: <input type="text" class="latitude answer ${round}" value="${latitude}" readonly/></label>`;
  cellHTML += `<label>lng: <input type="text" class="longitude answer ${round}" value="${longitude}" readonly/></label>`;
  cellHTML += "</td>";
  return cellHTML
}

/**
 * Creates the HTML code for a row header cell
 * @param {string} player player name
 * @returns {string} HTML code of the row header
 */
function tableRowHeaderCellHtml(player) {
  return `<th scope="row">${player}</th>`
}

/**
 * Creates the HTML code for a column header cell
 * @param {int} round round number
 * @returns {string} HTML code for column header
 */
function tableColHeaderCellHtml(round) {
 return `<th scope="col">${round}</th>`
}

/**
 * Creates the HTML code of the first row the gameboard table
 * @param {Array} rounds Array of round objects, following schema at ../model/gameboard_schema.json
 * @returns {string} HTML code for table header
 */
function tableColHeaderHtml(rounds) {
  let headerHTML = `<tr id="first-row"><td></td>`;
  for (let i = 1; i <= rounds.length; i++) {
    headerHTML += tableColHeaderCellHtml(i);
  }
  headerHTML += `<th scope="col">Total</th></tr>`;
  return headerHTML
}

/**
 * Creates the HTML code for the last row of the gameboard table
 * @param {Array} rounds Array of round objects, following schema at ../model/gameboard_schema.json
 * @returns {string} HTML code for the last row of the gameboard table
 */
function answersRowHtml(rounds) {
  let rowHTML = `<tr id="last-row"><th scope="row">Answer</th><td></td>`;
  let round;
  for (let i = 0; i < rounds.length; i++) {
    round = rounds[i];
    rowHTML += tableAnswerCellHtml(round.answer.latitude, round.answer.longitude, i + 1);
  }
  rowHTML += "</tr>";
  return rowHTML
}

/**
 * Creates the HTML code for a player row
 * @param {Object} player Player object as defined in schema at ../model/gameboard_schema.json
 * @returns {string} HTML code for a player row
 */
function playerRowHtml(player) {
  let rowHTML = `<tr id="last-row"><th scope="row">${player.name}</th><td></td>`;
  let round;
  for (let i = 0; i < player.answers.length; i++) {
    round = player.answers[i];
    if (!round) {
      rowHTML += tablePlayerCellHtml(null, null, i + 1, player);
      continue
    }
    rowHTML += tablePlayerCellHtml(round.latitude, round.longitude, i + 1, player);
  }
  rowHTML += `<td class=totalScore ${player}></td></tr>`;
  return rowHTML
}

/**
 * Creates the HTML code of a table representing the gameboard
 * @param {Object} gameboard Gameboard object as defined in schema at ../model/gameboard_schema.json
 * @returns {string} HTML code of a table representing the gameboard
 */
function gameboardHTML(gameboard) {
  let tableInnerHTML = `<caption>GeoFindr scores</caption>`;
  tableInnerHTML += tableColHeaderHtml(gameboard.rounds);
  for (let player of gameboard.players) {
    tableInnerHTML += playerRowHtml(player);
  }
  tableInnerHTML += answersRowHtml(gameboard.rounds);
  return tableInnerHTML
}

export { gameboardHTML }
