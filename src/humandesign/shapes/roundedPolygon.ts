import { Angle, ZERO_DEGREES } from '../models/Angle'
import type { Offset, Size } from './types'
import { add, sin, cos, transform } from './arithmetic'
import type { Transformer } from './arithmetic'
import { maxBy, tail, reduce, minBy, min, max } from 'ramda'
import { path, type Path } from 'd3-path'

enum OffsetFrom {
    Center,
    TopLeft,
}

export const roundedSquare = (
    size: Size,
    offsetCenter: Offset = ORIGIN_POINT,
    rotate: Angle = ZERO_DEGREES,
    offsetFrom: OffsetFrom = OffsetFrom.Center,
    radiusRatio: number = DEFAULT_RADIUS_RATIO
) => roundedPolygon(size, offsetCenter, offsetFrom, rotateAngles(PolygonAngles.square, rotate), radiusRatio)

export const roundedTriangle = (
    size: Size,
    offsetCenter: Offset = ORIGIN_POINT,
    rotate: Angle = ZERO_DEGREES,
    offsetFrom: OffsetFrom = OffsetFrom.Center,
    radiusRatio: number = DEFAULT_RADIUS_RATIO
) => roundedPolygon(size, offsetCenter, offsetFrom, rotateAngles(PolygonAngles.triangle, rotate), radiusRatio)

const rotateAngles = (angles: Angle[], by: Angle) => angles.map(it => it.plus(by))

interface Bounding {
    readonly minX: Angle
    readonly maxX: Angle
    readonly minY: Angle
    readonly maxY: Angle
}

interface Polar2D {
    Θ: Angle
    r: number
}

const DEFAULT_RADIUS_RATIO = 0.6
const RADIUS_RATIO2_T2 = DEFAULT_RADIUS_RATIO * 2

const polarToOffset = ({ Θ, r }: Polar2D): Offset => ({ x: r * Θ.cos, y: -r * Θ.sin })

const BoundingAngles: Transformer<Angle[], number, Bounding> = {
    minX: angles => reduce(minBy(cos), angles[0], tail(angles)).cos,
    maxX: angles => reduce(maxBy(cos), angles[0], tail(angles)).cos,
    minY: angles => reduce(minBy(sin), angles[0], tail(angles)).sin,
    maxY: angles => reduce(maxBy(sin), angles[0], tail(angles)).sin,
}

const boundingAngles = (angles: Angle[]) => transform(angles, BoundingAngles)

const ORIGIN_POINT: Offset = { x: 0, y: 0 }

const PolygonAngles = {
    triangle: [90, 210, 330].map(it => Angle.of(it)),
    square: [0, 1, 2, 3].map(it => Angle.of(it * 90 + 45)),
}

const last = <T>(arr: T[]): T => {
    if (arr.length == 0) {
        throw new Error('array should not be empty.')
    }
    return arr[arr.length - 1]
}

function roundedPolygon(
    size: Size,
    offset: Offset = ORIGIN_POINT,
    offsetFrom: OffsetFrom = OffsetFrom.Center,
    angles: Angle[] = PolygonAngles.triangle,
    radiusRatio: number = DEFAULT_RADIUS_RATIO
): string {
    const width = min(size.height, size.width)
    const { maxX, maxY, minX, minY } = boundingAngles(angles)
    const widthPerRadius = max(maxX - minX, minY - maxY) + RADIUS_RATIO2_T2
    const radius = width / widthPerRadius
    const cornerRadius = radius * radiusRatio
    offset =
        offsetFrom === OffsetFrom.Center
            ? offset
            : add(offset, {
                  x: cornerRadius - radius * minX,
                  y: cornerRadius + radius * minY,
              })

    const halfSweep = Angle.of(180 / angles.length)

    const initialPoint = add(
        offset,
        add(
            polarToOffset({ r: radius, Θ: last(angles) }),
            polarToOffset({ r: cornerRadius, Θ: last(angles).plus(halfSweep) })
        )
    )

    const p: Path = path()
    const arcTo = (Θ: Angle) => {
        const arc = (p: Path, point: Offset, radius: number, Θ1: Angle, Θ2: Angle) =>
            p.arc(point.x, point.y, radius, -Θ1.radians, -Θ2.radians, true)

        arc(p, polarToOffset({ r: radius, Θ }), cornerRadius, Θ.minus(halfSweep), Θ.plus(halfSweep))
    }
    p.moveTo(initialPoint.x, initialPoint.y)
    angles.forEach(arcTo)
    return p.toString()
}
