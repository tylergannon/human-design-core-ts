import type { ChartDate, Chart as ApiChart } from '$lib/astro';
import type { IPlanetMap } from './types'
import { PlanetMap } from './PlanetMap';
import { Position } from './Position';

export class Chart {
    chartDate: ChartDate;
    planets: PlanetMap<Position>;

    constructor(chartDate: ChartDate, planets: IPlanetMap<Position>) {
        this.chartDate = chartDate
        this.planets = new PlanetMap(planets)
    }

    static fromApi(oldChart: ApiChart): Chart {
        let northNode = Position.fromApi(oldChart.northNode)
        let sun = Position.fromApi(oldChart.sun)
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
