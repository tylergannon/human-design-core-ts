/**
 * @internal
 */
export interface Point {
    x: number
    y: number
}

/**
 * @public
 */
export interface Offset extends Record<string, number> {
    x: number
    y: number
}

/**
 * @public
 */
export interface Size extends Record<string, number> {
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
