import type { HDChart } from '../../astro'
import { Chart } from './Chart'

export class BirthChart {
    natal: Chart
    design: Chart

    constructor(natal: Chart, design: Chart) {
        this.design = design
        this.natal = natal
    }

    static fromApi(hdChart: HDChart): BirthChart {
        return new BirthChart(Chart.fromApi(hdChart.natal), Chart.fromApi(hdChart.design))
    }
}
