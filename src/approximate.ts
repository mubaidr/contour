import { RDP } from './rdp'
import { Point } from './types/Point'

export function approximate(contour: Point[], epsilon = 1): Point[] {
  // make a closed loop for contour
  contour.push({ ...contour[0] })

  // reduce contours using RDP
  // map contours to shape

  return RDP(contour, epsilon)
}
