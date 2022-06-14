import { flatten } from 'ramda'
import type { Path } from 'd3-path'
import { path } from 'd3-path'
import type { Point, PointRel, ChannelData, QuadraticData, CubicData, Arc } from './types'

import { channelData } from './channels'

const add = (p1: Point, p2: Point): Point => ({x: p1.x + p2.x, y: p1.y + p2.y})

function mirror(point: Point) : Point {
    return { x: - point.x, y: point.y}
}

function mirrorRel(pointRel: PointRel) : PointRel {
    return {
        full: mirror(pointRel.full),
        half: mirror(pointRel.half)
    }
}

export interface ChartObject {
    readonly path: string
    readonly name: string
}

export const polygons = {
	head: "-103,23 -103,200 99,200 98,24",
	ajna: "100,200 -107,200 -107,369 100,371",
	throat: "113,371 -115,369 -351,741 -232,780 -137,565 90,565 118,620 161,597 192,630 263,598",
	identity: "-345,743 -98,565 95,565 142,674 81,752 61,816 -124,815",
	sacral: "120,817 -122,815 -159,1037 161,1037",
	root: "-160,1037 -280,1248 290,1248 162,1037",
	spleen: "-353,741 -433,959 -282,1252 -159,1035 -129,858 -182,742 -228,781",
	will: "86,745 -165,779 -139,835 219,865 268,836 164,596 113,622 142,674",
	esp: "268,835 186,633 276,592 408,893 290,1248 160,1034 139,916"
}


function toArray(channel: ChannelDraw<ChannelData>) : Array<ChartObject> {
    return channel.hasMirror ? [channel, channel.reversed()] : [channel]
}

export function buildPaths(): Array<ChartObject> {
    return flatten(
        channelData.map(channel => {
                return toArray(
                    isCubicCurve(channel) ? new CubicDraw(channel)
                        : isQuadraticCurve(channel) ? new QuadraticDraw(channel)
                        : new LineDraw(channel)
                )
            })
    )
}

abstract class ChannelDraw<T extends ChannelData> implements ChartObject {

    protected data: T
    protected abstract copy(): ChannelDraw<T>

    protected abstract drawSide1() : void
    protected abstract drawSide3() : void

    public readonly name: string

    public get hasMirror(): boolean { return typeof this.mirror === "string"}

    public get path() : string {
        this.p = path()
        this.drawFull()
        return this.p.toString()
    }

    public reversed() : ChannelDraw<T> {
        const newDraw = this.copy()
        newDraw.p = path()
        newDraw.data = mirrorData(this.data)
        return newDraw
    }

    constructor(data: T) {
        this.data = data
        this.name = data.name
        this.mirror = data.mirror
    }

    private mirror?: string
    private _p: Path | undefined

    private get p() : Path {
        return this._p!
    }
    private set p(p: Path) {
        this._p = p
    }


    protected drawFull() {
        this.moveTo(this.data.point1)
        this.drawSide1()
        this.lineTo(
            add(this.data.point3Rel.full, this.data.arc2)
        )
        this.drawSide3()
        this.lineTo(this.data.point1)
    }

    protected bezierCurveTo(ctx1: Point, ctx2: Point, dest: Point) {
        this.p.bezierCurveTo(
            ctx1.x, ctx1.y, 
            ctx2.x, ctx2.y, 
            dest.x, dest.y
        )
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
    copy() { return new LineDraw(this.data)}
    drawSide1() {
        this.lineTo(this.data.arc2)
    }
    drawSide3() {
        this.lineTo(
            add(this.data.point4Rel.full, this.data.point1)
        )
    }
}

class QuadraticDraw extends ChannelDraw<QuadraticData> {
    copy() { return new QuadraticDraw(this.data)}
    drawSide1() {
        this.quadraticCurveTo(this.data.arc2.control, this.data.arc2)
    }

    drawSide3() {
        // the fourth point is given relative to the first.
        this.quadraticCurveTo(
            add( this.data.control2Rel.full, this.data.arc2.control), 
            add(this.data.point4Rel.full, this.data.point1)
        )
    }
}

class CubicDraw extends ChannelDraw<CubicData> {
    copy() { return new CubicDraw(this.data)}
    drawSide1(): void {
        this.bezierCurveTo(
            this.data.arc2.control,
            this.data.cubicPoint1,
            this.data.arc2
        )
    }

    /**
     * The control points must be reversed for this one, relative to Side 1.
     */
    drawSide3(): void {
        const { 
            point1, 
            cubicPoint1, 
            arc2: { control: control1 },
            cubicPoint2Rel: {full : cubicPoint2Rel}, 
            point4Rel: { full: point4Rel },
            control2Rel: {full : control2Rel}
        } = this.data

        this.bezierCurveTo(
            add(cubicPoint1, cubicPoint2Rel),
            add(control1, control2Rel),
            add(point4Rel, point1)
        )
    }

}



function isChannelDraw(value: any | null | undefined) : value is ChannelData {
    return typeof value === "object"
}

function isArc(value: any | null | undefined) : value is Arc {
    return typeof value === "object" && typeof value.control === "object"
}

function isQuadraticCurve(value: any | null | undefined): value is QuadraticData {
    return isChannelDraw(value) && (isArc(value.arc2))
}
function isCubicCurve(value: any | null | undefined): value is CubicData {
    return typeof value === "object" && typeof value.cubicPoint1 === "object"
}

function mirrorData<T extends ChannelData>(channel: T) : T {
    const newData = {
        ...channel,
        name: channel.mirror!,
        point1: mirror(channel.point1),
        arc2: mirror(channel.arc2),
        point3Rel: mirrorRel(channel.point3Rel),
        point4Rel: mirrorRel(channel.point4Rel)
    }
    if (isQuadraticCurve(channel)) {
        const quadData = {
            ...newData,
            arc2: {...newData.arc2, control: {...mirror(channel.arc2.control)}},
            control2Rel: mirrorRel(channel.control2Rel)
        }
        if (!isCubicCurve(channel)) {
            return quadData
        } else {
            return {
                ...quadData,
                cubicPoint1: mirror(channel.cubicPoint1),
                cubicPoint2Rel: mirrorRel(channel.cubicPoint2Rel)
            }
        }
    }
    return newData
}
