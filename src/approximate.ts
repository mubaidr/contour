import { RDP } from './rdp'
import { Point } from './types/Point'

export function approximate(contour: Point[], epsilon: number): Point[] {
  // make a closed loop for contour
  contour.push({ ...contour[0] })

  return RDP(contour, epsilon)
}
