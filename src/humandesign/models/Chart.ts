import type { ChartDate, Chart as ApiChart, Position as ApiPosition } from '$astro'
import { HDPos, Planet, planetRecord, PlanetRecord } from './types'
import { Position } from './Position'

function apiChartPlanets(chart: ApiChart): PlanetRecord<Position> {
    return {
        sun: Position.fromApi(chart.sun),
        earth: Position.fromApi(chart.sun).opposite(),
        northNode: Position.fromApi(chart.north_node),
        southNode: Position.fromApi(chart.north_node).opposite(),
        moon: Position.fromApi(chart.moon),
        mercury: Position.fromApi(chart.mercury),
        venus: Position.fromApi(chart.venus),
        mars: Position.fromApi(chart.mars),
        jupiter: Position.fromApi(chart.jupiter),
        saturn: Position.fromApi(chart.saturn),
        uranus: Position.fromApi(chart.uranus),
        neptune: Position.fromApi(chart.neptune),
        pluto: Position.fromApi(chart.pluto),
        chiron: Position.fromApi(chart.chiron),
    }
}
export class Chart {
    readonly chartDate: ChartDate
    readonly planets: PlanetRecord<HDPos>

    constructor(chartDate: ChartDate, planets: PlanetRecord<Position>) {
        this.chartDate = chartDate
        this.planets = planets
    }

    static fromApi(apiResult: ApiChart): Chart {
        return new Chart(apiResult.chart_date, apiChartPlanets(apiResult))
    }
}
