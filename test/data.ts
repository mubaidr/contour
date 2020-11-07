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

// prettier-ignore
export const dot = format([
  '___',
  '_A_',
  '___'
])

// prettier-ignore
export const square = format([
  '____',
  '_AA_',
  '_AA_',
  '____'
])

// prettier-ignore
export const squares_edge = format([
  'AA___',
  'AA_BB',
  '___BB'
])

export const connected = format([
  '___AA____',
  '___AA____',
  '_AA__AA__',
  '_AA__AA__',
])

export const squares = format([
  '________',
  '_AA_____',
  '_AA__BB_',
  '_____BB_',
  '________',
])

export const large_square = format([
  '__________',
  '__AAAAAA__',
  '__AAAAAA__',
  '__AAAAAA__',
  '__AAAAAA__',
  '__________',
])

export const tri = format([
  '______________',
  '__A___________',
  '__AA__________',
  '__AAA_________',
  '__AAAA________',
  '__AAAAA_______',
  '__AAAAAA______',
  '__AAAAAAA_____',
  '__AAAAAAAA____',
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
