import { Yin, Yang } from './YinYang'
import type { Hexagram } from './types'

/**
 * @internal
 */
export const hexagrams: Array<Hexagram> = [
    { num: 2, lines: [Yin, Yin, Yin, Yin, Yin, Yin] },
    { num: 23, lines: [Yang, Yin, Yin, Yin, Yin, Yin] },
    { num: 8, lines: [Yin, Yang, Yin, Yin, Yin, Yin] },
    { num: 20, lines: [Yang, Yang, Yin, Yin, Yin, Yin] },
    { num: 16, lines: [Yin, Yin, Yang, Yang, Yin, Yin] },
    { num: 35, lines: [Yang, Yin, Yang, Yin, Yin, Yin] },
    { num: 45, lines: [Yin, Yang, Yang, Yin, Yin, Yin] },
    { num: 12, lines: [Yang, Yang, Yang, Yin, Yin, Yin] },
    { num: 15, lines: [Yin, Yin, Yin, Yang, Yin, Yin] },
    { num: 52, lines: [Yang, Yin, Yin, Yang, Yin, Yin] },
    { num: 39, lines: [Yin, Yang, Yin, Yang, Yang, Yin] },
    { num: 53, lines: [Yang, Yang, Yin, Yang, Yin, Yin] },
    { num: 62, lines: [Yin, Yin, Yang, Yang, Yin, Yin] },
    { num: 56, lines: [Yang, Yin, Yang, Yang, Yin, Yin] },
    { num: 31, lines: [Yin, Yang, Yang, Yang, Yin, Yin] },
    { num: 33, lines: [Yang, Yang, Yang, Yang, Yin, Yin] },
    { num: 7, lines: [Yin, Yin, Yin, Yin, Yang, Yin] },
    { num: 4, lines: [Yang, Yin, Yin, Yin, Yang, Yin] },
    { num: 29, lines: [Yin, Yang, Yin, Yin, Yang, Yin] },
    { num: 59, lines: [Yang, Yang, Yin, Yin, Yang, Yin] },
    { num: 40, lines: [Yin, Yin, Yang, Yin, Yang, Yin] },
    { num: 64, lines: [Yang, Yin, Yang, Yin, Yang, Yin] },
    { num: 47, lines: [Yin, Yang, Yang, Yin, Yang, Yin] },
    { num: 6, lines: [Yang, Yang, Yang, Yin, Yang, Yin] },
    { num: 46, lines: [Yin, Yin, Yin, Yang, Yang, Yin] },
    { num: 18, lines: [Yang, Yin, Yin, Yang, Yang, Yin] },
    { num: 48, lines: [Yin, Yang, Yin, Yang, Yang, Yin] },
    { num: 57, lines: [Yang, Yang, Yin, Yang, Yang, Yin] },
    { num: 32, lines: [Yin, Yin, Yang, Yang, Yang, Yin] },
    { num: 50, lines: [Yang, Yin, Yang, Yang, Yang, Yin] },
    { num: 28, lines: [Yin, Yang, Yang, Yang, Yang, Yin] },
    { num: 44, lines: [Yang, Yang, Yang, Yang, Yang, Yin] },
    { num: 1, lines: [Yang, Yang, Yang, Yang, Yang, Yang] },
    { num: 43, lines: [Yin, Yang, Yang, Yang, Yang, Yang] },
    { num: 14, lines: [Yang, Yin, Yang, Yang, Yang, Yang] },
    { num: 34, lines: [Yin, Yin, Yang, Yang, Yang, Yang] },
    { num: 9, lines: [Yang, Yang, Yin, Yang, Yang, Yang] },
    { num: 5, lines: [Yin, Yang, Yin, Yang, Yang, Yang] },
    { num: 26, lines: [Yang, Yin, Yin, Yang, Yang, Yang] },
    { num: 11, lines: [Yin, Yin, Yin, Yang, Yang, Yang] },
    { num: 10, lines: [Yang, Yang, Yang, Yin, Yang, Yang] },
    { num: 58, lines: [Yin, Yang, Yang, Yin, Yang, Yang] },
    { num: 38, lines: [Yang, Yin, Yang, Yin, Yang, Yang] },
    { num: 54, lines: [Yin, Yin, Yang, Yin, Yang, Yang] },
    { num: 61, lines: [Yang, Yang, Yin, Yin, Yang, Yang] },
    { num: 60, lines: [Yin, Yang, Yin, Yin, Yang, Yang] },
    { num: 41, lines: [Yang, Yin, Yin, Yin, Yang, Yang] },
    { num: 19, lines: [Yin, Yin, Yin, Yin, Yang, Yang] },
    { num: 13, lines: [Yang, Yang, Yang, Yang, Yin, Yang] },
    { num: 49, lines: [Yin, Yang, Yang, Yang, Yin, Yang] },
    { num: 30, lines: [Yang, Yin, Yang, Yang, Yin, Yang] },
    { num: 55, lines: [Yin, Yin, Yang, Yang, Yin, Yang] },
    { num: 37, lines: [Yang, Yang, Yin, Yang, Yin, Yang] },
    { num: 63, lines: [Yin, Yang, Yin, Yang, Yin, Yang] },
    { num: 22, lines: [Yang, Yin, Yin, Yang, Yin, Yang] },
    { num: 36, lines: [Yin, Yin, Yin, Yang, Yin, Yang] },
    { num: 25, lines: [Yang, Yang, Yang, Yin, Yin, Yang] },
    { num: 17, lines: [Yin, Yang, Yang, Yin, Yin, Yang] },
    { num: 21, lines: [Yang, Yin, Yang, Yin, Yin, Yang] },
    { num: 51, lines: [Yin, Yin, Yang, Yin, Yin, Yang] },
    { num: 42, lines: [Yang, Yang, Yin, Yin, Yin, Yang] },
    { num: 3, lines: [Yin, Yang, Yin, Yin, Yin, Yang] },
    { num: 27, lines: [Yang, Yin, Yin, Yin, Yin, Yang] },
    { num: 24, lines: [Yin, Yin, Yin, Yin, Yin, Yang] },
].map((it, idx) => ({ ...it, ord: idx }))

/**
 * @internal
 * @param num -  Hexagram number (one-based)
 * @returns The corresponding Hexagram object
 */
export function getHexagramByNumber(num: number): Hexagram {
    return hexagrams[hexPositionMap[num - 1]]
}

const hexPositionMap = hexagrams.sort((a, b) => a.num - b.num).map(it => it.ord)
