import type { Angle as ApiAngle } from '../../astro'
import { angleModulus, intDiv, minuteModulus } from './arithmetic'
import type { Angle, Zodiac } from './types'
import { zodiacNames } from './types'

const radiansPerDegree = Math.PI / 180

export const angle = (deg = 0, min = 0, sec = 0): Angle => ({ deg, min, sec })

export const toFloat = (angle: Angle): number => angle.deg + (angle.min + angle.sec / 60) / 60
export const radians = (angle: Angle): number => toFloat(angle) * radiansPerDegree

export const zodiac = (angle: Angle): Zodiac => zodiacNames[~~((angle.deg % 360) / 30)]

export const zodiacAngle = (a: Angle): Angle => angle(a.deg % 30, a.min, a.sec)

export const opposite = (a: Angle): Angle => reduceAngle(a.deg + 180, a.min, a.sec)

export const sin = (angle: Angle) => Math.sin(radians(angle))
export const cos = (angle: Angle) => Math.cos(radians(angle))

export const OPPOSITE: Angle = angle(180)

export const div = (dividend: Angle, divisor: Angle): number => toFloat(dividend) / toFloat(divisor)

/**
 * Get an Angle object from the Angle interface provided by the API client.
 * @internal
 * @param apiAngle -
 * @returns
 */
export const fromApi = (apiAngle: ApiAngle): Angle => {
    return apiAngle
}

function normalizeAngle(deg: number): number {
    return deg < 0 ? deg + 360 : deg
}

const divMinutes = (x: number) => intDiv(x, 60)

function reduceAngle(deg: number, min: number, sec: number): Angle {
    if (sec >= 60) {
        return reduceAngle(deg, min + divMinutes(sec), minuteModulus(sec))
    } else if (sec < 0) {
        const carryOverMin = 1 + divMinutes(sec)
        return reduceAngle(deg, min - carryOverMin, sec + 60 * carryOverMin)
    } else if (min < 0) {
        const carryOverDeg = 1 + divMinutes(min)
        return reduceAngle(deg - carryOverDeg, min + 60 * carryOverDeg, sec)
    } else {
        return angle(normalizeAngle(angleModulus(deg + divMinutes(min))), minuteModulus(min), sec)
    }
}

export function add(one: Angle, other: Angle): Angle {
    return reduceAngle(one.deg + other.deg, one.min + other.min, one.sec + other.sec)
}

export function multiply(angle: Angle, scalar: number): Angle {
    return reduceAngle(angle.deg * scalar, angle.min * scalar, angle.sec * scalar)
}
export function negate(angle: Angle): Angle {
    return reduceAngle(-angle.deg, -angle.min, -angle.sec)
}
export function subtract(one: Angle, other: Angle): Angle {
    return reduceAngle(one.deg - other.deg, one.min - other.min, one.sec - other.sec)
}

/**
 * An angle of zero degrees
 * @public
 */
export const ZERO_DEGREES = angle(0)
