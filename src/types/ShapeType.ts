export enum ShapeTypes {
  Rectangle,
  Circle,
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
