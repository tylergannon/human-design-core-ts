import type { Angle, HDLine, Gate, CenterRecord, GateRecord, GateNum } from './types'
import * as angle from './Angle'
import { toAngle } from './ZodiacAngle'
import { groupBy, values } from 'ramda'
import { angleModulus, intDiv } from './arithmetic'

const gate41Angle = toAngle({ zodiac: 'aquarius', angle: angle.angle(2) })

const lineArc = angle.angle(0, 56, 15)
const gateArc = angle.multiply(lineArc, 6)
console.log(`Gate Arc: ${JSON.stringify(gateArc)}`)
const gateArcF = angle.toFloat(gateArc)
const lineArcF = angle.toFloat(lineArc)
const gate41F = angle.toFloat(gate41Angle)

/**
 * Gets the number of degrees from the start of gate 41.
 * @param a - an angle
 * @returns
 */
const normalizeF = (a: Angle) => angleModulus(angle.toFloat(a) - gate41F)

function gateAngle(ord: number): Angle {
    return angle.add(gate41Angle, angle.multiply(gateArc, ord))
}

/**
 * @internal
 * @param angle -
 * @returns
 */
export function getLine(angle: Angle): HDLine {
    return (1 + ~~((normalizeF(angle) % gateArcF) % lineArcF)).toString() as HDLine
}

/**
 * Returns the Gate corresponding to the longitudinal position of the given angle.
 * @internal
 * @param angle -
 * @returns
 */
export function angleToGate(a: Angle): GateNum {
    console.log(`The angle is ${angle.toFloat(a)}, normalized is ${normalizeF(a)} / ${gateArcF}
    gate41 is at ${gate41F}.  My guess is going to be ${ordinals[intDiv(normalizeF(a), gateArcF)]}
    the value is something like ~~[${normalizeF(a) / gateArcF}] == ${intDiv(normalizeF(a), gateArcF)}`)
    return ordinals[intDiv(normalizeF(a), gateArcF)]
}

/**
 * @public
 * @returns GateRecord mapping gate numbers to the Gate configuration object.
 */
export const gates: () => GateRecord<Gate> = () => ({ ...allGates })

const allGates: GateRecord<Gate> = {
    '41': {
        num: '41',
        center: 'root',
        connected: ['30'],
        ord: 0,
        angle: gateAngle(0),
    },
    '19': {
        num: '19',
        center: 'root',
        connected: ['49'],
        ord: 1,
        angle: gateAngle(1),
    },
    '13': {
        num: '13',
        center: 'identity',
        connected: ['33'],
        ord: 2,
        angle: gateAngle(2),
    },
    '49': {
        num: '49',
        center: 'esp',
        connected: ['19'],
        ord: 3,
        angle: gateAngle(3),
    },
    '30': {
        num: '30',
        center: 'esp',
        connected: ['41'],
        ord: 4,
        angle: gateAngle(4),
    },
    '55': {
        num: '55',
        center: 'esp',
        connected: ['39'],
        ord: 5,
        angle: gateAngle(5),
    },
    '37': {
        num: '37',
        center: 'esp',
        connected: ['40'],
        ord: 6,
        angle: gateAngle(6),
    },
    '63': {
        num: '63',
        center: 'head',
        connected: ['4'],
        ord: 7,
        angle: gateAngle(7),
    },
    '22': {
        num: '22',
        center: 'esp',
        connected: ['12'],
        ord: 8,
        angle: gateAngle(8),
    },
    '36': {
        num: '36',
        center: 'esp',
        connected: ['35'],
        ord: 9,
        angle: gateAngle(9),
    },
    '25': {
        num: '25',
        center: 'identity',
        connected: ['51'],
        ord: 10,
        angle: gateAngle(10),
    },
    '17': {
        num: '17',
        center: 'ajna',
        connected: ['62'],
        ord: 11,
        angle: gateAngle(11),
    },
    '21': {
        num: '21',
        center: 'will',
        connected: ['45'],
        ord: 12,
        angle: gateAngle(12),
    },
    '51': {
        num: '51',
        center: 'will',
        connected: ['25'],
        ord: 13,
        angle: gateAngle(13),
    },
    '42': {
        num: '42',
        center: 'sacral',
        connected: ['53'],
        ord: 14,
        angle: gateAngle(14),
    },
    '3': {
        num: '3',
        center: 'sacral',
        connected: ['60'],
        ord: 15,
        angle: gateAngle(15),
    },
    '27': {
        num: '27',
        center: 'sacral',
        connected: ['50'],
        ord: 16,
        angle: gateAngle(16),
    },
    '24': {
        num: '24',
        center: 'ajna',
        connected: ['61'],
        ord: 17,
        angle: gateAngle(17),
    },
    '2': {
        num: '2',
        center: 'identity',
        connected: ['14'],
        ord: 18,
        angle: gateAngle(18),
    },
    '23': {
        num: '23',
        center: 'throat',
        connected: ['43'],
        ord: 19,
        angle: gateAngle(19),
    },
    '8': {
        num: '8',
        center: 'throat',
        connected: ['1'],
        ord: 20,
        angle: gateAngle(20),
    },
    '20': {
        num: '20',
        center: 'throat',
        connected: ['10', '57', '34'],
        ord: 21,
        angle: gateAngle(21),
    },
    '16': {
        num: '16',
        center: 'throat',
        connected: ['48'],
        ord: 22,
        angle: gateAngle(22),
    },
    '35': {
        num: '35',
        center: 'throat',
        connected: ['36'],
        ord: 23,
        angle: gateAngle(23),
    },
    '45': {
        num: '45',
        center: 'throat',
        connected: ['21'],
        ord: 24,
        angle: gateAngle(24),
    },
    '12': {
        num: '12',
        center: 'throat',
        connected: ['22'],
        ord: 25,
        angle: gateAngle(25),
    },
    '15': {
        num: '15',
        center: 'identity',
        connected: ['5'],
        ord: 26,
        angle: gateAngle(26),
    },
    '52': {
        num: '52',
        center: 'root',
        connected: ['9'],
        ord: 27,
        angle: gateAngle(27),
    },
    '39': {
        num: '39',
        center: 'root',
        connected: ['55'],
        ord: 28,
        angle: gateAngle(28),
    },
    '53': {
        num: '53',
        center: 'root',
        connected: ['42'],
        ord: 29,
        angle: gateAngle(29),
    },
    '62': {
        num: '62',
        center: 'throat',
        connected: ['17'],
        ord: 30,
        angle: gateAngle(30),
    },
    '56': {
        num: '56',
        center: 'throat',
        connected: ['11'],
        ord: 31,
        angle: gateAngle(31),
    },
    '31': {
        num: '31',
        center: 'throat',
        connected: ['7'],
        ord: 32,
        angle: gateAngle(32),
    },
    '33': {
        num: '33',
        center: 'throat',
        connected: ['13'],
        ord: 33,
        angle: gateAngle(33),
    },
    '7': {
        num: '7',
        center: 'identity',
        connected: ['31'],
        ord: 34,
        angle: gateAngle(34),
    },
    '4': {
        num: '4',
        center: 'ajna',
        connected: ['63'],
        ord: 35,
        angle: gateAngle(35),
    },
    '29': {
        num: '29',
        center: 'sacral',
        connected: ['46'],
        ord: 36,
        angle: gateAngle(36),
    },
    '59': {
        num: '59',
        center: 'sacral',
        connected: ['6'],
        ord: 37,
        angle: gateAngle(37),
    },
    '40': {
        num: '40',
        center: 'will',
        connected: ['37'],
        ord: 38,
        angle: gateAngle(38),
    },
    '64': {
        num: '64',
        center: 'head',
        connected: ['47'],
        ord: 39,
        angle: gateAngle(39),
    },
    '47': {
        num: '47',
        center: 'ajna',
        connected: ['64'],
        ord: 40,
        angle: gateAngle(40),
    },
    '6': {
        num: '6',
        center: 'esp',
        connected: ['59'],
        ord: 41,
        angle: gateAngle(41),
    },
    '46': {
        num: '46',
        center: 'identity',
        connected: ['29'],
        ord: 42,
        angle: gateAngle(42),
    },
    '18': {
        num: '18',
        center: 'spleen',
        connected: ['58'],
        ord: 43,
        angle: gateAngle(43),
    },
    '48': {
        num: '48',
        center: 'spleen',
        connected: ['16'],
        ord: 44,
        angle: gateAngle(44),
    },
    '57': {
        num: '57',
        center: 'spleen',
        connected: ['34', '10', '20'],
        ord: 45,
        angle: gateAngle(45),
    },
    '32': {
        num: '32',
        center: 'spleen',
        connected: ['54'],
        ord: 46,
        angle: gateAngle(46),
    },
    '50': {
        num: '50',
        center: 'spleen',
        connected: ['27'],
        ord: 47,
        angle: gateAngle(47),
    },
    '28': {
        num: '28',
        center: 'spleen',
        connected: ['36'],
        ord: 48,
        angle: gateAngle(48),
    },
    '44': {
        num: '44',
        center: 'spleen',
        connected: ['26'],
        ord: 49,
        angle: gateAngle(49),
    },
    '1': {
        num: '1',
        center: 'identity',
        connected: ['8'],
        ord: 50,
        angle: gateAngle(50),
    },
    '43': {
        num: '43',
        center: 'ajna',
        connected: ['23'],
        ord: 51,
        angle: gateAngle(51),
    },
    '14': {
        num: '14',
        center: 'sacral',
        connected: ['2'],
        ord: 52,
        angle: gateAngle(52),
    },
    '34': {
        num: '34',
        center: 'sacral',
        connected: ['57', '10', '20'],
        ord: 53,
        angle: gateAngle(53),
    },
    '9': {
        num: '9',
        center: 'sacral',
        connected: ['52'],
        ord: 54,
        angle: gateAngle(54),
    },
    '5': {
        num: '5',
        center: 'sacral',
        connected: ['15'],
        ord: 55,
        angle: gateAngle(55),
    },
    '26': {
        num: '26',
        center: 'will',
        connected: ['44'],
        ord: 56,
        angle: gateAngle(56),
    },
    '11': {
        num: '11',
        center: 'ajna',
        connected: ['56'],
        ord: 57,
        angle: gateAngle(57),
    },
    '10': {
        num: '10',
        center: 'identity',
        connected: ['20', '57', '34'],
        ord: 58,
        angle: gateAngle(58),
    },
    '58': {
        num: '58',
        center: 'root',
        connected: ['18'],
        ord: 59,
        angle: gateAngle(59),
    },
    '38': {
        num: '38',
        center: 'root',
        connected: ['28'],
        ord: 60,
        angle: gateAngle(60),
    },
    '54': {
        num: '54',
        center: 'root',
        connected: ['32'],
        ord: 61,
        angle: gateAngle(61),
    },
    '61': {
        num: '61',
        center: 'head',
        connected: ['24'],
        ord: 62,
        angle: gateAngle(62),
    },
    '60': {
        num: '60',
        center: 'root',
        connected: ['3'],
        ord: 63,
        angle: gateAngle(63),
    },
}

/**
 * The gate numbers, ordered by their position in the sky.
 */
const ordinals: GateNum[] = values(allGates)
    .sort((left, right) => left.ord - right.ord)
    .map(({ num }) => num.toString() as GateNum)
console.log(ordinals)
/**
 * Return the gate by gate number.
 * @public
 * @param num -  Gate number
 * @returns Gate
 */
export function byNumber(num: number): Gate {
    if (num < 1 || num > 64) {
        throw new Error(`hm I got ${num}`)
    }
    return allGates[num.toString() as GateNum]
}

/**
 * Return the gate by gate number.
 * @public
 * @param num -  Gate number
 * @returns Gate
 */
export function byGateNum(num: GateNum): Gate {
    return allGates[num]
}

/**
 * Return the gate by gate number.
 * @public
 * @param num -  Gate number
 * @returns Gate
 */
export function byOrdinal(num: number): Gate {
    if (num < 0 || num > 63) {
        throw new Error(`hm I got ${num}`)
    }
    return allGates[ordinals[num]]
}

/**
 * Maps each center to the gates that are attached to it in the body graph.
 * @public
 */
export const gatesByCenter: CenterRecord<Gate[]> = groupBy(gate => gate.center, values(allGates))
