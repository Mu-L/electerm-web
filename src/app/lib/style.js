/**
 * style compiler
 * collect all stylus files in src/client and merge into one str
 */

import glob from 'glob'
import stylus from 'stylus'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import {
  packInfo,
  isDev,
  cwd
} from '../common/runtime-constants.js'

const { version } = packInfo

function findFiles (pattern) {
  return glob.sync(pattern)
}

export function loadDevStylus () {
  const dir = resolve(cwd, 'src')
  const pat = dir + '/**/*.styl'
  const arr = findFiles(pat)
  const key = 'theme-default.styl'
  arr.sort((a, b) => {
    const ai = a.includes(key) ? 1 : 0
    const bi = b.includes(key) ? 1 : 0
    return bi - ai
  })
  let all = ''
  for (const p of arr) {
    const text = readFileSync(p).toString()
    if (text.includes('@require') || text.includes(' = ')) {
      all = all + text
    }
  }
  all = all.replace(/@require[^\n]+\n/g, '\n')
  return all
}

function stylus2Css (str) {
  return new Promise((resolve, reject) => {
    stylus.render(str, (err, css) => {
      if (err) {
        reject(err)
      } else {
        resolve(css)
      }
    })
  })
}

export async function toCss (stylus) {
  const stylusCss = await stylus2Css(stylus)
  return {
    stylusCss,
    version,
    isDev
  }
}
