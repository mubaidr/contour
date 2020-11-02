import { getContours, ImageLike } from './contours'

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

function getBoundingRectangle(contour: number[]): Rectangle {
  console.log(contour)

  return {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }
}

function getBoundingCircle(contour: number[]): Circle {
  console.log(contour)

  return {
    x: 0,
    y: 0,
    radius: 0,
  }
}

export function getShapes<T extends ShapeTypes>(
  image: ImageLike,
  shapeType: ShapeTypes
): T[] {
  const shapes: T[] = []

  getContours(image).forEach(contour => {
    let shape: T

    if (shapeType === ShapeTypes.Rectangle) {
      shape = (getBoundingRectangle(contour) as unknown) as T
    } else {
      shape = (getBoundingCircle(contour) as unknown) as T
    }

    shapes.push(shape)
  })

  return shapes
}
