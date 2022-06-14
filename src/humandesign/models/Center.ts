import { type CenterMap, Center } from "./types"

const centerFn: CenterMap<Center> = {
    head: Center.Head,
    ajna: Center.Ajna,
    throat: Center.Throat,
    identity: Center.Identity,
    sacral: Center.Sacral,
    root: Center.Root,
    spleen: Center.Spleen,
    will: Center.Will,
    esp: Center.ESP
}

export function mapCenters<T, U>(fn: (val: T) => U, map: CenterMap<T>) : CenterMap<U> {
    return {
        head: fn(map.head),
        ajna: fn(map.ajna),
        throat: fn(map.throat),
        identity: fn(map.identity),
        sacral: fn(map.sacral),
        root: fn(map.root),
        spleen: fn(map.spleen),
        will: fn(map.will),
        esp: fn(map.esp),
    }
}
