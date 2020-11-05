import { ImageDataLike } from './types/ImageDataLike'
import { Point } from './types/Point'

export class ContourFinder {
  private data: number[] | Uint8ClampedArray
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

  indexToPoint(index: number): Point {
    // const x = index %
    return { x: index, y: index }
  }

  nextClockwise(): number {
    // TODO: create a map to find next pixel: https://github.com/Dkendal/Moore-Neighbor_Contour_Tracer/blob/master/ContourTrace.cs#L36
    return 0
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
  private traceContour(first: number, firstPrevious: number): Point[] {
    const contour: Point[] = [this.indexToPoint(first)]
    let previous = firstPrevious
    let boundary = first
    let current = this.nextClockwise()

    while (current !== first && previous !== firstPrevious) {
      // black pixel
      if (this.data[current] === 0) {
        previous = boundary
        boundary = current
        this.visited[current] = true
        contour.push(this.indexToPoint(current))
      } else {
        previous = current
      }

      current = this.nextClockwise()
    }

    // keep track of visited contour pixels
    this.visited[first] = true

    return contour
  }

  /**
   * Return contour collection
   * @param imageData
   */
  public extract(): Point[][] {
    const contours: Point[][] = []
    let previous = 1
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
      contours.push(this.traceContour(i, previous))

      // store previous entry point
      previous = i
    }

    return contours
  }
}
