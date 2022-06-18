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
import { flatten, any, concat } from 'ramda'
import {
    Authority,
    Center,
    centerMap,
    Connectivity,
    DefState,
    gates as allGates,
    gatesByCenter,
    HDType,
} from './models/all'
import type { Gate } from './models/all'
import { unionFind, toConnectedGroups, findPath } from 'union-find-ts'
import type { UnionFind } from 'union-find-ts/lib/src/UnionFind'
import { Nothing } from 'purify-ts'

const gateNum = ({ num }: Gate) => num

/**
 *
 * @param gates List of the gates in the chart
 * @returns
 */
export function buildBodyGraph(gates: Gate[]): UnionFind<Gate> {
    const gateNumbers: Set<number> = new Set(gates.map(it => it.num))
    const defined = gateNumbers.has.bind(gateNumbers)
    return unionFind(
        allGates(),
        gateNum,
        /**
         * This is where we define which gates each one is connected to.
         * Each gate is connected to the other items on its center,
         * as well as the channel connection.
         * @param param0
         * @returns
         */
        ({ item: gate }) => [...gate.connected, ...gatesByCenter[gate.center].map(gateNum)].filter(defined)
    )
}

const defState = (defined: boolean) => (defined ? DefState.Defined : DefState.Undefined)

/**
 * Determine the connectivity information for the body graph described by the list of gates.
 * @param gates
 */
export function connectivity(gates: Gate[]): Connectivity {
    const uf: UnionFind<Gate> = buildBodyGraph(gates)
    // First clean groups to remove groups connected only within one center.
    // Keep if any two gates in the component are on different centers.
    // That implies that there is at least one channel.
    const groups = toConnectedGroups(uf)
        .filter(([{ center: head }, ...tail]) => any(({ center }) => center !== head, tail))
        .sort((left, right) => right.length - left.length)
    // Choose the unique centers associated with each group.
    const components = groups.map(gates =>
        gates.reduce((acc, { center }) => (center in acc ? acc : [center, ...acc]), [] as Center[])
    )
    const _allGates = allGates()
    const findItemsByNum = (nums: number[]) =>
        nums.map(it => _allGates.find(g => g.num === it) ?? _allGates[0])
    const definedCenters = flatten(components)
    const rank = groups.length
    const solutions =
        rank !== 2
            ? Nothing
            : findPath(
                  uf,
                  item => concat(findItemsByNum(item.connected), gatesByCenter[item.center.toString()]),
                  groups[1][0],
                  groups[0][0]
              )

    return {
        rank,
        components,
        centers: centerMap(center => defState(center in definedCenters)),
        authority: findAuthority(components),
        type: findHDType(components),
        solutions,
    }
}

/**
 *
 * @param centers A list of lists of centers
 * @returns A list of the centers that were not alone in their group.
 */
const definedCenters = (centers: Center[][]) => new Set(flatten(centers.filter(it => it.length > 1)))

function findAuthority(centers: Center[][]): Authority
function findAuthority(centers: Center[][], defined: Set<Center> = definedCenters(centers)): Authority {
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
function findHDType(centers: Center[][], defined: Set<Center> = definedCenters(centers)): HDType {
    if (defined.size == 0) {
        return HDType.Reflector
    }
    if (Center.Throat in defined) {
        const group = centers.find(it => Center.Throat in it) ?? []
        if (motors.find(it => it in group)) {
            return Center.Sacral in defined ? HDType.MGenerator : HDType.Manifestor
        }
    }
    return Center.Sacral in defined ? HDType.Generator : HDType.Projector
}
