import type { Chart as ApiChart } from '../../astro'
import type { Chart } from './types'
import { fromApi as positionFromApi, opposite } from './Position'

/**
 * @internal
 * @param apiResult -
 * @returns
 */
export const fromApi = ({ chart_date: chartDate, ascendant, ...chart }: ApiChart): Chart => {
    return {
        ascendant,
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
