// https://rosettacode.org/wiki/Ramer-Douglas-Peucker_line_simplification#JavaScript

import { Point } from './types/Point'

export function RDP(contour: Point[], eps: number): Point[] {
  const lastIndex = contour.length - 1
  const firstPoint = contour[0]
  const lastPoint = contour[lastIndex]
  const x21 = lastPoint.x - firstPoint.x
  const y21 = lastPoint.y - firstPoint.y

  const [dMax, x] = contour
    .slice(1, lastIndex)
    .map((p: { x: number; y: number }) =>
      Math.abs(
        y21 * p.x -
          x21 * p.y +
          lastPoint.x * firstPoint.y -
          lastPoint.y * firstPoint.x
      )
    )
    .reduce(
      (p: number[], c: number, i: number) => {
        const v = Math.max(p[0], c)
        return [v, v === p[0] ? p[1] : i + 1]
      },
      [-1, 0]
    )

  if (dMax > eps) {
    return [
      ...RDP(contour.slice(0, x + 1), eps),
      ...RDP(contour.slice(x), eps).slice(1),
    ]
  }

  return [contour[0], contour[lastIndex]]
}
