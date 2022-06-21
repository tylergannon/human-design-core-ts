/**
 * @internal
 */
export interface Point {
    x: number
    y: number
}

/**
 * @internal
 */
export type Measurement = Record<string, number>

/**
 * @public
 */
export interface Offset extends Measurement {
    x: number
    y: number
}

/**
 * @public
 */
export interface Size extends Measurement {
    width: number
    height: number
}

/**
 * @public
 */
export type OffsetFrom = 'center' | 'topLeft'

/**
 * @public
 */
export type WidthType = 'full' | 'half'

/**
 * @internal
 */
export interface Arc extends Point {
    type?: 'bezier' | 'line'
    control: Point
}

/**
 * @internal
 */
export interface PointRel {
    full: Point
    half: Point
}

/**
 * @public
 */
export interface ChartObject {
    readonly path: string
    readonly name: string
}
