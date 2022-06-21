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
import { flatten, any, concat, values } from 'ramda'
import { centerRecord, GateNum, motorNames } from './models'
import { gates as allGates, gatesByCenter } from './models/Gate'
import type { Authority, Center, CenterRecord, Connectivity, DefState, HDType, Motor } from './models'
import type { Gate } from './models'
import { Nothing } from 'purify-ts'
import { unionFind, toConnectedGroups, findPath } from 'union-find-ts'
import type { UnionFind, Linker } from 'union-find-ts'

const gateNumStr = (gate: Gate) => parseInt(gateNum(gate))
const gateNum = ({ num }: Gate) => num

/**
 * @internal
 * @param gates List of the gates in the chart
 * @returns
 */
export function buildBodyGraph(gates: Gate[]): UnionFind<Gate> {
    const gateNumbers: Set<GateNum> = new Set(gates.map(it => it.num))
    const defined = gateNumbers.has.bind(gateNumbers)
    return unionFind(
        values(allGates()),
        gateNumStr,
        /**
         * This is where we define which gates each one is connected to.
         * Each gate is connected to the other items on its center,
         * as well as the channel connection.
         * @param param0
         * @returns
         */
        linker(defined)
    )
}

const linker =
    (defined: (num: GateNum) => boolean): Linker<Gate> =>
    ({ item: gate }) =>
        concat(
            gate.connected,
            gatesByCenter[gate.center].map(it => it.num)
        )
            .filter(defined)
            .map(parseInt)

const defState = (defined: boolean): DefState => (defined ? 'defined' : 'undefined')

/**
 * @public
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
    const findItemsByNum = (nums: GateNum[]) => nums.map(it => _allGates[it])
    const definedCenters = flatten(components)
    const rank = groups.length
    const solutions =
        rank !== 2
            ? Nothing
            : findPath(
                  uf,
                  item => concat(findItemsByNum(item.connected), gatesByCenter[item.center]),
                  groups[1][0],
                  groups[0][0]
              )

    return {
        rank,
        components,
        centers: centerRecord(center => defState(center in definedCenters)),
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
const definedCenters = (centers: Center[][]): CenterRecord<boolean> =>
    ((_centers: Center[]) => centerRecord(it => it in _centers))(flatten(centers.filter(it => it.length > 1)))

function findAuthority(centers: Center[][]): Authority
function findAuthority(
    centers: Center[][],
    defined: CenterRecord<boolean> = definedCenters(centers)
): Authority {
    if (defined.esp) return 'emotional'
    if (defined.sacral) return 'sacral'
    if (defined.spleen) return 'splenic'
    if (defined.will) return 'ego'
    if (defined.identity) return 'self'
    if (defined.ajna) return 'mental'
    return 'noAuthority'
}

const isMotor = (center: Center): center is Motor => {
    return center in motorNames
}

/**
 * Root, Sacral, Will, ESP
 * @param centers
 * @param defined
 * @returns
 */
function findHDType(centers: Center[][], defined: CenterRecord<boolean> = definedCenters(centers)): HDType {
    if (centers.length == 0) {
        return 'Reflector'
    }
    const groupWithThroat = centers.find(group => 'throat' in group)
    if (groupWithThroat && any(isMotor, groupWithThroat)) {
        return defined.sacral ? 'Manifesting Generator' : 'Generator'
    }
    return defined.sacral ? 'Generator' : 'Projector'
}
