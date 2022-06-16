import type { ChartDate, Chart as ApiChart } from '$astro'
import type { HDPos, IPlanetMap } from './types'
import { PlanetMap } from './PlanetMap'
import { Position } from './Position'

export class Chart {
    readonly chartDate: ChartDate
    readonly planets: PlanetMap<HDPos>

    constructor(chartDate: ChartDate, planets: IPlanetMap<Position>) {
        this.chartDate = chartDate
        this.planets = new PlanetMap(planets)
    }

    static fromApi(oldChart: ApiChart): Chart {
        const northNode = Position.fromApi(oldChart.northNode)
        const sun = Position.fromApi(oldChart.sun)
        return new Chart(oldChart.chartDate, {
            sun: sun,
            earth: sun.opposite(),
            moon: Position.fromApi(oldChart.moon),
            northNode: northNode,
            southNode: northNode.opposite(),
            mercury: Position.fromApi(oldChart.mercury),
            venus: Position.fromApi(oldChart.venus),
            mars: Position.fromApi(oldChart.mars),
            jupiter: Position.fromApi(oldChart.jupiter),
            saturn: Position.fromApi(oldChart.saturn),
            uranus: Position.fromApi(oldChart.uranus),
            neptune: Position.fromApi(oldChart.neptune),
            pluto: Position.fromApi(oldChart.pluto),
            chiron: Position.fromApi(oldChart.chiron),
        })
    }
}
