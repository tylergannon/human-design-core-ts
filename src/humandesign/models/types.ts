import { Ascendant, ChartDate } from '../../astro'
import type { Maybe } from 'purify-ts'

/**
 * @public
 */
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

/**
 * @internal
 */
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

/**
 * @public
 */
export type ZodiacRecord<T> = Record<Zodiac, T>

/**
 * @public
 */
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

/**
 * @public
 */
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

/**
 * @internal
 */
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

/**
 * @public
 */
export type PlanetRecord<T> = Record<Planet, T>

/**
 * @public
 */
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

/**
 * @public
 */
export type Center = 'head' | 'ajna' | 'throat' | 'identity' | 'sacral' | 'spleen' | 'root' | 'will' | 'esp'
/**
 * @internal
 */
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

/**
 * @public
 */
export type CenterRecord<T> = Record<Center, T>

/**
 * @public
 */
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

/**
 * @public
 */
export type Authority = 'emotional' | 'sacral' | 'splenic' | 'ego' | 'self' | 'mental' | 'noAuthority'

/**
 * @internal
 */
export const authorityNames: Authority[] = [
    'emotional',
    'sacral',
    'splenic',
    'ego',
    'self',
    'mental',
    'noAuthority',
]

/**
 * @public
 */
export type AuthorityRecord<T> = Record<Authority, T>

/**
 * @public
 */
export const authorityRecord = <T>(fn: (authority: Authority) => T): AuthorityRecord<T> => ({
    emotional: fn('emotional'),
    sacral: fn('sacral'),
    splenic: fn('splenic'),
    ego: fn('ego'),
    self: fn('self'),
    mental: fn('mental'),
    noAuthority: fn('noAuthority'),
})

/**
 * @public
 */
export type HDType = 'Generator' | 'Manifesting Generator' | 'Manifestor' | 'Projector' | 'Reflector'

/**
 * @public
 */
export type Motor = 'root' | 'sacral' | 'will' | 'esp'

/**
 * @internal
 */
export const motorNames: Motor[] = ['root', 'sacral', 'will', 'esp']

/**
 * @public
 */
export type DefState = 'defined' | 'undefined'

/**
 * A gate's status in a given chart:
 *   - Defined in the Natal side,
 *   - Defined in the Design side,
 *   - Defined in both sides,
 *   - Not defined.
 * @public
 */
export type GateDefType = 'natal' | 'design' | 'both' | 'undefined'

/**
 * @public
 */
export type HDLine = '1' | '2' | '3' | '4' | '5' | '6'

/**
 * @public
 */
export interface HDProfile {
    readonly design: HDLine
    readonly natal: HDLine
}

/**
 * @public
 */
export interface Angle {
    readonly deg: number
    readonly min: number
    readonly sec: number
}

/**
 * @public
 */
export interface HDPos {
    readonly gate: GateNum
    readonly line: HDLine
    readonly lng: Angle
    readonly zodiac: Zodiac
    readonly zodiacLng: Angle
}

/**
 * @public
 */
export interface Chart {
    readonly chartDate: ChartDate
    readonly ascendant: Ascendant
    readonly planets: PlanetRecord<HDPos>
}

/**
 * @public
 */
export interface BirthChart {
    readonly natal: Chart
    readonly design: Chart
    readonly definedGates: GateNum[]
    readonly connectivity: Connectivity
    readonly allGates: GateRecord<GateDefType>
}

/**
 * @public
 */
export interface YinYang {
    readonly yin: boolean
    readonly yang: boolean
    other(): YinYang
}

/**
 * @public
 */
export type GateNum =
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
    | '17'
    | '18'
    | '19'
    | '20'
    | '21'
    | '22'
    | '23'
    | '24'
    | '25'
    | '26'
    | '27'
    | '28'
    | '29'
    | '30'
    | '31'
    | '32'
    | '33'
    | '34'
    | '35'
    | '36'
    | '37'
    | '38'
    | '39'
    | '40'
    | '41'
    | '42'
    | '43'
    | '44'
    | '45'
    | '46'
    | '47'
    | '48'
    | '49'
    | '50'
    | '51'
    | '52'
    | '53'
    | '54'
    | '55'
    | '56'
    | '57'
    | '58'
    | '59'
    | '60'
    | '61'
    | '62'
    | '63'
    | '64'

/**
 * @public
 */
export type GateRecord<T> = Record<GateNum, T>

/**
 * @public
 */
export interface Gate {
    readonly num: GateNum
    readonly ord: number
    readonly center: Center
    readonly connected: Array<GateNum>
    readonly angle: Angle
}

/**
 * @public
 */

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
    readonly solutions: Maybe<GateNum[][]>
}

/**
 * @public
 */

export interface Hexagram {
    readonly num: number
    readonly ord: number
    readonly lines: Array<YinYang>
}

/**
 * @public
 */
export interface ZodiacAngle {
    zodiac: Zodiac
    angle: Angle
}
