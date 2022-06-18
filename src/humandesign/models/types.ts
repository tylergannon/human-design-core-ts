import type { Angle } from './Angle'
import type { Maybe } from 'purify-ts'

export enum Zodiac {
    Aries,
    Taurus,
    Gemini,
    Cancer,
    Leo,
    Virgo,
    Libra,
    Scorpio,
    Sagittarius,
    Capricorn,
    Aquarius,
    Pisces,
}

export enum Planet {
    Sun,
    Earth,
    Moon,
    NorthNode,
    SouthNode,
    Mercury,
    Venus,
    Mars,
    Jupiter,
    Saturn,
    Chiron,
    Uranus,
    Neptune,
    Pluto,
}

/**
 * A gate's status in a given chart:
 *   - Defined in the Natal side,
 *   - Defined in the Design side,
 *   - Defined in both sides,
 *   - Not defined.
 */
export enum GateDefType {
    Natal,
    Design,
    Both,
    Undefined,
}

export enum HDLine {
    Line1 = 1,
    Line2 = 2,
    Line3 = 3,
    Line4 = 4,
    Line5 = 5,
    Line6 = 6,
}

export interface HDProfile {
    readonly design: HDLine
    readonly natal: HDLine
}

export interface HDPos {
    readonly gate: Gate
    readonly line: HDLine
    readonly lng: Angle
    readonly zodiac: Zodiac
    readonly zodiacLng: Angle
}

export enum Center {
    Head = 1,
    Ajna,
    Throat,
    Identity,
    Sacral,
    Root,
    Spleen,
    Will,
    ESP,
}

export enum Authority {
    Emotional = 1,
    Sacral,
    Splenic,
    Ego,
    Self,
    Mental,
    NoAuthority,
}

export enum HDType {
    Generator = 1,
    MGenerator,
    Manifestor,
    Projector,
    Reflector,
}

export interface ChartOverview {
    readonly type: HDType
    readonly authority: Authority
    readonly profile: HDProfile
}

export enum Motor {
    Root,
    Sacral,
    Will,
    ESP,
}

export const AllCenters: Center[] = [
    Center.Head,
    Center.Ajna,
    Center.Throat,
    Center.Identity,
    Center.Sacral,
    Center.Root,
    Center.Spleen,
    Center.Will,
    Center.ESP,
]

export interface YinYang {
    readonly yin: boolean
    readonly yang: boolean
    other(): YinYang
}

export interface CenterMap<T> {
    head: T
    ajna: T
    throat: T
    identity: T
    sacral: T
    root: T
    spleen: T
    will: T
    esp: T
}

export interface Gate {
    readonly num: number
    readonly ord: number
    readonly center: Center
    readonly connected: Array<number>
    readonly angle: Angle
}

export enum DefState {
    Defined = 1,
    Undefined,
}

export interface Connectivity {
    /**
     * A map telling whether each center is defined.
     */
    readonly centers: CenterMap<DefState>
    /**
     * The connected components, as a list of lists.
     */
    readonly components: Center[][]
    /**
     * The Human Design type of the chart
     */
    readonly type: HDType
    /**
     * The Authority for the chart
     */
    readonly authority: Authority
    /**
     * The number of connected components
     */
    readonly rank: number

    /**
     * Solutions, if provided, are the set of shortest
     * routes to connect the
     */
    readonly solutions: Maybe<Gate[][]>
}

export interface Hexagram {
    readonly num: number
    readonly ord: number
    readonly lines: Array<YinYang>
}

export interface IPlanetMap<T> {
    readonly sun: T
    readonly earth: T
    readonly moon: T
    readonly northNode: T
    readonly southNode: T
    readonly mercury: T
    readonly venus: T
    readonly mars: T
    readonly jupiter: T
    readonly saturn: T
    readonly chiron: T
    readonly uranus: T
    readonly neptune: T
    readonly pluto: T
    [zodiac: string]: T
}

export interface ZodiacAngle {
    zodiac: Zodiac
    angle: Angle
}
