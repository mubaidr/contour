import { ImageDataLike } from './types/ImageDataLike'
import { Point } from './types/Point'

/**
 * Moore neighborhood
 */
// prettier-ignore
const clockwiseOffset: {
  [key: string]: Array<number>
} = {
  '1,0': [1, 1], // right --> right-down
  '1,1': [0, 1], // right-down --> down
  '0,1': [-1, 1], // down --> down-left
  '-1,1': [-1, 0], // down-left --> left
  '-1,0': [-1, -1], // left --> left-top
  '-1,-1': [0, -1], // left-top --> top
  '0,-1': [1, -1], // top --> top-right
  '1,-1': [1, 0], // top-right --> right
}

/**
 * Contour tracing on a black and white image
 */
export class ContourFinder {
  private data: Uint8ClampedArray | Array<number>
  private width: number
  private height: number

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
   * Converts index to x,y postion of pixel
   * @param index
   */
  indexToPoint(index: number): Point {
    const x = index % this.width
    const y = (index - x) / this.width
    return { x, y }
  }

  /**
   * Converts x,y to index postion of pixel
   * @param point
   */
  pointToIndex(point: Point): number {
    return point.y * this.width + point.x
  }

  /**
   * Get previous index for given index
   * @param index
   */
  getFirstPrevious(index: number): number {
    const point = this.indexToPoint(index)

    if (point.x === 0) {
      if (point.y === 0) {
        return index
      }

      point.y -= 1
    } else {
      point.x -= 1
    }

    return this.pointToIndex(point)
  }

  /**
   * Returns next clockwise index based on current position and direction
   * @param previous previous index
   * @param boundary current boundary index
   */
  nextClockwise(previous: Point, boundary: Point, start = previous): Point {
    const [xOffset, yOffset] = clockwiseOffset[
      `${previous.x - boundary.x},${previous.y - boundary.y}`
    ]
    const nextPoint = {
      x: previous.x + xOffset,
      y: previous.y + yOffset,
    }

    if (
      nextPoint.x < 0 ||
      nextPoint.y < 0 ||
      nextPoint.x >= this.width ||
      nextPoint.y >= this.height
    ) {
      return this.nextClockwise(nextPoint, boundary, start)
    }

    if (nextPoint.x === start.x && nextPoint.y === start.y) {
      return start
    }

    if (this.data[this.pointToIndex(nextPoint)] !== 0) {
      return this.nextClockwise(nextPoint, boundary, start)
    }

    return nextPoint
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
  private traceContour(first: number): Array<Point> {
    const contour: Array<Point> = [this.indexToPoint(first)]
    /**
     * the point we entered first from
     */
    let firstPrevious = this.getFirstPrevious(first)
    /**
     * The point we entered current from
     */
    let previous = firstPrevious
    /**
     * current known black pixel we're finding neighbours of
     */
    let boundary = first
    /**
     * The point currently being inspected
     */
    let current = -1

    // Jacob's stopping criterion: current pixel is revisited from same direction
    while (current !== first || previous !== firstPrevious) {
      // next clockwise index
      current = this.pointToIndex(
        this.nextClockwise(
          this.indexToPoint(previous),
          this.indexToPoint(boundary)
        )
      )

      // black pixel
      if (this.data[current] === 0) {
        previous = boundary
        boundary = current
        this.visited[current] = true
        contour.push(this.indexToPoint(current))
      } else {
        previous = current
      }
    }

    // keep track of visited contour pixels
    this.visited[first] = true

    return contour
  }

  /**
   * Returns contour collection
   * @param imageData
   */
  public extract(): Array<Array<Point>> {
    const contours: Array<Array<Point>> = []
    let skipping = false

    // find first black pixel
    for (let i = 0; i < this.data.length; i += 1) {
      // white pixel
      if (this.data[i] !== 0) {
        skipping = false
        continue
      }

      // we have already visited this pixel or we have traced this contour
      if (this.visited[i] || skipping) {
        skipping = true
        continue
      }

      // we will trace contour starting from this pixel
      contours.push(this.traceContour(i))
    }

    return contours
  }
}
