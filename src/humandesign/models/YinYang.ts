import type { YinYang } from './types'

/**
 * @public
 */
export const Yin: YinYang = {
    yin: true,
    yang: false,
    other() {
        return Yang
    },
}

/**
 * @public
 */
export const Yang: YinYang = {
    yin: false,
    yang: true,
    other() {
        return Yin
    },
}
