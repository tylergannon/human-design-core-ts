import { Angle } from './Angle'
import { zodiacNames } from './types'
import type { ZodiacAngle } from './types'

/**
 * @internal
 * @param param0
 * @returns
 */
export function toAngle({ angle, zodiac }: ZodiacAngle): Angle {
    return angle.plus(new Angle(zodiacNames.indexOf(zodiac) * 30))
}

/**
 * Convert an Angle into a ZodiacAngle
 * @internal
 * @param angle angle to convert
 * @returns the given angle represented by an angle within a Zodiac sign.
 */
export function zodiacAngle(angle: Angle): ZodiacAngle {
    return {
        zodiac: zodiacNames[~~((angle.deg % 360) / 30)],
        angle: new Angle(angle.deg % 30, angle.min, angle.sec),
    }
}
