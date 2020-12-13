export interface Point {
  x: number
  y: number
}

export interface Circle {
  x: number
  y: number
  radius: number
}

export interface Polygon extends Array<Point> {}

export interface ShapeCollection {
  points: Point[]
  lines: Polygon[]
  triangles: Polygon[]
  squares: Polygon[]
  recangles: Polygon[]
  circles: Circle[]
  polygons: Polygon[]
}
