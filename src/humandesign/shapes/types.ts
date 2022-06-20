export interface Point {
    x: number
    y: number
}

export type Measurement = Record<string, number>

export interface Offset extends Measurement {
    x: number
    y: number
}

export interface Size extends Measurement {
    width: number
    height: number
}

export interface Arc extends Point {
    type?: 'bezier' | 'line'
    control: Point
}

export interface PointRel {
    full: Point
    half: Point
}

export interface ChartObject {
    readonly path: string
    readonly name: string
}

