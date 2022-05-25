/**
 * @description Keep a number from being lower or higher than desired.
 * @param {number} num - The number to keep between a minimum and maximum value.
 * @param {number} min - The absolute minimum value num should be.
 * @param {number} max - The absolute maximum value num should be.
 */

const mathClamp = (num: number, min = 0, max = 50): number => Math.min(Math.max(num, min), max)

export default mathClamp
