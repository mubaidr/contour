import { ImageDataLike } from '../src/types/ImageDataLike'

// ImageData-like object, single channel data
function format(input: string[]): ImageDataLike {
  const width = input[0].length
  const height = input.length
  const data = new Uint8ClampedArray(width * height)

  input
    .join('')
    .split('')
    .map((v: string) => (v === '-' ? 255 : 0))
    .forEach((v: number, i: number) => {
      data[i] = v
    })

  return { data, width, height }
}

// prettier-ignore
export const onlySquare = format([
  'AA',
  'AA'
])

// prettier-ignore
export const dot = format([
  '---',
  '-A-',
  '---'
])

// prettier-ignore
export const square = format([
  '----',
  '-AA-',
  '-AA-',
  '----'
])

// prettier-ignore
export const squaresEdge = format([
  'AA---',
  'AA-BB',
  '---BB'
])

export const connected = format([
  '---AA----',
  '---AA----',
  '-AA--AA--',
  '-AA--AA--',
])

export const squares = format([
  '--------',
  '-AA-----',
  '-AA--BB-',
  '-----BB-',
  '--------',
])

export const largeSquare = format([
  '----------',
  '--AAAAAA--',
  '--AAAAAA--',
  '--AAAAAA--',
  '--AAAAAA--',
  '----------',
])

export const tri = format([
  '--------------',
  '--A-----------',
  '--AA----------',
  '--AAA---------',
  '--AAAA--------',
  '--AAAAA-------',
  '--AAAAAA------',
  '--AAAAAAA-----',
  '--AAAAAAAA----',
  '--------------',
])

export const stuff = format([
  '------------------------------',
  '-AA---------------------------',
  '-AA-----BBBB------------------',
  '--------BBBB------------------',
  '------------------------------',
  '---C--------------------------',
  '--CC----------------DD--------',
  '--CC----------------DD--------',
  '---CCCCC------------DD--------',
  '--------------------DD--------',
  '-------EE-----------DD--------',
  '-------EE---------DDDDD-------',
  '-------EE---------------------',
  '------------------------------',
])
