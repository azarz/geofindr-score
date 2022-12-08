/**
* Computes the score for a given distance
* @param {number} dist distance in meters
* @returns {int} score associated with the distance
*/
function distanceToScore(dist) {
  return Math.round(Math.min(5000, Math.max(0, 5000 - Math.log10(dist) * 2500/3)))
}

export { distanceToScore }
