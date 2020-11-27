# contours.ts

Extract shapes & contours in an image, for browsers and node.js.

[![Build Status](https://travis-ci.org/mubaidr/contours.ts.svg?branch=master)](https://travis-ci.org/mubaidr/contours.ts)
[![codebeat badge](https://codebeat.co/badges/8f27170b-909e-489f-ae93-459664c47422)](https://codebeat.co/projects/github-com-mubaidr-contours.ts-master)
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

const contours = new ContourFinder(data).extract()

console.log(contours) // array of points
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
