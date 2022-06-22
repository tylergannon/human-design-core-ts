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
import { flatten, any, concat, values, uniq, lift } from 'ramda'
import { Nothing } from 'purify-ts'

import { unionFind, toConnectedGroups, findPath } from 'union-find-ts'
import type { UnionFind, Linker } from 'union-find-ts'

import type {
    Authority,
    Gate,
    Center,
    CenterRecord,
    Connectivity,
    DefState,
    HDType,
    Motor,
    GateNum,
} from './types'
import { centerRecord, motorNames } from './types'
import { byGateNum, gates as allGates, gatesByCenter } from './Gate'

const gateNum = ({ num }: Gate) => num

/**
 * @internal
 * @param gates -  List of the gates in the chart
 * @returns
 */
export function buildBodyGraph(gates: GateNum[]): UnionFind<GateNum> {
    const gateNumbers: Set<GateNum> = new Set(gates)

    return unionFind(
        values(allGates()).map(it => it.num),
        num => parseInt(num),
        linker(gateNumbers.has.bind(gateNumbers))
    )
}

export const linker =
    (defined: (num: GateNum) => boolean): Linker<GateNum> =>
    gateNum => {
        const gate = byGateNum(gateNum)
        if (!defined(gateNum)) {
            return []
        }
        const candidates = concat(
            gate.connected,
            gatesByCenter[gate.center].map(it => it.num)
        ).filter(it => it !== gateNum)

        return candidates.filter(defined)
    }

const defState = (defined: boolean): DefState => (defined ? 'defined' : 'undefined')

/**
 * @public
 * Determine the connectivity information for the body graph described by the list of gates.
 * @param gates -
 */
export function connectivity(gates: GateNum[]): Connectivity {
    const uf: UnionFind<GateNum> = buildBodyGraph(gates)
    const findItemsByNum = lift(byGateNum)

    // First clean groups to remove groups connected only within one center.
    // Keep if any two gates in the component are on different centers.
    // That implies that there is at least one channel.
    const groups = toConnectedGroups(uf)
        .filter(group => uniq(findItemsByNum(group).map(({ center }) => center)).length > 1)
        .sort((left, right) => right.length - left.length)

    // Choose the unique centers associated with each group.
    const components = groups
        .map(gates =>
            gates
                .map(byGateNum)
                .reduce((acc, { center }) => (center in acc ? acc : [center, ...acc]), [] as Center[])
        )
        .map(it => uniq(it))

    const rank = groups.length
    const solutions =
        rank !== 2
            ? Nothing
            : findPath(
                  uf,
                  item =>
                      concat(
                          findItemsByNum(byGateNum(item).connected),
                          gatesByCenter[byGateNum(item).center]
                      ).map(gateNum),
                  groups[1][0],
                  groups[0][0]
              )

    const definedCenters = new Set(flatten(components))
    const centers = centerRecord(center => defState(definedCenters.has(center)))

    return {
        rank,
        components,
        centers,
        authority: findAuthority(centers),
        type: findHDType(components),
        solutions,
    }
}

function findAuthority(defined: CenterRecord<DefState>): Authority {
    if (defined.esp === 'defined') return 'emotional'
    if (defined.sacral === 'defined') return 'sacral'
    if (defined.spleen === 'defined') return 'splenic'
    if (defined.will === 'defined') return 'ego'
    if (defined.identity === 'defined') return 'self'
    if (defined.ajna === 'defined') return 'mental'
    return 'noAuthority'
}

const isMotor = (center: Center): center is Motor => {
    return center in motorNames
}

/**
 * Root, Sacral, Will, ESP
 * @param centers -
 * @param defined -
 * @returns
 */
function findHDType(centers: Center[][]): HDType {
    const generator: boolean = any(c => c.includes('sacral'), centers)

    if (centers.length == 0) {
        return 'Reflector'
    }
    const groupWithThroat = centers.find(group => group.includes('throat'))
    if (groupWithThroat && any(isMotor, groupWithThroat)) {
        return generator ? 'Manifesting Generator' : 'Manifestor'
    }
    return generator ? 'Generator' : 'Projector'
}
