import type { ChartDate, Chart as ApiChart, Ascendant } from '../../astro'
import type { HDPos, PlanetRecord } from './types'
import { fromApi as positionFromApi, opposite } from './Position'

function apiChartPlanets(chart: ApiChart): PlanetRecord<HDPos> {
    return {
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
    }
}
/**
 * Represents the planetary positions on a given date/time.
 * @public
 */
export class Chart {
    readonly chartDate: ChartDate
    readonly ascendant: Ascendant
    readonly planets: PlanetRecord<HDPos>

    constructor(chartDate: ChartDate, ascendant: Ascendant, planets: PlanetRecord<HDPos>) {
        this.chartDate = chartDate
        this.ascendant = ascendant
        this.planets = planets
    }
}

/**
 * @internal
 * @param apiResult -
 * @returns
 */
export const fromApi = (apiResult: ApiChart): Chart => {
    return new Chart(apiResult.chart_date, apiResult.ascendant, apiChartPlanets(apiResult))
}
