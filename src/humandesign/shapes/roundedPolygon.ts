import { Angle } from '../models/Angle'
import type { Offset, Size } from './types'
import { add, sin, cos, transform } from './arithmetic'
import type { Transformer } from './arithmetic'
import { maxBy, tail, reduce, minBy, min, max } from 'ramda'
import { path, type Path } from 'd3-path'

export const roundedSquare = (size: Size, offsetCenter?: Offset, offsetTopLeft?: Offset) =>
    roundedPolygon(size, offsetCenter, offsetTopLeft, PolygonAngles.square)

export const roundedTriangle = (size: Size, offsetCenter?: Offset, offsetTopLeft?: Offset) =>
    roundedPolygon(size, offsetCenter, offsetTopLeft, PolygonAngles.triangle)

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

const RADIUS_RATIO = 0.6
const RADIUS_RATIO2_T2 = RADIUS_RATIO * 2

const polarToOffset = ({ Θ, r }: Polar2D): Offset => ({ x: r * Θ.cos, y: r * Θ.sin })

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

/**
 * Wrapper for Path::arcTo, that receives Offset instead of x and y values for each point.
 * @param p Path object
 * @param p1 first offset
 * @param p2 second offset
 * @param r arc radius
 * @returns void
 */
const pathArc = (p: Path, p1: Offset, p2: Offset, r: number) => p.arcTo(p1.x, p1.y, p2.x, p2.y, r)

function roundedPolygon(
    size: Size,
    offsetCenter?: Offset,
    offsetTopLeft?: Offset,
    angles: Angle[] = PolygonAngles.triangle
): string {
    const width = min(size.height, size.width)
    const { maxX, maxY, minX, minY } = boundingAngles(angles)
    const widthPerRadius = max(maxX - minX, minY - maxY) + RADIUS_RATIO2_T2
    const radius = width / widthPerRadius
    const cornerRadius = radius * RADIUS_RATIO
    offsetCenter ||= add(offsetTopLeft ?? ORIGIN_POINT, {
        x: cornerRadius - radius * minX,
        y: cornerRadius + radius * minY,
    })

    const halfSweep = Angle.of(180 / angles.length)

    const initialPoint = add(
        offsetCenter,
        add(
            polarToOffset({ r: radius, Θ: angles[-1] }),
            polarToOffset({ r: cornerRadius, Θ: angles[-1].plus(halfSweep) })
        )
    )

    const p: Path = path()
    const arcTo = (Θ: Angle) =>
        pathArc(
            p,
            add(polarToOffset({ r: radius, Θ }), polarToOffset({ r: cornerRadius, Θ: Θ.minus(halfSweep) })),
            add(polarToOffset({ r: radius, Θ }), polarToOffset({ r: cornerRadius, Θ: Θ.plus(halfSweep) })),
            cornerRadius
        )
    p.moveTo(initialPoint.x, initialPoint.y)
    angles.forEach(arcTo)
    return p.toString()
}
