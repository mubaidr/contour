// https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm

import { Point } from './types/Point'

function distance(p1: Point, p2: Point): number {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}

function pointLineDistance(point: Point, start: Point, end: Point): number {
  if (start.x === end.x && start.y === end.y) {
    return distance(point, start)
  }

  // const n = Math.abs()
}

export function RDP(contour: Point[], eps: number): Point[] {
  return [contour[0]]
}
