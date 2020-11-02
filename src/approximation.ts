/*
*** Ramer Douglas Peucker

The Ramer-Douglasâ€“Peucker algorithm is an algorithm for reducing the number of points in a curve that is approximated by a series of points.
It does so by "thinking" of a line between the first and last point in a set of points that form the curve.
It checks which point in between is farthest away from this line.
If the point (and as follows, all other in-between points) is closer than a given distance 'epsilon', it removes all these in-between points.
If on the other hand this 'outlier point' is farther away from our imaginary line than epsilon, the curve is split in two parts.
The function is recursively called on both resulting curves, and the two reduced forms of the curve are put back together.

1) From the first point up to and including the outlier
2) The outlier and the remaining points.

I hope that by looking at this source code for my Ramer Douglas Peucker implementation you will be able to get a correct reduction of your dataset.

@licence Feel free to use it as you please, a mention of my name is always nice.

Marius Karthaus
http://www.LowVoice.nl

 *
 */

interface Point {
  x: number
  y: number
}

// this is the implementation with shortest Distance (as of 2013-09 suggested by the wikipedia page. Thanks Edward Lee for pointing this out)
export function RDPsd(points: number[], epsilon: number): number[] {
  var firstPoint = points[0]
  var lastPoint = points[points.length - 1]
  var index = -1
  var dist = 0

  if (points.length < 3) {
    return points
  }

  for (var i = 1; i < points.length - 1; i++) {
    var cDist = distanceFromPointToLine(points[i], firstPoint, lastPoint)

    if (cDist > dist) {
      dist = cDist
      index = i
    }
  }

  if (dist > epsilon) {
    // iterate
    var l1 = points.slice(0, index + 1)
    var l2 = points.slice(index)
    var r1 = RDPsd(l1, epsilon)
    var r2 = RDPsd(l2, epsilon)

    // concat r2 to r1 minus the end/startpoint that will be the same
    var rs = r1.slice(0, r1.length - 1).concat(r2)

    return rs
  } else {
    return [firstPoint, lastPoint]
  }
}

// this is the implementation with perpendicular Distance
export function RDPppd(points: number[], epsilon: number): number[] {
  var firstPoint = points[0]
  var lastPoint = points[points.length - 1]

  var index = -1
  var dist = 0

  if (points.length < 3) {
    return points
  }

  for (var i = 1; i < points.length - 1; i++) {
    var cDist = findPerpendicularDistance(points[i], firstPoint, lastPoint)
    if (cDist > dist) {
      dist = cDist
      index = i
    }
  }

  if (dist > epsilon) {
    // iterate
    var l1 = points.slice(0, index + 1)
    var l2 = points.slice(index)
    var r1 = RDPppd(l1, epsilon)
    var r2 = RDPppd(l2, epsilon)

    // concat r2 to r1 minus the end/startpoint that will be the same
    var rs = r1.slice(0, r1.length - 1).concat(r2)

    return rs
  } else {
    return [firstPoint, lastPoint]
  }
}

function findPerpendicularDistance(p: number[], p1: number[], p2: number[]) {
  // if start and end point are on the same x the distance is the difference in X.
  var result
  var slope
  var intercept

  if (p1[0] == p2[0]) {
    result = Math.abs(p[0] - p1[0])
  } else {
    slope = (p2[1] - p1[1]) / (p2[0] - p1[0])
    intercept = p1[1] - slope * p1[0]
    result =
      Math.abs(slope * p[0] - p[1] + intercept) /
      Math.sqrt(Math.pow(slope, 2) + 1)
  }

  return result
}

// code as suggested by Edward Lee

function distanceFromPointToLine(
  point: number[],
  firstPoint: number[],
  lastPoint: number[]
) {
  // convert array to object to please Edwards code;
  const p: Point = { x: point[0], y: point[1] }
  const a: Point = { x: firstPoint[0], y: firstPoint[1] }
  const b: Point = { x: lastPoint[0], y: lastPoint[1] }

  return Math.sqrt(distanceFromPointToLineSquared(p, a, b))
}

//This is the difficult part. Commenting as we go.
function distanceFromPointToLineSquared(p: Point, i: Point, j: Point) {
  var lineLength = pointDistance(i, j) //First, we need the length of the line segment.

  if (lineLength == 0) {
    //if it's 0, the line is actually just a point.
    return pointDistance(p, a)
  }

  var t = ((p.x - i.x) * (j.x - i.x) + (p.y - i.y) * (j.y - i.y)) / lineLength

  //t is very important. t is a number that essentially compares the individual coordinates
  //distances between the point and each point on the line.

  if (t < 0) {
    //if t is less than 0, the point is behind i, and closest to i.
    return pointDistance(p, i)
  } //if greater than 1, it's closest to j.
  else if (t > 1) {
    return pointDistance(p, j)
  }

  return pointDistance(p, {
    x: i.x + t * (j.x - i.x),
    y: i.y + t * (j.y - i.y),
  })
  //this figure represents the point on the line that p is closest to.
}

//returns distance between two points. Easy geometry.
function pointDistance(i: Point, j: Point) {
  return square(i.x - j.x) + square(i.y - j.y)
}

//just to make the code a bit cleaner.
function square(x: number) {
  return x * x
}
