interface IPoint {
  x: number
  y: number
}

export class Point implements IPoint {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  isEqualTo(point: Point): boolean {
    return this.x === point.x && this.y === point.y
  }

  previous(): Point {
    return new Point(this.x, this.y - 1)
  }

  clockwiseNext(): Point {
    return this
  }
}
