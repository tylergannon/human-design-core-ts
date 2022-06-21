import type { ChartDate, Chart as ApiChart } from '../../astro'
import { HDPos, PlanetRecord } from './types'
import type { Position } from './Position'
import { fromApi as positionFromApi } from './Position'

function apiChartPlanets(chart: ApiChart): PlanetRecord<Position> {
    return {
        sun: positionFromApi(chart.sun),
        earth: positionFromApi(chart.sun).opposite(),
        northNode: positionFromApi(chart.north_node),
        southNode: positionFromApi(chart.north_node).opposite(),
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
    readonly planets: PlanetRecord<HDPos>

    constructor(chartDate: ChartDate, planets: PlanetRecord<Position>) {
        this.chartDate = chartDate
        this.planets = planets
    }
}

/**
 * @internal
 * @param apiResult
 * @returns
 */
export const fromApi = (apiResult: ApiChart): Chart => {
    return new Chart(apiResult.chart_date, apiChartPlanets(apiResult))
}
