# Contours.ts
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Extract contours & shapes from an image, for browsers and node.js.

![CI](https://github.com/mubaidr/contours.ts/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/mubaidr/contours.ts/branch/master/graph/badge.svg?token=3SJIBJ1679)](https://codecov.io/gh/mubaidr/contours.ts)
[![codebeat badge](https://codebeat.co/badges/0c5399f3-60d7-466f-b87d-94dcc0b47d9f)](https://codebeat.co/projects/github-com-mubaidr-contours-ts-master)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

[![NPM](https://nodei.co/npm/contours.ts.png?compact=true)](https://nodei.co/npm/contours.ts/)

## Features

### Extract Contours

### Approximate Contours to Shapes

## How to use

### Install

#### using pckage manager:

```bash
npm i contours.ts
```

Or

#### add to your webpage:

```html
<script src="unpkg.com/contours.ts"></script>
```

Or

#### download manually:

[Contours.ts](https://unpkg.com/contours.ts)

### Example

```ts
/*
if `imageData` is like `{
  data: number[] | Uint8ClampedArray // Bit Image Data
  width: number
  height: number
}`
*/

import { ContourFinder } from 'contours.ts'

const contours = new ContourFinder(imageData).extract()

console.log(contours)

/*
- `contours` is an array of contours found in image
- each contour is collection of points.

e.g.
[
  [{x: 0, y: 0}, {x: 1, y: 0}], //contour
  [{x: 0, y: 1}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}] // another contour
]

*/
```

## Contributions

Contirbutions are welcome, code is heavily commented and `tests` are defined using `jest`

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Muhammad Ubaid Raza - [@mubaidr](https://twitter.com/mubaidr) - mubaidr@gmail.com

## Acknowledgements

Thanks to these awesome dev/projects, as this project is heavily inspired by the these projects:

- [benfoxall/contours](https://github.com/benfoxall/contours)
- [dkendal/moore-neighbor_contour_tracer](https://github.com/Dkendal/Moore-Neighbor_Contour_Tracer)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://benjaminbenben.com"><img src="https://avatars3.githubusercontent.com/u/51385?v=4" width="100px;" alt=""/><br /><sub><b>Ben Foxall</b></sub></a><br /><a href="https://github.com/mubaidr/contours.ts/commits?author=benfoxall" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!