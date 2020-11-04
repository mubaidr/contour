// ImageData-like object, single channel data
function format(input: string[]) {
  const width = input[0].length
  const height = input.length
  const data = new Uint8ClampedArray(width * height)

  input
    .join('')
    .split('')
    .map((v: string) => (v === '_' ? 255 : 0))
    .forEach((v: number, i: number) => {
      data[i] = v
    })

  return { data, width, height }
}

export const dot = format(['___', '_X_', '___'])

export const square = format(['____', '_XX_', '_XX_', '____'])

export const large_square = format([
  '__________',
  '__XXXXXX__',
  '__XXXXXX__',
  '__XXXXXX__',
  '__XXXXXX__',
  '__________',
])

export const squares = format([
  '________',
  '_AA_____',
  '_AA__BB_',
  '_____BB_',
  '________',
])

export const squares_edge = format(['XX___', 'XX_BB', '___BB'])

export const tri = format([
  '______________',
  '__1___________',
  '__11__________',
  '__111_________',
  '__1111________',
  '__11111_______',
  '__111111______',
  '__1111111_____',
  '__11111111____',
  '______________',
])

export const stuff = format([
  '______________________________',
  '_AA___________________________',
  '_AA_____BBBB__________________',
  '________BBBB__________________',
  '______________________________',
  '___C__________________________',
  '__CC________________DD________',
  '__CC________________DD________',
  '___CCCCC____________DD________',
  '____________________DD________',
  '_______EE___________DD________',
  '_______EE_________DDDDD_______',
  '_______EE_____________________',
  '______________________________',
])

export const connected = format([
  '___AA____',
  '___AA____',
  '_AA__AA__',
  '_AA__AA__',
])
