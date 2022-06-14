import { Angle } from './Angle'
import type { ZodiacAngle } from './types'

export function toAngle({angle, zodiac}: ZodiacAngle): Angle {
    return angle.plus(new Angle(zodiac * 30))
}

/**
 * Convert an Angle into a ZodiacAngle
 * @param angle angle to convert
 * @returns the given angle represented by an angle within a Zodiac sign.
 */
export function zodiacAngle(angle: Angle): ZodiacAngle {
    return {
        zodiac: ~~((angle.deg % 360) / 30),
        angle: new Angle(angle.deg % 30, angle.min, angle.sec)
    }    
}
