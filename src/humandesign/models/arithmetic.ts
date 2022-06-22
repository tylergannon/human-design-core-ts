const CIRCLE = 360.0
const MIN_PER_HOUR = 60

/**
 * @internal integer division function.
 * Rounds towards zero.
 * @param dividend
 * @param divisor
 * @returns
 */
export const intDiv = (dividend: number, divisor: number) =>
    ((x: number) => (x < 0 ? x + 1 : x))(Math.floor(dividend / divisor))

/**
 * @internal
 * @param degrees - angle in degrees
 * @returns The angle reduced to 0..360.
 */
export const angleModulus = (degrees: number) => aboveZero(degrees % CIRCLE, CIRCLE)

/**
 * @internal
 * @param minutes
 * @returns
 */
export const minuteModulus = (minutes: number) => aboveZero(minutes % MIN_PER_HOUR, MIN_PER_HOUR)

const aboveZero = (num: number, modulo: number) => (num < 0 ? num + modulo : num)
