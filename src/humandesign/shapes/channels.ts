import { path } from 'd3-path'
import type { Path } from 'd3-path'
import { GateNum, GateRecord } from '../models/types'
import type { Point, PointRel, Arc, ChartObject } from './types'

type WidthType = 'full' | 'half'

const pointFinders: Record<WidthType, (x: PointRel) => Point> = {
    half: ({ half }: PointRel) => half,
    full: ({ full }: PointRel) => full,
}

export function getPath(type: WidthType, gate: GateNum): ChartObject {
    const data = Channels[gate]
    const klass = isCubicCurve(data) ? CubicDraw : isQuadraticCurve(data) ? QuadraticDraw : LineDraw
    return new klass(data, pointFinders[type])
}

const add = (p1: Point, p2: Point): Point => ({ x: p1.x + p2.x, y: p1.y + p2.y })

interface SimpleChannel {
    name: string
    point1: Point
    arc2: Point
    point3Rel: PointRel
    point4Rel: PointRel
    mirror?: string
}

interface QuadraticData extends SimpleChannel {
    arc2: Arc
    control2Rel: PointRel
}

interface CubicData extends QuadraticData {
    cubicPoint1: Point
    cubicPoint2Rel: PointRel
}

type ChannelData = SimpleChannel | QuadraticData | CubicData

function isChannelDraw(value: any | null | undefined): value is ChannelData {
    return typeof value === 'object'
}

function isArc(value: any | null | undefined): value is Arc {
    return typeof value === 'object' && 'control' in value
}

function isQuadraticCurve(value: any | null | undefined): value is QuadraticData {
    return isChannelDraw(value) && isArc(value.arc2)
}

function isCubicCurve(value: any | null | undefined): value is CubicData {
    return typeof value === 'object' && 'cubicPoint1' in value
}

function mirror(point: Point): Point {
    return { x: -point.x, y: point.y }
}

function mirrorRel(pointRel: PointRel): PointRel {
    return {
        full: mirror(pointRel.full),
        half: mirror(pointRel.half),
    }
}

function reverse<T extends ChannelData>(channel: T): T {
    const newData = {
        ...channel,
        name: channel.mirror ?? '',
        point1: mirror(channel.point1),
        arc2: mirror(channel.arc2),
        point3Rel: mirrorRel(channel.point3Rel),
        point4Rel: mirrorRel(channel.point4Rel),
    }
    if (isQuadraticCurve(channel)) {
        const quadData = {
            ...newData,
            arc2: { ...newData.arc2, control: { ...mirror(channel.arc2.control) } },
            control2Rel: mirrorRel(channel.control2Rel),
        }
        if (!isCubicCurve(channel)) {
            return quadData
        } else {
            return {
                ...quadData,
                cubicPoint1: mirror(channel.cubicPoint1),
                cubicPoint2Rel: mirrorRel(channel.cubicPoint2Rel),
            }
        }
    }
    return newData
}

abstract class ChannelDraw<T extends ChannelData> implements ChartObject {
    protected data: T
    protected abstract copy(): ChannelDraw<T>
    protected pointOption: (val: PointRel) => Point

    protected abstract drawSide1(): void
    protected abstract drawSide3(): void

    public readonly name: string

    public get hasMirror(): boolean {
        return typeof this.mirror === 'string'
    }

    public get path(): string {
        this.p = path()
        this.draw()
        return this.p.toString()
    }

    public reversed(): ChannelDraw<T> {
        const newDraw = this.copy()
        newDraw.p = path()
        newDraw.data = reverse(this.data)
        return newDraw
    }

    constructor(data: T, pointOption: (val: PointRel) => Point) {
        this.data = data
        this.name = data.name
        this.mirror = data.mirror
        this.pointOption = pointOption
    }

    private mirror?: string
    private _p: Path | undefined

    private get p(): Path {
        if (!this._p) {
            throw new Error("Didn't initialize _p")
        }
        return this._p
    }
    private set p(p: Path) {
        this._p = p
    }

    public get point3(): Point {
        return add(this.pointOption(this.data.point3Rel), this.data.arc2)
    }

    public get point4(): Point {
        return add(this.pointOption(this.data.point4Rel), this.data.point1)
    }

    protected draw() {
        this.moveTo(this.data.point1)
        this.drawSide1()
        this.lineTo(this.point3)
        this.drawSide3()
        this.lineTo(this.data.point1)
    }

    protected bezierCurveTo(ctx1: Point, ctx2: Point, dest: Point) {
        this.p.bezierCurveTo(ctx1.x, ctx1.y, ctx2.x, ctx2.y, dest.x, dest.y)
    }

    protected quadraticCurveTo(control: Point, destination: Point) {
        this.p.quadraticCurveTo(control.x, control.y, destination.x, destination.y)
    }
    protected lineTo(point: Point) {
        this.p.lineTo(point.x, point.y)
    }
    protected moveTo(point: Point) {
        this.p.moveTo(point.x, point.y)
    }
}

class LineDraw extends ChannelDraw<ChannelData> {
    copy() {
        return new LineDraw({ ...this.data }, this.pointOption)
    }
    drawSide1() {
        this.lineTo(this.data.arc2)
    }
    drawSide3() {
        this.lineTo(add(this.data.point4Rel.full, this.data.point1))
    }
}

class QuadraticDraw extends ChannelDraw<QuadraticData> {
    copy() {
        return new QuadraticDraw({ ...this.data }, this.pointOption)
    }

    drawSide1() {
        this.quadraticCurveTo(this.data.arc2.control, this.data.arc2)
    }

    public get control2(): Point {
        return add(this.pointOption(this.data.control2Rel), this.data.arc2.control)
    }

    drawSide3() {
        // the fourth point is given relative to the first.
        this.quadraticCurveTo(this.control2, this.point4)
    }
}

class CubicDraw extends ChannelDraw<CubicData> {
    copy() {
        return new CubicDraw({ ...this.data }, this.pointOption)
    }
    drawSide1(): void {
        this.bezierCurveTo(this.data.arc2.control, this.data.cubicPoint1, this.data.arc2)
    }

    /**
     * The control points must be reversed for this one, relative to Side 1.
     */
    drawSide3(): void {
        this.bezierCurveTo(this.control3, this.control2, this.point4)
    }

    public get control2(): Point {
        return add(this.pointOption(this.data.control2Rel), this.data.arc2.control)
    }

    public get control3(): Point {
        return add(this.data.cubicPoint1, this.pointOption(this.data.cubicPoint2Rel))
    }
}

const raw = {
    center: {
        name: 'center',
        arc2: {
            x: 10,
            y: 1100,
        },
        point1: {
            x: 10,
            y: 160,
        },
        point3Rel: {
            full: {
                x: -20,
                y: 0,
            },
            half: {
                x: -10,
                y: 0,
            },
        },
        point4Rel: {
            full: {
                x: -20,
                y: 0,
            },
            half: {
                x: -10,
                y: 0,
            },
        },
    },
    right: {
        name: 'right',
        arc2: {
            x: 40,
            y: 1100,
        },
        point1: {
            x: 40,
            y: 160,
        },
        point3Rel: {
            full: {
                x: -20,
                y: 0,
            },
            half: {
                x: -10,
                y: 0,
            },
        },
        point4Rel: {
            full: {
                x: -20,
                y: 0,
            },
            half: {
                x: -10,
                y: 0,
            },
        },
    },
    left: {
        name: 'left',
        arc2: {
            x: -20,
            y: 1100,
        },
        point1: {
            x: -20,
            y: 160,
        },
        point3Rel: {
            full: {
                x: -20,
                y: 0,
            },
            half: {
                x: -10,
                y: 0,
            },
        },
        point4Rel: {
            full: {
                x: -20,
                y: 0,
            },
            half: {
                x: -10,
                y: 0,
            },
        },
    },
    '35_36': {
        name: '35_36',
        mirror: '16_48',
        arc2: {
            type: 'bezier',
            x: 335,
            y: 848,
            control: {
                x: 265,
                y: 509,
            },
        },
        control2Rel: {
            full: {
                x: -16,
                y: 18,
            },
            half: {
                x: -6,
                y: 9,
            },
        },
        point1: {
            x: 67,
            y: 434,
        },
        point3Rel: {
            full: {
                x: -17,
                y: -5,
            },
            half: {
                x: -7,
                y: 8,
            },
        },
        point4Rel: {
            full: {
                x: 2,
                y: 18,
            },
            half: {
                x: 1,
                y: 11,
            },
        },
    },
    '12_22': {
        name: '12_22',
        mirror: '20_57',
        arc2: {
            type: 'bezier',
            x: 307,
            y: 868,
            control: {
                x: 233,
                y: 521,
            },
        },
        control2Rel: {
            full: {
                x: -15,
                y: 20,
            },
            half: {
                x: -7,
                y: 9,
            },
        },
        point1: {
            x: 64,
            y: 469,
        },
        point3Rel: {
            full: {
                x: -20,
                y: -4,
            },
            half: {
                x: -9,
                y: 5,
            },
        },
        point4Rel: {
            full: {
                x: 2,
                y: 19,
            },
            half: {
                x: -2,
                y: 10,
            },
        },
    },
    '30_41': {
        name: '30_41',
        mirror: '18_58',
        arc2: {
            type: 'bezier',
            x: 62,
            y: 1182,
            control: {
                x: 265,
                y: 1157,
            },
        },
        control2Rel: {
            full: {
                x: -6,
                y: -18,
            },
            half: {
                x: -9,
                y: -5,
            },
        },
        point1: {
            x: 320,
            y: 1019,
        },
        point3Rel: {
            full: {
                x: 1,
                y: -19,
            },
            half: {
                x: -6,
                y: -11,
            },
        },
        point4Rel: {
            full: {
                x: -14,
                y: -16,
            },
            half: {
                x: -7,
                y: -8,
            },
        },
    },
    '39_55': {
        name: '39_55',
        mirror: '28_38',
        arc2: {
            type: 'bezier',
            x: 65,
            y: 1148,
            control: {
                x: 230,
                y: 1135,
            },
        },
        control2Rel: {
            full: {
                x: -6,
                y: -18,
            },
            half: {
                x: 1,
                y: -10,
            },
        },
        point1: {
            x: 295,
            y: 1005,
        },
        point3Rel: {
            full: {
                x: 0,
                y: -20,
            },
            half: {
                x: -2,
                y: -12,
            },
        },
        point4Rel: {
            full: {
                x: -14,
                y: -16,
            },
            half: {
                x: -6,
                y: -15,
            },
        },
    },
    '19_49': {
        name: '19_49',
        mirror: '32_54',
        arc2: {
            type: 'bezier',
            x: 67,
            y: 1115,
            control: {
                x: 224,
                y: 1097,
            },
        },
        control2Rel: {
            full: {
                x: -8,
                y: -15,
            },
            half: {
                x: 1,
                y: -7,
            },
        },
        point1: {
            x: 263,
            y: 985,
        },
        point3Rel: {
            full: {
                x: -1,
                y: -19,
            },
            half: {
                x: -2,
                y: -10,
            },
        },
        point4Rel: {
            full: {
                x: -13,
                y: -15,
            },
            half: {
                x: -6,
                y: -16,
            },
        },
    },
    '6_59': {
        name: '6_59',
        mirror: '27_50',
        arc2: {
            type: 'bezier',
            x: 71,
            y: 979,
            control: {
                x: 154,
                y: 976,
            },
        },
        control2Rel: {
            full: {
                x: -8,
                y: -17,
            },
            half: {
                x: -12,
                y: -6,
            },
        },
        point1: {
            x: 224,
            y: 938,
        },
        point3Rel: {
            full: {
                x: 0,
                y: -19,
            },
            half: {
                x: -2,
                y: -11,
            },
        },
        point4Rel: {
            full: {
                x: -14,
                y: -14,
            },
            half: {
                x: -9,
                y: -9,
            },
        },
    },
    '10_34': {
        name: '10_34',
        arc2: {
            type: 'bezier',
            x: -60,
            y: 666,
            control: {
                x: -371,
                y: 943,
            },
        },
        control2Rel: {
            full: {
                x: 54,
                y: -15,
            },
            half: {
                x: 25,
                y: -11,
            },
        },
        cubicPoint1: {
            x: -144,
            y: 639,
        },
        cubicPoint2Rel: {
            full: {
                x: 0,
                y: 24,
            },
            half: {
                x: 6,
                y: 10,
            },
        },
        point1: {
            x: -36,
            y: 912,
        },
        point3Rel: {
            full: {
                x: 1,
                y: 16,
            },
            half: {
                x: -1,
                y: 9,
            },
        },
        point4Rel: {
            full: {
                x: 1,
                y: -21,
            },
            half: {
                x: -2,
                y: -11,
            },
        },
    },
    '25_51': {
        name: '25_51',
        arc2: {
            type: 'bezier',
            x: 153,
            y: 727,
            control: {
                x: 117,
                y: 681,
            },
        },
        control2Rel: {
            full: {
                x: -13,
                y: 12,
            },
            half: {
                x: -1,
                y: 12,
            },
        },
        point1: {
            x: 77,
            y: 665,
        },
        point3Rel: {
            full: {
                x: -13,
                y: 15,
            },
            half: {
                x: -7,
                y: 8,
            },
        },
        point4Rel: {
            full: {
                x: -20,
                y: 18,
            },
            half: {
                x: -7,
                y: 10,
            },
        },
    },
    '21_45': {
        name: '21_45',
        arc2: {
            type: 'bezier',
            x: 178,
            y: 701,
            control: {
                x: 165,
                y: 587,
            },
        },
        control2Rel: {
            full: {
                x: -12,
                y: 10,
            },
            half: {
                x: -3,
                y: 12,
            },
        },
        point1: {
            x: 70,
            y: 506,
        },
        point3Rel: {
            full: {
                x: -13,
                y: 16,
            },
            half: {
                x: -7,
                y: 8,
            },
        },
        point4Rel: {
            full: {
                x: -10,
                y: 16,
            },
            half: {
                x: -6,
                y: 9,
            },
        },
    },
    '37_40': {
        name: '37_40',
        arc2: {
            type: 'bezier',
            x: 266,
            y: 869,
            control: {
                x: 247,
                y: 815,
            },
        },
        control2Rel: {
            full: {
                x: -11,
                y: 12,
            },
            half: {
                x: -3,
                y: 7,
            },
        },
        point1: {
            x: 221,
            y: 801,
        },
        point3Rel: {
            full: {
                x: -14,
                y: 16,
            },
            half: {
                x: -5,
                y: 14,
            },
        },
        point4Rel: {
            full: {
                x: -21,
                y: 8,
            },
            half: {
                x: -21,
                y: -3,
            },
        },
    },
    '26_44': {
        name: '26_44',
        arc2: {
            type: 'bezier',
            x: 142,
            y: 788,
            control: {
                x: -143,
                y: 731,
            },
        },
        control2Rel: {
            full: {
                x: -13,
                y: 12,
            },
            half: {
                x: 0,
                y: 8,
            },
        },
        point1: {
            x: -283,
            y: 890,
        },
        point3Rel: {
            full: {
                x: -8,
                y: 16,
            },
            half: {
                x: -7,
                y: 8,
            },
        },
        point4Rel: {
            full: {
                x: -21,
                y: 49,
            },
            half: {
                x: -6,
                y: 19,
            },
        },
    },
}

const mirrors = {
    '16_48': reverse(raw['35_36']),
    '20_57': reverse(raw['12_22']),
    '18_58': reverse(raw['30_41']),
    '28_38': reverse(raw['39_55']),
    '32_54': reverse(raw['19_49']),
    '27_50': reverse(raw['6_59']),
}

const Channels: GateRecord<ChannelData> = {
    '64': raw.left,
    '47': raw.left,
    '17': raw.left,
    '62': raw.left,
    '31': raw.left,
    '7': raw.left,
    '15': raw.left,
    '5': raw.left,
    '42': raw.left,
    '53': raw.left,
    '61': raw.center,
    '24': raw.center,
    '43': raw.center,
    '23': raw.center,
    '8': raw.center,
    '1': raw.center,
    '2': raw.center,
    '14': raw.center,
    '3': raw.center,
    '60': raw.center,
    '63': raw.right,
    '4': raw.right,
    '11': raw.right,
    '56': raw.right,
    '33': raw.right,
    '13': raw.right,
    '46': raw.right,
    '29': raw.right,
    '9': raw.right,
    '52': raw.right,
    '35': raw['35_36'],
    '36': raw['35_36'],
    '16': mirrors['16_48'],
    '48': mirrors['16_48'],
    '12': raw['12_22'],
    '22': raw['12_22'],
    '20': mirrors['20_57'],
    '57': mirrors['20_57'],
    '30': raw['30_41'],
    '41': raw['30_41'],
    '18': mirrors['18_58'],
    '58': mirrors['18_58'],
    '39': raw['39_55'],
    '55': raw['39_55'],
    '28': mirrors['28_38'],
    '38': mirrors['28_38'],
    '19': raw['19_49'],
    '49': raw['19_49'],
    '32': mirrors['32_54'],
    '54': mirrors['32_54'],
    '10': raw['10_34'],
    '34': raw['10_34'],
    '26': raw['26_44'],
    '44': raw['26_44'],
    '37': raw['37_40'],
    '40': raw['37_40'],
    '25': raw['25_51'],
    '51': raw['25_51'],
    '6': raw['6_59'],
    '59': raw['6_59'],
    '27': mirrors['27_50'],
    '50': mirrors['27_50'],
    '21': raw['21_45'],
    '45': raw['21_45'],
}
