import * as angle from './Angle'
import { zodiacNames } from './types'
import type { ZodiacAngle, Angle } from './types'

/**
 * @internal
 * @param zodiacAngle - zodiacAngle to convert to angle
 * @returns the simple angle corresponding to the zodiac + zodiacAngle.
 */
export function toAngle(zodiacAngle: ZodiacAngle): Angle
export function toAngle({ angle: a, zodiac }: ZodiacAngle): Angle {
    return angle.add(a, angle.angle(zodiacNames.indexOf(zodiac) * 30))
}

/**
 * Convert an Angle into a ZodiacAngle
 * @internal
 * @param angle -  angle to convert
 * @returns the given angle represented by an angle within a Zodiac sign.
 */
export function zodiacAngle(a: Angle): ZodiacAngle {
    return {
        zodiac: angle.zodiac(a),
        angle: angle.zodiacAngle(a),
    }
}
