import { Zodiac } from './types'

// type ZodiacNames =
//     | 'Aries'
//     | 'Taurus'
//     | 'Gemini'
//     | 'Cancer'
//     | 'Leo'
//     | 'Virgo'
//     | 'Libra'
//     | 'Scorpio'
//     | 'Sagittarius'
//     | 'Capricorn'
//     | 'Aquarius'
//     | 'Pisces'

// const ZodiacNames = [
//     'Aries',
//     'Taurus',
//     'Gemini',
//     'Cancer',
//     'Leo',
//     'Virgo',
//     'Libra',
//     'Scorpio',
//     'Sagittarius',
//     'Capricorn',
//     'Aquarius',
//     'Pisces',
// ]

// const ZodiacOrdinals = ZodiacNames.reduce(
//     (acc, name) => ({ ...acc, [name]: ZodiacNames.indexOf(name) }),
//     {} as Record<string, number>
// )

export const ZodiacArray = [
    Zodiac.Aries,
    Zodiac.Taurus,
    Zodiac.Gemini,
    Zodiac.Cancer,
    Zodiac.Leo,
    Zodiac.Virgo,
    Zodiac.Libra,
    Zodiac.Scorpio,
    Zodiac.Sagittarius,
    Zodiac.Capricorn,
    Zodiac.Aquarius,
    Zodiac.Pisces,
]

export function opposite(zodiac: Zodiac): Zodiac {
    return ZodiacArray[(ZodiacArray.indexOf(zodiac) + 6) % 12]
}
