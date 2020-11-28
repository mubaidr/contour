import { ImageDataLike } from './types/ImageDataLike'
import { Point } from './types/Point'

/**
 * Moore neighborhood
 */
const clockwiseOffset: {
  [key: string]: {
    x: number
    y: number
  }
} = {
  '1,0': { x: 1, y: 1 }, // right --> right-down
  '1,1': { x: 0, y: 1 }, // right-down --> down
  '0,1': { x: -1, y: 1 }, // down --> down-left
  '-1,1': { x: -1, y: 0 }, // down-left --> left
  '-1,0': { x: -1, y: -1 }, // left --> left-top
  '-1,-1': { x: 0, y: -1 }, // left-top --> top
  '0,-1': { x: 1, y: -1 }, // top --> top-right
  '1,-1': { x: 1, y: 0 }, // top-right --> right
}

/**
 * Contour tracing on a black and white image
 */
export class ContourFinder {
  private readonly data: Uint8ClampedArray | number[]
  private readonly width: number
  private readonly height: number

  /**
   * Caches information about visited points
   */
  private visited: { [key: number]: boolean } = {}

  constructor(imageData: ImageDataLike) {
    this.data = imageData.data
    this.width = imageData.width
    this.height = imageData.height
  }

  /**
   * Converts x,y to index postion of pixel
   * @param point
   */
  pointToIndex(point: Point): number {
    return point.y * this.width + point.x
  }

  /**
   * Returns next clockwise pixel based on current position and direction
   * @param previous previous point
   * @param boundary current boundary point
   */
  nextClockwise({
    previous,
    boundary,
    start = previous,
  }: {
    previous: Point
    boundary: Point
    start?: Point
  }): {
    previous: Point
    boundary: Point
  } {
    const offset =
      clockwiseOffset[`${previous.x - boundary.x},${previous.y - boundary.y}`]

    // next point in moore's neighberhood
    const nextPoint = {
      x: boundary.x + offset.x,
      y: boundary.y + offset.y,
    }

    // handle invalid points for edge pixels
    if (
      nextPoint.x < 0 ||
      nextPoint.y < 0 ||
      nextPoint.x >= this.width ||
      nextPoint.y >= this.height
    ) {
      return this.nextClockwise({ previous: nextPoint, boundary, start })
    }

    // return if we have reached the start point of moore's neighberhood
    if (nextPoint.x === start.x && nextPoint.y === start.y) {
      return {
        previous: nextPoint,
        boundary,
      }
    }

    // if found boundary pixel
    if (this.data[this.pointToIndex(nextPoint)] === 0) {
      return {
        previous,
        boundary: nextPoint,
      }
    } else {
      return this.nextClockwise({ previous: nextPoint, boundary, start })
    }
  }

  /**
   *
   *  Moore-Neighbor tracing algorithm:
   *
   *  Input: A square tessellation, T, containing a connected component P of black cells.
   *
   *  Output: A sequence B (b1, b2 ,..., bk) of boundary pixels i.e. the contour.
   *
   *  Define M(a) to be the Moore neighborhood of pixel a.
   *  Let p denote the current boundary pixel.
   *  Let c denote the current pixel under consideration i.e. c is in M(p).
   *
   *    Begin
   *
   *      Set B to be empty.
   *      From bottom to top and left to right scan the cells of T until a black pixel, s, of P is found.
   *      Insert s in B.
   *      Set the current boundary point p to s i.e. p=s
   *      Backtrack i.e. move to the pixel from which s was entered.
   *      Set c to be the next clockwise pixel in M(p).
   *
   *      While c not equal to s do
   *
   *        If c is black
   *          insert c in B
   *          set p=c
   *          backtrack (move the current pixel c to the pixel from which p was entered)
   *        else
   *          advance the current pixel c to the next clockwise pixel in M(p)
   *
   *      end While
   *
   *    End
   *
   * @param first first black pixel found
   * @param firstPrevious Previous pixel for first
   */
  private traceContour(first: Point): Point[] {
    const contour: Point[] = [{ ...first }]
    // the point we entered first from
    const firstPrevious = {
      x: first.x,
      y: first.y + 1,
    }
    // current known black pixel we're finding neighbours of
    let boundary = { ...first }
    // The point we entered current from
    let previous = {
      ...firstPrevious,
    }

    do {
      // find next boundary pixel in moore's neighberhood and previous pixel
      ;({ previous, boundary } = this.nextClockwise({
        previous,
        boundary,
      }))

      const index = this.pointToIndex(boundary)

      if (!this.visited[index]) {
        // add to list
        contour.push(boundary)
        // keep track of visited contour pixels
        this.visited[index] = true
      }
    } while (
      // Jacob's stopping criterion: current pixel is revisited from same direction
      previous.x !== firstPrevious.x ||
      previous.y !== firstPrevious.y ||
      boundary.x !== first.x ||
      boundary.y !== first.y
    )

    return contour
  }

  /**
   * Returns contour collection
   * @param imageData
   */
  public extract(): Point[][] {
    const contours: Point[][] = []
    let skipping = false

    // find first black pixel from top-left to bottom-right
    for (let x = 0; x < this.width; x += 1) {
      for (let y = this.height - 1; y >= 0; y -= 1) {
        const index = this.pointToIndex({ x, y })

        // white pixel
        if (this.data[index] !== 0) {
          skipping = false
          continue
        }

        // we have already visited this pixel or we have traced this contour
        if (this.visited[index] || skipping) {
          skipping = true
          continue
        }

        // keep track of visited contour pixel
        this.visited[index] = true

        // we will trace contour starting from this black pixel
        contours.push(
          this.traceContour({
            x,
            y,
          })
        )
      }
    }

    return contours
  }

  /**
   * Applies threshold to image data
   */

  public threshold(): ContourFinder {
    return this
  }
}
