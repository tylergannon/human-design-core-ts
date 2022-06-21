import type { Angle as ApiAngle } from '../../astro'

const radiansPerDegree = Math.PI / 180
/**
 * @public
 */
export class Angle {
    private _radians?: number
    private _cos?: number
    private _sin?: number
    readonly deg: number
    readonly min: number
    readonly sec: number

    public constructor(deg = 0, min = 0, sec = 0) {
        this.deg = deg
        this.min = min
        this.sec = sec
    }

    public get radians(): number {
        this._radians ||= this.toFloat() * radiansPerDegree
        return this._radians
    }

    public get sin(): number {
        this._sin ||= Math.sin(this.radians)
        return this._sin
    }

    public get cos(): number {
        this._cos ||= Math.cos(this.radians)
        return this._cos
    }

    toFloat(): number {
        return this.deg + (this.min + this.sec / 60) / 60
    }

    static of(deg: number, min = 0, sec = 0): Angle {
        return new Angle(deg, min, sec)
    }

    static opposite: Angle = new Angle(180)

    plus(other: Angle): Angle {
        return add(this, other)
    }
    times(scale: number): Angle {
        return multiply(this, scale)
    }
    negative(): Angle {
        return negate(this)
    }
    minus(other: Angle): Angle {
        return subtract(this, other)
    }
    div(other: Angle): number {
        return this.toFloat() / other.toFloat()
    }
}

/**
 * Get an Angle object from the Angle interface provided by the API client.
 * @internal
 * @param apiAngle
 * @returns
 */
export const fromApi = (apiAngle: ApiAngle): Angle => {
    return new Angle(apiAngle.deg, apiAngle.min, apiAngle.sec)
}

function normalizeAngle(deg: number): number {
    return deg < 0 ? deg + 360 : deg
}

function reduceAngle(deg: number, min: number, sec: number): Angle {
    if (sec >= 60) {
        return reduceAngle(deg, min + sec / 60, sec % 60)
    } else if (sec < 0) {
        const carryOverMin = 1 + sec / 60
        return reduceAngle(deg, min - carryOverMin, sec + 60 * carryOverMin)
    } else if (min < 0) {
        const carryOverDeg = 1 - min / 60
        return reduceAngle(deg - carryOverDeg, min + 60 * carryOverDeg, sec)
    } else {
        return new Angle(normalizeAngle((deg + min / 60) % 360), min % 60, sec)
    }
}

function add(one: Angle, other: Angle): Angle {
    return reduceAngle(one.deg + other.deg, one.min + other.min, one.sec + other.sec)
}

function multiply(angle: Angle, scalar: number): Angle {
    return reduceAngle(angle.deg * scalar, angle.min * scalar, angle.sec * scalar)
}
function negate(angle: Angle): Angle {
    return reduceAngle(-angle.deg, -angle.min, -angle.sec)
}
function subtract(one: Angle, other: Angle): Angle {
    return reduceAngle(one.deg - other.deg, one.min - other.min, one.sec - other.sec)
}

/**
 * An angle of zero degrees
 * @public
 */
export const ZERO_DEGREES = Angle.of(0)
