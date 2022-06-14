import type { Angle } from "./Angle"

export enum Zodiac {
    Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces
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
    Pluto
}

export enum HDLine {
    Line1 = 1,
    Line2 = 2,
    Line3 = 3,
    Line4 = 4,
    Line5 = 5,
    Line6 = 6
}

export interface HDProfile {
    readonly design: HDLine
    readonly natal: HDLine
}

export enum Center {
    Head,
    Ajna,
    Throat,
    Identity,
    Sacral,
    Root,
    Spleen,
    Will,
    ESP
}

export enum Authority {
    Emotional,
    Sacral,
    Splenic,
    Ego,
    Self,
    Mental,
    NoAuthority
}

export enum HDType {
    Generator,
    MGenerator,
    Manifestor,
    Projector,
    Reflector
}

export interface ChartOverview {
    readonly type: HDType
    readonly authority: Authority
    readonly profile: HDProfile

}

export enum Motor {
    Root, Sacral, Will, ESP
}

export const AllCenters : Center[] = [
    Center.Head,
    Center.Ajna,
    Center.Throat,
    Center.Identity,
    Center.Sacral,
    Center.Root,
    Center.Spleen,
    Center.Will,
    Center.ESP
]

export interface YinYang {
    readonly yin: boolean;
    readonly yang: boolean;
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

export interface Hexagram {
    num: number
    ord: number
    lines: Array<YinYang>
}

export interface IPlanetMap<T> {
    readonly sun: T;
    readonly earth: T;
    readonly moon: T;
    readonly northNode: T;
    readonly southNode: T;
    readonly mercury: T;
    readonly venus: T;
    readonly mars: T;
    readonly jupiter: T;
    readonly saturn: T;
    readonly chiron: T;
    readonly uranus: T;
    readonly neptune: T;
    readonly pluto: T;
    [zodiac: string]: T;
}

export interface ZodiacAngle {
    zodiac: Zodiac
    angle: Angle
}