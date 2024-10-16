/**
* Computes the score for a given distance
* @param {number} dist distance in meters
* @returns {int} score associated with the distance
*/
function distanceToScore(dist) {
  return Math.round(Math.min(1000, Math.max(0, 1000 - Math.log10(max(1, dist - 9)) * 500/3)))
}

export { distanceToScore }
