import { Polygon } from './types/ShapeType'
import { perpendicularDistance } from './utilities'

/*

function DouglasPeucker(PointList[], epsilon)
    // Find the point with the maximum distance
    dmax = 0
    index = 0
    end = length(PointList)
    for i = 2 to (end - 1) {
        d = perpendicularDistance(PointList[i], Line(PointList[1], PointList[end]))
        if (d > dmax) {
            index = i
            dmax = d
        }
    }

    ResultList[] = empty;

    // If max distance is greater than epsilon, recursively simplify
    if (dmax > epsilon) {
        // Recursive call
        recResults1[] = DouglasPeucker(PointList[1...index], epsilon)
        recResults2[] = DouglasPeucker(PointList[index...end], epsilon)

        // Build the result list
        ResultList[] = {recResults1[1...length(recResults1) - 1], recResults2[1...length(recResults2)]}
    } else {
        ResultList[] = {PointList[1], PointList[end]}
    }
    // Return the result
    return ResultList[]
end

*/

/**
 *
 * Ramer–Douglas–Peucker algorithm: https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm
 *
 * @param contour array of polygon/contour points
 * @param epsilon
 */
export function RDP(contour: Polygon, epsilon = 1): Polygon {
  const endIndex = contour.length - 1
  let collection: Polygon = []
  let maxDistance = 0
  let index = 0

  // no need to simplify 2 points... duh!
  if (contour.length <= 2) return contour

  for (let i = 1; i < endIndex; i += 1) {
    const distance = perpendicularDistance(
      contour[i],
      contour[0],
      contour[endIndex]
    )

    if (distance > maxDistance) {
      index = i
      maxDistance = distance
    }
  }

  if (maxDistance > epsilon) {
    collection = [
      ...RDP(contour.slice(0, index), epsilon),
      ...RDP(contour.slice(index, endIndex), epsilon),
    ]
  } else {
    collection = [contour[0], contour[endIndex]]
  }

  return collection
}
