## API Report File for "@tylergannon/human-design-core-ts"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import type { Maybe } from 'purify-ts';

// @public (undocumented)
export const allPips: GateRecord<Offset>;

// @public (undocumented)
export class Angle {
    constructor(deg?: number, min?: number, sec?: number);
    // (undocumented)
    get cos(): number;
    // (undocumented)
    readonly deg: number;
    // (undocumented)
    div(other: Angle): number;
    // (undocumented)
    readonly min: number;
    // (undocumented)
    minus(other: Angle): Angle;
    // (undocumented)
    negative(): Angle;
    // (undocumented)
    static of(deg: number, min?: number, sec?: number): Angle;
    // (undocumented)
    static opposite: Angle;
    // (undocumented)
    plus(other: Angle): Angle;
    // (undocumented)
    get radians(): number;
    // (undocumented)
    readonly sec: number;
    // (undocumented)
    get sin(): number;
    // (undocumented)
    times(scale: number): Angle;
    // (undocumented)
    toFloat(): number;
}

// @public (undocumented)
export class AstroApiClient {
    constructor(apiKey: string);
    // (undocumented)
    getChart(tz: string, date: string, time: string): Promise<BirthChart>;
    // (undocumented)
    getSaturnReturn(tz: string, date: string, time: string): Promise<BirthChart>;
    // (undocumented)
    getUranusOpposition(tz: string, date: string, time: string): Promise<BirthChart>;
    // (undocumented)
    searchCities(q: string): Promise<CityGeoFacts[]>;
}

// @public (undocumented)
export type Authority = 'emotional' | 'sacral' | 'splenic' | 'ego' | 'self' | 'mental' | 'noAuthority';

// @public
export class BirthChart {
    constructor(natal: Chart, design: Chart);
    // (undocumented)
    get allGates(): GateRecord<GateDefType>;
    // (undocumented)
    get connectivity(): Connectivity;
    // (undocumented)
    get definedGates(): Gate[];
    // (undocumented)
    design: Chart;
    // (undocumented)
    natal: Chart;
}

// @public (undocumented)
export type Center = 'head' | 'ajna' | 'throat' | 'identity' | 'sacral' | 'spleen' | 'root' | 'will' | 'esp';

// @public (undocumented)
export type CenterRecord<T> = Record<Center, T>;

// @public
export class Chart {
    constructor(chartDate: ChartDate, planets: PlanetRecord<Position>);
    // Warning: (ae-forgotten-export) The symbol "ChartDate" needs to be exported by the entry point index.d.ts
    //
    // (undocumented)
    readonly chartDate: ChartDate;
    // (undocumented)
    readonly planets: PlanetRecord<HDPos>;
}

// @public (undocumented)
export interface ChartObject {
    // (undocumented)
    readonly name: string;
    // (undocumented)
    readonly path: string;
}

// @public (undocumented)
export interface CityGeoFacts {
    // (undocumented)
    'admin_name': string;
    // (undocumented)
    'ascii_name': string;
    // (undocumented)
    'country': string;
    // (undocumented)
    'id': number;
    // (undocumented)
    'iso3': string;
    // (undocumented)
    'lat': number;
    // (undocumented)
    'lng': number;
    // (undocumented)
    'name': string;
    // (undocumented)
    'zone': string;
}

// @public (undocumented)
export interface Connectivity {
    readonly authority: Authority;
    readonly centers: CenterRecord<DefState>;
    readonly components: Center[][];
    readonly rank: number;
    readonly solutions: Maybe<Gate[][]>;
    readonly type: HDType;
}

// @public (undocumented)
export type DefState = 'defined' | 'undefined';

// @public (undocumented)
export interface Gate {
    // (undocumented)
    readonly angle: Angle;
    // (undocumented)
    readonly center: Center;
    // (undocumented)
    readonly connected: Array<GateNum>;
    // (undocumented)
    readonly num: GateNum;
    // (undocumented)
    readonly ord: number;
}

// @public
export type GateDefType = 'natal' | 'design' | 'both' | 'undefined';

// @public (undocumented)
export type GateNum = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '40' | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' | '50' | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59' | '60' | '61' | '62' | '63' | '64';

// @public (undocumented)
export type GateRecord<T> = Record<GateNum, T>;

// @public
export function getPath(type: WidthType, gate: GateNum): ChartObject;

// @public (undocumented)
export type HDLine = '1' | '2' | '3' | '4' | '5' | '6';

// @public (undocumented)
export interface HDPos {
    // (undocumented)
    readonly gate: Gate;
    // (undocumented)
    readonly line: HDLine;
    // (undocumented)
    readonly lng: Angle;
    // (undocumented)
    readonly zodiac: Zodiac;
    // (undocumented)
    readonly zodiacLng: Angle;
}

// @public (undocumented)
export interface HDProfile {
    // (undocumented)
    readonly design: HDLine;
    // (undocumented)
    readonly natal: HDLine;
}

// @public (undocumented)
export type HDType = 'Generator' | 'Manifesting Generator' | 'Manifestor' | 'Projector' | 'Reflector';

// @public (undocumented)
export interface Hexagram {
    // (undocumented)
    readonly lines: Array<YinYang>;
    // (undocumented)
    readonly num: number;
    // (undocumented)
    readonly ord: number;
}

// Warning: (ae-internal-missing-underscore) The name "Measurement" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal (undocumented)
export type Measurement = Record<string, number>;

// @public (undocumented)
export type Motor = 'root' | 'sacral' | 'will' | 'esp';

// @public (undocumented)
export interface ObjectSpeed {
    // (undocumented)
    'distance': Scientific;
    // (undocumented)
    'lat': Scientific;
    // (undocumented)
    'lng': Scientific;
}

// Warning: (ae-incompatible-release-tags) The symbol "Offset" is marked as @public, but its signature references "Measurement" which is marked as @internal
//
// @public (undocumented)
export interface Offset extends Measurement {
    // (undocumented)
    x: number;
    // (undocumented)
    y: number;
}

// @public (undocumented)
export type OffsetFrom = 'center' | 'topLeft';

// @public (undocumented)
export type Planet = 'sun' | 'earth' | 'moon' | 'northNode' | 'southNode' | 'mercury' | 'venus' | 'mars' | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto' | 'chiron';

// @public (undocumented)
export type PlanetRecord<T> = Record<Planet, T>;

// @public (undocumented)
export const polygons: CenterRecord<string>;

// @public (undocumented)
export class Position implements HDPos {
    constructor(lng: Angle, lat: SignedAngle, distance: Scientific, speed: ObjectSpeed, zodiac: Zodiac, zodiacLng: Angle);
    // (undocumented)
    readonly distance: Scientific;
    // (undocumented)
    get gate(): Gate;
    // (undocumented)
    readonly lat: SignedAngle;
    // (undocumented)
    get line(): HDLine;
    // (undocumented)
    readonly lng: Angle;
    // (undocumented)
    opposite(): Position;
    // (undocumented)
    readonly speed: ObjectSpeed;
    // (undocumented)
    readonly zodiac: Zodiac;
    // (undocumented)
    readonly zodiacLng: Angle;
}

// @public
export const roundedSquare: (size: Size, offset?: Offset, rotate?: Angle, offsetFrom?: OffsetFrom, radiusRatio?: number) => string;

// @public
export const roundedTriangle: (size: Size, offsetCenter?: Offset, rotate?: Angle, offsetFrom?: OffsetFrom, radiusRatio?: number) => string;

// @public (undocumented)
export interface Scientific {
    // (undocumented)
    'e': number;
    // (undocumented)
    'qty': number;
}

// @public (undocumented)
export interface SignedAngle {
    // (undocumented)
    'deg': number;
    // (undocumented)
    'min': number;
    // (undocumented)
    'sec': number;
    // (undocumented)
    'sign': number;
}

// Warning: (ae-incompatible-release-tags) The symbol "Size" is marked as @public, but its signature references "Measurement" which is marked as @internal
//
// @public (undocumented)
export interface Size extends Measurement {
    // (undocumented)
    height: number;
    // (undocumented)
    width: number;
}

// @public (undocumented)
export type WidthType = 'full' | 'half';

// @public (undocumented)
export const Yang: YinYang;

// @public (undocumented)
export const Yin: YinYang;

// @public (undocumented)
export interface YinYang {
    // (undocumented)
    other(): YinYang;
    // (undocumented)
    readonly yang: boolean;
    // (undocumented)
    readonly yin: boolean;
}

// @public (undocumented)
export type Zodiac = 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo' | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

// (No @packageDocumentation comment for this package)

```