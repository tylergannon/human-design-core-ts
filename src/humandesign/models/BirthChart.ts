import { concat, mapObjIndexed, toPairs, uniq } from 'ramda'

import type { HDChart } from '../../astro'
import type { Chart, GateNum, HDPos, GateDefType, GateRecord, PlanetRecord, Connectivity } from './types'

import { connectivity as chartConnectivity } from './Connectivity'
import { fromApi as chartFromApi } from './Chart'
import { gates } from './Gate'

const notChiron = <T>(data: PlanetRecord<T>): T[] =>
    toPairs(data)
        .filter(it => it[0] !== 'chiron')
        .map(it => it[1])

/**
 * The primary data structure for handling human design charts.
 * @public
 */
export class BirthChart {
    natal: Chart
    design: Chart

    /**
     * @public
     */
    public get definedGates(): GateNum[] {
        return uniq(concat(notChiron(this.natal.planets), notChiron(this.design.planets)).map(it => it.gate))
    }

    public get connectivity(): Connectivity {
        return chartConnectivity(this.definedGates)
    }

    /**
     * @public
     */
    public get allGates(): GateRecord<GateDefType> {
        const toSet = (x: PlanetRecord<HDPos>) => new Set(notChiron(x).map(it => it.gate))
        const definedNatal = toSet(this.natal.planets)
        const definedDesign = toSet(this.design.planets)

        return mapObjIndexed((_, gateNum): GateDefType => {
            return definedNatal.has(gateNum)
                ? definedDesign.has(gateNum)
                    ? 'both'
                    : 'natal'
                : definedDesign.has(gateNum)
                ? 'design'
                : 'undefined'
        }, gates())
    }

    /**
     * @public
     */
    constructor(natal: Chart, design: Chart) {
        this.design = design
        this.natal = natal
    }
}

/**
 * @internal
 * Build a BirthChart object from the structure given by the API client.
 */
export const fromApi = (hdChart: HDChart): BirthChart => {
    return new BirthChart(chartFromApi(hdChart.natal), chartFromApi(hdChart.design))
}
