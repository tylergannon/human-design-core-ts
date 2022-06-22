import { concat, mapObjIndexed, toPairs, uniq } from 'ramda'

import type { HDChart } from '../../astro'
import type { Chart, GateNum, HDPos, GateDefType, GateRecord, PlanetRecord, BirthChart } from './types'

import { connectivity as chartConnectivity } from './Connectivity'
import { fromApi as chartFromApi } from './Chart'
import { gates } from './Gate'

const notChiron = <T>(data: PlanetRecord<T>): T[] =>
    toPairs(data)
        .filter(it => it[0] !== 'chiron')
        .map(it => it[1])

const allGates = (natal: Chart, design: Chart): GateRecord<GateDefType> => {
    const toSet = (x: PlanetRecord<HDPos>) => new Set(notChiron(x).map(it => it.gate))
    const definedNatal = toSet(natal.planets)
    const definedDesign = toSet(design.planets)

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

const findDefinedGates = (natal: Chart, design: Chart): GateNum[] => {
    return uniq(concat(notChiron(natal.planets), notChiron(design.planets)).map(it => it.gate))
}

/**
 * @internal
 * Build a BirthChart object from the structure given by the API client.
 */
export const fromApi = (hdChart: HDChart): BirthChart => {
    const natal = chartFromApi(hdChart.natal)
    const design = chartFromApi(hdChart.design)
    const definedGates = findDefinedGates(natal, design)
    return {
        natal,
        design,
        allGates: allGates(natal, design),
        definedGates,
        connectivity: chartConnectivity(definedGates),
    }
}
