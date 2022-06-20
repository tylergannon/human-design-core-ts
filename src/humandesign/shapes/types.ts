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

export interface SimpleChannel {
    name: string
    point1: Point
    arc2: Point
    point3Rel: PointRel
    point4Rel: PointRel
    mirror?: string
}

export interface QuadraticArc extends Arc {
    control: Point
}

export interface QuadraticData extends SimpleChannel {
    arc2: Arc
    control2Rel: PointRel
}

export interface CubicData extends QuadraticData {
    cubicPoint1: Point
    cubicPoint2Rel: PointRel
}

export type ChannelData = SimpleChannel | QuadraticData | CubicData
