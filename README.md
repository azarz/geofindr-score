# geofindr-score
💯 Score calculator for geofindr games

Calculation of the score of a GeoFindr game, from a list of latitude / longitude coordinates.

The score formula is as it follows:
- 5000 pts for any distance below 1 meter
- 0 pts for any distance above 1000 kilometers
- 5000 - log(distance) * 2500 / 3 in all other cases

This means that to get half the points or more, you need to place your answer 1 km or nearer of the refercence point.
