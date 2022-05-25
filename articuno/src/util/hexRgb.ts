import mathClamp from './mathClamp'

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

/**
 * Convert a hex color value to rgb key value pairs
 * @param hex {string} '#316498'
 * @returns {Object} { r: 0-255, g: 0-255, b: 0-255, a: 0-1 }
 * @example
 *  const rgba = hexToRgba('#316498')
 *  rgba === `rgba(49, 100, 152, 1)`
 *
 *  const rgba = hexToRgba('#31649Q')
 *  rgba === null
 */
const hexToRgba = (hex: string, addAlpha = 1): string | null => {
  const validHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (validHex) {
    /* eslint-disable indent */
    const withHash = hex.startsWith('#') ? 1 : 0,
                 r = parseInt(validHex[withHash], 16),
                 g = parseInt(validHex[withHash + 1], 16),
                 b = parseInt(validHex[withHash + 2], 16),
                 a = mathClamp(addAlpha, 0, 1)
    /* eslint-enable */
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }
  return null
}

const componentToHex = (c: number): string => c.toString(16).padStart(2, '0')

/**
 * Convert a rgb color values to hex string
 * @param {number} r 0-255
 * @param {number} g 0-255
 * @param {number} b 0-255
 * @returns {string} '#316498'
 * @example
 *  const hex = rgbToHex(49, 100, 152)
 *  hex === '#316498'
 */
const rgbToHex = (r: number, g: number, b: number): string => {
  /* eslint-disable indent */
  const _r = mathClamp(r, 0, 255),
        _g = mathClamp(g, 0, 255),
        _b = mathClamp(b, 0, 255)
  /* eslint-enable */
  return `#${componentToHex(_r)}${componentToHex(_g)}${componentToHex(_b)}`
}

const parseRGBFromString = (rgba: string): string | null => {
  const rgbaMatch = rgba.match(/\d+/g)
  if (rgbaMatch) {
    const [r, g, b] = rgbaMatch.map((v) => parseInt(v, 10))
    return rgbToHex(r, g, b)
  }
  return null
}

export {
  hexToRgba,
  rgbToHex,
  parseRGBFromString,
}
