import type { Angle } from '../models/types'
import * as angle from '../models/Angle'
import type { Offset, OffsetFrom, Size } from './types'
import { add, transform } from './arithmetic'
import type { Transformer } from './arithmetic'
import { maxBy, tail, reduce, minBy, min, max } from 'ramda'
import { path } from 'd3-path'
import type { Path } from 'd3-path'

/**
 * Creates an SVG path for a square with rounded corners.
 * @public
 * @param size -  Size of object to create.  Should be square.
 * @param offset -  Position in the field, where the object will be rendered.
 * @param rotate -  Angle of rotation.  Angle is counter-clockwise and zero is to the right of the origin.
 * @param offsetFrom -  Anchor for the offset.  "center" means that `offset` provides the coordinates for the center of the object.  "topLeft" indicates that `offset` should be interpreted as the location of the top left corner of the object.
 * @param radiusRatio -  The radius of the corners, as a ratio of it to the radius of the "circle".  Default 0.6.
 * @returns string svg path.
 */
export const roundedSquare = (
    size: Size,
    offset: Offset = ORIGIN_POINT,
    rotate: Angle = angle.ZERO_DEGREES,
    offsetFrom: OffsetFrom = 'center',
    radiusRatio: number = DEFAULT_RADIUS_RATIO
) => roundedPolygon(size, offset, offsetFrom, rotateAngles(PolygonAngles.square, rotate), radiusRatio)

/**
 * Creates an SVG path for a triangle with rounded corners.
 * @public
 * @param size -  Size of object to create.  Should be square.
 * @param offset -  Position in the field, where the object will be rendered.
 * @param rotate -  Angle of rotation.  Angle is counter-clockwise and zero is to the right of the origin.
 * @param offsetFrom -  Anchor for the offset.  "center" means that `offset` provides the coordinates for the center of the object.  "topLeft" indicates that `offset` should be interpreted as the location of the top left corner of the object.
 * @param radiusRatio -  The radius of the corners, as a ratio of it to the radius of the "circle".  Default 0.6.
 * @returns string svg path.
 */
export const roundedTriangle = (
    size: Size,
    offsetCenter: Offset = ORIGIN_POINT,
    rotate: Angle = angle.ZERO_DEGREES,
    offsetFrom: OffsetFrom = 'center',
    radiusRatio: number = DEFAULT_RADIUS_RATIO
) => roundedPolygon(size, offsetCenter, offsetFrom, rotateAngles(PolygonAngles.triangle, rotate), radiusRatio)

const rotateAngles = (angles: Angle[], by: Angle) => angles.map(it => angle.add(it, by))

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

const polarToOffset = ({ Θ, r }: Polar2D): Offset => ({ x: r * angle.cos(Θ), y: -r * angle.cos(Θ) })

const BoundingAngles: Transformer<Angle[], number, Bounding> = {
    minX: angles => angle.cos(reduce(minBy(angle.cos), angles[0], tail(angles))),
    maxX: angles => angle.cos(reduce(maxBy(angle.cos), angles[0], tail(angles))),
    minY: angles => angle.sin(reduce(minBy(angle.sin), angles[0], tail(angles))),
    maxY: angles => angle.sin(reduce(maxBy(angle.sin), angles[0], tail(angles))),
}

const boundingAngles = (angles: Angle[]) => transform(angles, BoundingAngles)

const ORIGIN_POINT: Offset = { x: 0, y: 0 }

const PolygonAngles = {
    triangle: [90, 210, 330].map(it => angle.angle(it)),
    square: [0, 1, 2, 3].map(it => angle.angle(it * 90 + 45)),
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
    offsetFrom: OffsetFrom = 'center',
    angles: Angle[] = PolygonAngles.triangle,
    radiusRatio: number = DEFAULT_RADIUS_RATIO
): string {
    const width = min(size.height, size.width)
    const { maxX, maxY, minX, minY } = boundingAngles(angles)
    const widthPerRadius = max(maxX - minX, minY - maxY) + RADIUS_RATIO2_T2
    const radius = width / widthPerRadius
    const cornerRadius = radius * radiusRatio
    offset =
        offsetFrom === 'center'
            ? offset
            : add(offset, {
                  x: cornerRadius - radius * minX,
                  y: cornerRadius + radius * minY,
              })

    const halfSweep = angle.angle(180 / angles.length)

    const initialPoint = add(
        offset,
        add(
            polarToOffset({ r: radius, Θ: last(angles) }),
            polarToOffset({ r: cornerRadius, Θ: angle.add(last(angles), halfSweep) })
        )
    )

    const p: Path = path()
    const arcTo = (Θ: Angle) => {
        const arc = (p: Path, point: Offset, radius: number, Θ1: Angle, Θ2: Angle) =>
            p.arc(point.x, point.y, radius, -angle.radians(Θ1), -angle.radians(Θ2), true)

        arc(
            p,
            polarToOffset({ r: radius, Θ }),
            cornerRadius,
            angle.subtract(Θ, halfSweep),
            angle.add(Θ, halfSweep)
        )
    }
    p.moveTo(initialPoint.x, initialPoint.y)
    angles.forEach(arcTo)
    return p.toString()
}
