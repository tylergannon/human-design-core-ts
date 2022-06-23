import type { Chart as ApiChart, Zodiac as ApiZodiac } from '../../astro'
import type { Angle, Chart, Zodiac } from './types'
import { fromApi as positionFromApi, opposite } from './Position'

const toZodiac = (z: ApiZodiac): Zodiac => z.toLowerCase() as Zodiac

/**
 * @internal
 * @param apiResult -
 * @returns
 */
export const fromApi = ({
    chart_date: chartDate,
    ascendant: { lng, zodiac, zodiacLng },
    ...chart
}: ApiChart): Chart => {
    return {
        ascendant: {
            lng: lng as unknown as Angle,
            zodiac: toZodiac(zodiac),
            zodiacLng: zodiacLng as unknown as Angle,
        },
        chartDate,
        planets: {
            sun: positionFromApi(chart.sun),
            earth: opposite(positionFromApi(chart.sun)),
            northNode: positionFromApi(chart.north_node),
            southNode: opposite(positionFromApi(chart.north_node)),
            moon: positionFromApi(chart.moon),
            mercury: positionFromApi(chart.mercury),
            venus: positionFromApi(chart.venus),
            mars: positionFromApi(chart.mars),
            jupiter: positionFromApi(chart.jupiter),
            saturn: positionFromApi(chart.saturn),
            uranus: positionFromApi(chart.uranus),
            neptune: positionFromApi(chart.neptune),
            pluto: positionFromApi(chart.pluto),
            chiron: positionFromApi(chart.chiron),
        },
    }
}
