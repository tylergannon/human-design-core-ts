
enum Planet {
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

interface IPlanetMap<T> {
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
}

class PlanetMap<T> implements IPlanetMap<T> {
    constructor(data: IPlanetMap<T>) {
        Object.assign(this, data)
    }
    sun!: T;
    earth!: T;
    moon!: T;
    northNode!: T;
    southNode!: T;
    mercury!: T;
    venus!: T;
    mars!: T;
    jupiter!: T;
    saturn!: T;
    chiron!: T;
    uranus!: T;
    neptune!: T;
    pluto!: T;
}

function mapPlanets<T, U>(from: PlanetMap<T>, transform: (val: T)=>U): PlanetMap<U> {
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

export { Planet }