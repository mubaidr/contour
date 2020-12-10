import { ImageDataLike } from '../src/types/ImageDataLike'

/**
 * ImageData-like object, single channel data
 */
function format(input: string[]): ImageDataLike {
  const width = input[0].length
  const height = input.length
  const data = input
    .join('')
    .split('')
    .map((v: string) => (v === '-' ? 255 : 0))

  return { data, width, height }
}

/**
 * ImageData-like object, multi channel channel data
 */
function toMultiChannel(image: ImageDataLike, channels = 3): ImageDataLike {
  const data: number[] = []

  image.data.forEach((d: number) => {
    for (let i = 0; i < channels; i += 1) {
      data.push(d)
    }
  })

  image.data = data

  return image
}

// prettier-ignore
export const line =format([
  'A--',
  '-A-',
  '--A'
])

// prettier-ignore
export const dot3Channel = toMultiChannel(format([
  '---',
  '-A-',
  '---'
]))

// prettier-ignore
export const dot4Channel = toMultiChannel(format([
  '---',
  '-A-',
  '---'
]), 4)

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
export const trapezoid = format([
  '------',
  '--AA--',
  '-AAAA-',
  '------'
])

// prettier-ignore
export const reversedTrapezoid = format([
  '------',
  '-AAAA-',
  '--AA--',
  '------',
])

// prettier-ignore
export const onlySquare = format([
  'AA',
  'AA'
])

export const multipleSquares = format([
  '--------',
  '-AA-----',
  '-AA--BB-',
  '-----BB-',
  '--------',
])

// prettier-ignore
export const edgeSquares = format([
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
