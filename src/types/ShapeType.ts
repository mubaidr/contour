export interface Point {
  x: number
  y: number
}

export interface Line {
  P1: Point
  P2: Point
}

export interface Triangle {
  P1: Point
  P2: Point
  P3: Point
}

export interface Rectangle {
  x: number
  y: number
  width: number
  height: number
}

export interface Circle {
  x: number
  y: number
  radius: number
}

export interface Polygon extends Array<Point> {}

export interface ShapeCollection {
  points: Point[]
  lines: Line[]
  triangles: Triangle[]
  recangles: Rectangle[]
  circles: Circle[]
  polygons: Polygon[]
}
