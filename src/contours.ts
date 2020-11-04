import { ImageDataLike } from './types/ImageDataLike'
import { Point } from './types/Point'

interface PixelCache {
  [key: string]: boolean
}

export class ContourExtractor {
  data: number[] | Uint8ClampedArray = []
  width: number = 0
  height: number = 0
  /**
   * Caches information about visited points
   */
  visited: PixelCache = {}

  constructor() {}

  /**
   * Check if pixel at given point is black
   * @param point
   */
  isBlackPixel(point: Point) {
    return this.data[point.y * this.width + point.x] === 0
  }

  /**
   * Check if given point has been visited already
   * @param point
   */
  checkIfVisited(point: Point): boolean {
    return this.visited[`${point.x},${point.y}`]
  }

  /**
   * Set point to visited already
   * @param point
   */
  setIsVisited(point: Point): void {}

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
   * @param start first black pixel found
   */
  traceContour(start: Point): Point[] {
    const contour: Point[] = [start]
    let prev = start.previous()
    let c = prev.clockwiseNext()
    let p = start

    while (!start.isEqualTo(c)) {
      if (this.isBlackPixel(c)) {
        contour.push(c)
        p = c
        c = prev
      } else {
        c = c.clockwiseNext()
      }
    }

    // TODO: set this.setIsVisited(c) if c isBlackPixel
    // keep track of visited contour pixels
    this.setIsVisited(start)

    return contour
  }

  /**
   * Return contour collection
   * @param imageData
   */
  extract(imageData: ImageDataLike): Point[][] {
    this.data = imageData.data
    this.width = imageData.width
    this.height = imageData.height

    const contours: Point[][] = []
    let skipping = false

    // check if image data contains only one channel
    if (this.data.length !== this.width * this.height) {
      throw 'Image data is malformed or contains multiple channels...'
    }

    // find first black pixel
    for (let x = 1; x < this.width - 1; x += 1) {
      for (let y = 1; y < this.height - 1; y += 1) {
        let point = new Point(x, y)

        // white pixel
        if (!this.isBlackPixel(point)) {
          skipping = false
          continue
        }

        // we have already visited this pixel or we have traced this contour
        if (this.checkIfVisited(point) || skipping) {
          skipping = true
          continue
        }

        // we will trace contour starting from this pixel
        contours.push(this.traceContour(point))
      }
    }

    return contours
  }
}
