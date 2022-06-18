import { toPairs } from 'ramda'
import type { IPlanetMap } from './types'

export class PlanetMap<T> implements IPlanetMap<T> {
    [zodiac: string]: T
    constructor(data: IPlanetMap<T>) {
        Object.assign(this, data)
    }
    sun!: T
    earth!: T
    moon!: T
    northNode!: T
    southNode!: T
    mercury!: T
    venus!: T
    mars!: T
    jupiter!: T
    saturn!: T
    chiron!: T
    uranus!: T
    neptune!: T
    pluto!: T
}

/**
 *
 * @returns the values for planets + pluto, excluding asteroids (chiron)
 */
export const standardPlanets = <T>(map: PlanetMap<T>) =>
    toPairs(map)
        .filter(it => it[0] !== 'chiron')
        .map(it => it[1])

export function mapPlanets<T, U>(from: PlanetMap<T>, transform: (val: T) => U): PlanetMap<U> {
    return new PlanetMap<U>({
        sun: transform(from.sun),
        earth: transform(from.earth),
        moon: transform(from.moon),
        northNode: transform(from.northNode),
        southNode: transform(from.southNode),
        mercury: transform(from.mercury),
        venus: transform(from.venus),
        mars: transform(from.mars),
        jupiter: transform(from.jupiter),
        saturn: transform(from.saturn),
        chiron: transform(from.chiron),
        uranus: transform(from.uranus),
        neptune: transform(from.neptune),
        pluto: transform(from.pluto),
    })
}
