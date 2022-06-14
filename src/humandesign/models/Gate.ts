import { Center, type Gate } from './types'
import { Angle } from './Angle'
import { toAngle } from './ZodiacAngle'
import { Zodiac } from './types'

const gate41Angle = toAngle({ zodiac: Zodiac.Aquarius, angle: Angle.of(2)})

const lineArc = Angle.of(0, 56, 15)
const gateArc = lineArc.times(6)

function gateAngle(ord: number): Angle {
    return gate41Angle.plus(gateArc.times(ord))
}

export function angleToGate(angle: Angle): Gate {
    return gates[~~(angle.minus(gate41Angle).div(gateArc))]
}

export const gates: Gate[] = [
    { num: 41, center: Center.Root, connected: [0], ord: 0, angle: gateAngle(0) },
    { num: 19, center: Center.Root, connected: [49], ord: 1, angle: gateAngle(1) },
    { num: 13, center: Center.Identity, connected: [33], ord: 2, angle: gateAngle(2) },
    { num: 49, center: Center.ESP, connected: [19], ord: 3, angle: gateAngle(3) },
    { num: 30, center: Center.ESP, connected: [41], ord: 4, angle: gateAngle(4) },
    { num: 55, center: Center.ESP, connected: [39], ord: 5, angle: gateAngle(5) },
    { num: 37, center: Center.ESP, connected: [40], ord: 6, angle: gateAngle(6) },
    { num: 63, center: Center.Head, connected: [4], ord: 7, angle: gateAngle(7) },
    { num: 22, center: Center.ESP, connected: [12], ord: 8, angle: gateAngle(8) },
    { num: 36, center: Center.ESP, connected: [35], ord: 9, angle: gateAngle(9) },
    { num: 25, center: Center.Identity, connected: [51], ord: 10, angle: gateAngle(10) },
    { num: 17, center: Center.Ajna, connected: [62], ord: 11, angle: gateAngle(11) },
    { num: 21, center: Center.Will, connected: [45], ord: 12, angle: gateAngle(12) },
    { num: 51, center: Center.Will, connected: [26], ord: 13, angle: gateAngle(13) },
    { num: 42, center: Center.Sacral, connected: [53], ord: 14, angle: gateAngle(14) },
    { num: 3, center: Center.Sacral, connected: [60], ord: 15, angle: gateAngle(15) },
    { num: 27, center: Center.Sacral, connected: [50], ord: 16, angle: gateAngle(16) },
    { num: 24, center: Center.Ajna, connected: [61], ord: 17, angle: gateAngle(17) },
    { num: 2, center: Center.Identity, connected: [14], ord: 18, angle: gateAngle(18) },
    { num: 23, center: Center.Throat, connected: [43], ord: 19, angle: gateAngle(19) },
    { num: 8, center: Center.Throat, connected: [1], ord: 20, angle: gateAngle(20) },
    { num: 20, center: Center.Throat, connected: [10, 57, 34], ord: 21, angle: gateAngle(21) },
    { num: 16, center: Center.Throat, connected: [48], ord: 22, angle: gateAngle(22) },
    { num: 35, center: Center.Throat, connected: [36], ord: 23, angle: gateAngle(23) },
    { num: 45, center: Center.Throat, connected: [21], ord: 24, angle: gateAngle(24) },
    { num: 12, center: Center.Throat, connected: [22], ord: 25, angle: gateAngle(25) },
    { num: 15, center: Center.Identity, connected: [5], ord: 26, angle: gateAngle(26) },
    { num: 52, center: Center.Root, connected: [9], ord: 27, angle: gateAngle(27) },
    { num: 39, center: Center.Root, connected: [55], ord: 28, angle: gateAngle(28) },
    { num: 53, center: Center.Root, connected: [42], ord: 29, angle: gateAngle(29) },
    { num: 62, center: Center.Throat, connected: [17], ord: 30, angle: gateAngle(30) },
    { num: 56, center: Center.Throat, connected: [11], ord: 31, angle: gateAngle(31) },
    { num: 31, center: Center.Throat, connected: [7], ord: 32, angle: gateAngle(32) },
    { num: 33, center: Center.Throat, connected: [13], ord: 33, angle: gateAngle(33) },
    { num: 7, center: Center.Identity, connected: [31], ord: 34, angle: gateAngle(34) },
    { num: 4, center: Center.Ajna, connected: [63], ord: 35, angle: gateAngle(35) },
    { num: 29, center: Center.Sacral, connected: [46], ord: 36, angle: gateAngle(36) },
    { num: 59, center: Center.Sacral, connected: [6], ord: 37, angle: gateAngle(37) },
    { num: 40, center: Center.Will, connected: [37], ord: 38, angle: gateAngle(38) },
    { num: 64, center: Center.Head, connected: [47], ord: 39, angle: gateAngle(39) },
    { num: 47, center: Center.Ajna, connected: [64], ord: 40, angle: gateAngle(40) },
    { num: 6, center: Center.ESP, connected: [59], ord: 41, angle: gateAngle(41) },
    { num: 46, center: Center.Identity, connected: [29], ord: 42, angle: gateAngle(42) },
    { num: 18, center: Center.Spleen, connected: [58], ord: 43, angle: gateAngle(43) },
    { num: 48, center: Center.Spleen, connected: [16], ord: 44, angle: gateAngle(44) },
    { num: 57, center: Center.Spleen, connected: [34, 10, 20], ord: 45, angle: gateAngle(45) },
    { num: 32, center: Center.Spleen, connected: [54], ord: 46, angle: gateAngle(46) },
    { num: 50, center: Center.Spleen, connected: [27], ord: 47, angle: gateAngle(47) },
    { num: 28, center: Center.Spleen, connected: [36], ord: 48, angle: gateAngle(48) },
    { num: 44, center: Center.Spleen, connected: [26], ord: 49, angle: gateAngle(49) },
    { num: 1, center: Center.Identity, connected: [8], ord: 50, angle: gateAngle(50) },
    { num: 43, center: Center.Ajna, connected: [23], ord: 51, angle: gateAngle(51) },
    { num: 14, center: Center.Sacral, connected: [2], ord: 52, angle: gateAngle(52) },
    { num: 34, center: Center.Sacral, connected: [57, 10, 20], ord: 53, angle: gateAngle(53) },
    { num: 9, center: Center.Sacral, connected: [52], ord: 54, angle: gateAngle(54) },
    { num: 5, center: Center.Sacral, connected: [15], ord: 55, angle: gateAngle(55) },
    { num: 26, center: Center.Will, connected: [44], ord: 56, angle: gateAngle(56) },
    { num: 11, center: Center.Ajna, connected: [56], ord: 57, angle: gateAngle(57) },
    { num: 10, center: Center.Identity, connected: [20, 57, 34], ord: 58, angle: gateAngle(58) },
    { num: 58, center: Center.Root, connected: [18], ord: 59, angle: gateAngle(59) },
    { num: 38, center: Center.Root, connected: [28], ord: 60, angle: gateAngle(60) },
    { num: 54, center: Center.Root, connected: [32], ord: 61, angle: gateAngle(61) },
    { num: 61, center: Center.Head, connected: [24], ord: 62, angle: gateAngle(62) },
    { num: 60, center: Center.Root, connected: [3], ord: 63, angle: gateAngle(63) },
]

const gateNumbers = gates.sort((left, right) => left.num - right.num).map(it => it.ord)

const centerValues: Center[] = [0, 1, 2, 3, 4, 5, 6, 7, 8]

/**
 * Return the gate by gave number.
 * @param num Gate number
 * @returns Gate
 */
export function byNumber(num: number) : Gate {
    return gates[gateNumbers[num]]
}


function centerMap <T> (fn: (center: Center)=> T) : Array<T> {
    return centerValues.map(fn)
}

export const gatesByCenter = gates.reduce( (acc, gate) => {
    acc[gate.center].push(gate)
    return acc
} , centerMap(it => ([] as Array<Gate>)))
