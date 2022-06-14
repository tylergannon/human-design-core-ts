/**
 * What does this thing need to give?
 * 
 * - Answer whether the throat is connected to a motor.
 * - How many groups of connected centers are there.
 * - If disconnected, shortest path(s) to connecting.
 * - If a generator, which type (Emotional, etc...)
 * - A grouping of connected centers.  For my chart, that would return:
 *   [
 *      ["Ajna", "Throat"], 
 *      ["Sacral", "Rood"]
 *   ]
 * 
 * What input data is required?
 * 
 * - Primarily:
 *   - A graph that shows the connectivity between all gates.
 *   - A list of the gates activated in the chart.
 * 
 */
import { flatten } from 'ramda'
import { AllCenters, Authority, byNumber, Center, gates as allGates, gatesByCenter, HDType } from "./models/all"
import type { Gate } from "./models/all"


/**
 * 
 * @param gates List of the gates in the chart
 * @returns 
 */
function chartGroupings(gates: Gate[]) : UnionFind;
function chartGroupings(
    gates: Gate[],
    gateNumbers: Set<number> = new Set(gates.map(it => it.num)),
    defined: (g: number)=>boolean = (g) => g in gateNumbers
) : UnionFind { 
    return gates.reduce(
        (uf, gate) => uf.link(
            gate.num,
            Object.assign( [],
                gate.connected,
                gatesByCenter[gate.center].map(it => it.num)
            ).filter(defined)
        ),
        new UnionFind(allGates.length+1)
    )
}

/**
 * 
 * @param centers A list of lists of centers
 * @returns A list of the centers that were not alone in their group.
 */
const definedCenters = (centers: Center[][]) => new Set(flatten(centers.filter(it => it.length > 1)))

function findAuthority(centers: Center[][]) : Authority;
function findAuthority(
    centers: Center[][],
    defined: Set<Center> = definedCenters(centers)
) : Authority {
    if (Center.ESP in defined) return Authority.Emotional
    if (Center.Sacral in defined) return Authority.Sacral
    if (Center.Spleen in defined) return Authority.Splenic
    if (Center.Will in defined) return Authority.Ego
    if (Center.Identity in defined) return Authority.Self
    if (Center.Ajna in defined) return Authority.Mental
    return Authority.NoAuthority
}

const motors = [Center.Root, Center.Will, Center.ESP, Center.Sacral]

/**
 * Root, Sacral, Will, ESP
 * @param centers 
 * @param defined 
 * @returns 
 */
function findHDType(
    centers: Center[][],
    defined: Set<Center> = definedCenters(centers)
) : HDType {
    if (defined.size == 0) {
        return HDType.Reflector
    }
    if (Center.Throat in defined) {
        const group = centers.find(it => Center.Throat in it)!
        if (!!motors.find(it => it in group)) {
            return (Center.Sacral in defined) ? HDType.MGenerator : HDType.Manifestor
        }
    }
    return (Center.Sacral in defined) ? HDType.Generator : HDType.Projector
}

/**
 * Get a list of groups of connected gates.
 * @param uf 
 * @returns a list of groups
 */
const gateGroups = (uf: UnionFind) => Object.values(
    groupBy(
        uf.find.bind(uf), 
        Array.from({length: 64}, (_, i) =>i+1 )
    )
)


const mapCenters = (gateGroups: number[][]) =>
    groupUnionFind(
        AllCenters,
        it => it,
        mapCentersToUF(gateGroups)
    )


/**
 * Receives the groups of gates returned from mapping the gates,
 * and returns a UnionFind representing the groupings of all centers.
 * @param gateGroups 
 * @returns 
 */
function mapCentersToUF(gateGroups: number[][]) : UnionFind {
    return gateGroups.reduce(
        (uf, group) => {
            const [first, ...rest] = new Set(group.map(it => byNumber(it).center))
            uf.link(first, rest)
            return uf
        }
        , new UnionFind(10)
    )
}

function groupUnionFind <T> (
    input: T[],
    key: (val: T) => number,
    uf: UnionFind
): T[][]  {
    return toArray(
        groupBy(
            (item) => uf.find(key(item))
            , input
        )
    )
}

const toArray = <T> (items: {[index: number]: T[]}) => 
    Object
        .entries(items)
        .map(([a, b]) => ({ord: parseInt(a), val: b}))
        .sort(({ord: ord1}, {ord: ord2}) => ord1 - ord2)
        .map(({val}) => val)

function groupBy <T> (grouper: (value: T)=>number, list: T[]): {[index: number]: T[]};
function groupBy <T> (grouper: (value: T)=>string, list: T[]): {[index: string]: T[]};
function groupBy <T> (grouper: (value: T)=>string|number, list: T[]): {[index: string|number]: T[]} {
    return list.map(
        it => ({ val: it, group: grouper(it)})
    ).reduce(
        (acc, {val, group}) => ( { ...acc, [group]: [ val, ...(acc[group] || []) ] } )
        , {} as {[idx: number|string]: T[]}
    )
}



class UnionFind {
    private roots: number[]
    private ranks: number[]


    public get length(): number {
        return this.roots.length
    }

    public get lastIndex(): number {
        return this.roots.length - 1
    }

    private makeSet() {
        this.roots.push(this.length)
        this.ranks.push(0)
    }

    find(x: number): number {
        var x0 = x
        var roots = this.roots;

        while (roots[x] !== x) {
            x = roots[x]
        }

        while (roots[x0] !== x) {
            var y = roots[x0]
            roots[x0] = x
            x0 = y
        }

        return x;
    }

    /**
     * Connect a node to one or more other nodes.
     * @param x node to connect.
     * @param y node or list of nodes to connect.
     * @returns 
     */
    link(x: number, y: number|number[]): UnionFind {
        if (typeof y === "number") {
            var xr = this.find(x)
                , yr = this.find(y);
            if (xr === yr) {
                return this;
            }
            var ranks = this.ranks
                , roots = this.roots
                , xd = ranks[xr]
                , yd = ranks[yr];
            if (xd < yd) {
                roots[xr] = yr;
            } else if (yd < xd) {
                roots[yr] = xr;
            } else {
                roots[yr] = xr;
                ++ranks[xr];
            }
        } else {
            y.forEach(it => this.link(x, y))
        }
        return this
    }

    constructor(size: number) {
        this.roots = [...Array(size + 1).keys()]
        this.ranks = Array(size + 1).fill(0)
    }
}

