# Contours.ts

Extract shapes & contours in an image, for browsers and node.js.

![CI](https://github.com/mubaidr/contours.ts/workflows/CI/badge.svg)
[![codebeat badge](https://codebeat.co/badges/0c5399f3-60d7-466f-b87d-94dcc0b47d9f)](https://codebeat.co/projects/github-com-mubaidr-contours-ts-master)
[![codecov](https://codecov.io/gh/mubaidr/contours.ts/branch/master/graph/badge.svg?token=3SJIBJ1679)](https://codecov.io/gh/mubaidr/contours.ts)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

[![NPM](https://nodei.co/npm/contours.ts.png)](https://nodei.co/npm/contours.ts/)

<a href="https://patreon.com/mubaidr">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" height="45">
</a>

## Features

## How to use

### Use

```ts
import { ContourFinder } from 'contours.ts'

/*
if `imageData` is like `{
  data: number[] | Uint8ClampedArray // Bit Image Data
  width: number
  height: number
}`
*/

const contours = new ContourFinder(imageData).extract()

console.log(contours)

/*
- `contours` is collection of contours found in image
- each contour is collection of points.

e.g.
[
  [{x: 0, y: 0}, {x: 1, y: 0}], //contour
  [{x: 0, y: 1}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}] // another contour
]

*/
```

### Install

Recommended way to install is by using package manager (npm, yarn etc):

```bash
npm i contours.ts
```

or use cdn:

```html
<script src="//unpkg.com/contours.ts"></script>
```

or download manually:

[contours.ts](https://unpkg.com/contours.ts)

## Contributions

Contirbutions are welcome, entire code base is filled with comments and `tests` are defined using `jest`
