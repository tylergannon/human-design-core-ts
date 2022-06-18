import type { Angle } from './Angle'
import type { Maybe } from 'purify-ts'

export type Zodiac =
    | 'aries'
    | 'taurus'
    | 'gemini'
    | 'cancer'
    | 'leo'
    | 'virgo'
    | 'libra'
    | 'scorpio'
    | 'sagittarius'
    | 'capricorn'
    | 'aquarius'
    | 'pisces'
export const zodiacNames: Zodiac[] = [
    'aries',
    'taurus',
    'gemini',
    'cancer',
    'leo',
    'virgo',
    'libra',
    'scorpio',
    'sagittarius',
    'capricorn',
    'aquarius',
    'pisces',
]
export type ZodiacRecord<T> = Record<Zodiac, T>
export const zodiacRecord = <T>(fn: (zodiac: Zodiac) => T): ZodiacRecord<T> => ({
    aries: fn('aries'),
    taurus: fn('taurus'),
    gemini: fn('gemini'),
    cancer: fn('cancer'),
    leo: fn('leo'),
    virgo: fn('virgo'),
    libra: fn('libra'),
    scorpio: fn('scorpio'),
    sagittarius: fn('sagittarius'),
    capricorn: fn('capricorn'),
    aquarius: fn('aquarius'),
    pisces: fn('pisces'),
})

export type Planet =
    | 'sun'
    | 'earth'
    | 'moon'
    | 'northNode'
    | 'southNode'
    | 'mercury'
    | 'venus'
    | 'mars'
    | 'jupiter'
    | 'saturn'
    | 'uranus'
    | 'neptune'
    | 'pluto'
    | 'chiron'
export const planetNames: Planet[] = [
    'sun',
    'earth',
    'moon',
    'northNode',
    'southNode',
    'mercury',
    'venus',
    'mars',
    'jupiter',
    'saturn',
    'uranus',
    'neptune',
    'pluto',
    'chiron',
]
export type PlanetRecord<T> = Record<Planet, T>

export const planetRecord = <T>(fn: (planet: Planet) => T): PlanetRecord<T> => ({
    sun: fn('sun'),
    earth: fn('earth'),
    moon: fn('moon'),
    northNode: fn('northNode'),
    southNode: fn('southNode'),
    mercury: fn('mercury'),
    venus: fn('venus'),
    mars: fn('mars'),
    jupiter: fn('jupiter'),
    saturn: fn('saturn'),
    uranus: fn('uranus'),
    neptune: fn('neptune'),
    pluto: fn('pluto'),
    chiron: fn('chiron'),
})

export type Center = 'head' | 'ajna' | 'throat' | 'identity' | 'sacral' | 'spleen' | 'root' | 'will' | 'esp'
export const centerNames: Center[] = [
    'head',
    'ajna',
    'throat',
    'identity',
    'sacral',
    'spleen',
    'root',
    'will',
    'esp',
]
export type CenterRecord<T> = Record<Center, T>
export const centerRecord = <T>(fn: (center: Center) => T): CenterRecord<T> => ({
    head: fn('head'),
    ajna: fn('ajna'),
    throat: fn('throat'),
    identity: fn('identity'),
    sacral: fn('sacral'),
    spleen: fn('spleen'),
    root: fn('root'),
    will: fn('will'),
    esp: fn('esp'),
})

export type Authority = 'emotional' | 'sacral' | 'splenic' | 'ego' | 'self' | 'mental' | 'noAuthority'
export const authorityNames: Authority[] = [
    'emotional',
    'sacral',
    'splenic',
    'ego',
    'self',
    'mental',
    'noAuthority',
]
export type AuthorityRecord<T> = Record<Authority, T>
export const authorityRecord = <T>(fn: (authority: Authority) => T): AuthorityRecord<T> => ({
    emotional: fn('emotional'),
    sacral: fn('sacral'),
    splenic: fn('splenic'),
    ego: fn('ego'),
    self: fn('self'),
    mental: fn('mental'),
    noAuthority: fn('noAuthority'),
})

export type HDType = 'Generator' | 'Manifesting Generator' | 'Manifestor' | 'Projector' | 'Reflector'

export type Motor = 'root' | 'sacral' | 'will' | 'esp'
export const motorNames: Motor[] = ['root', 'sacral', 'will', 'esp']

export type DefState = 'defined' | 'undefined'

/**
 * A gate's status in a given chart:
 *   - Defined in the Natal side,
 *   - Defined in the Design side,
 *   - Defined in both sides,
 *   - Not defined.
 */
export type GateDefType = 'natal' | 'design' | 'both' | 'undefined'
export type HDLine = '1' | '2' | '3' | '4' | '5' | '6'

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

export interface ChartOverview {
    readonly type: HDType
    readonly authority: Authority
    readonly profile: HDProfile
}

export interface YinYang {
    readonly yin: boolean
    readonly yang: boolean
    other(): YinYang
}

export interface Gate {
    readonly num: number
    readonly ord: number
    readonly center: Center
    readonly connected: Array<number>
    readonly angle: Angle
}

export interface Connectivity {
    /**
     * A map telling whether each center is defined.
     */
    readonly centers: CenterRecord<DefState>
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

export interface ZodiacAngle {
    zodiac: Zodiac
    angle: Angle
}
