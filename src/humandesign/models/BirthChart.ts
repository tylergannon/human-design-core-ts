import { connectivity as chartConnectivity } from '../Connectivity'
import { concat, mapObjIndexed, values } from 'ramda'
import type { HDChart } from '../../astro'
import { Chart, fromApi as chartFromApi } from './Chart'
import { gates } from './Gate'
import { Gate, HDPos, GateDefType, GateRecord, PlanetRecord, Connectivity } from './types'

const toGate = ({ gate }: HDPos) => gate

/**
 * @internal
 */
export type FromPlanets = {
    (chart: PlanetRecord<HDPos>): Partial<GateRecord<undefined>>
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const fromPlanets: FromPlanets = ({
    chiron: _,
    ...planets
}: PlanetRecord<HDPos>): Partial<GateRecord<undefined>> =>
    values(planets).reduce(
        (acc, { gate: { num } }) => ({ ...acc, [num]: undefined }),
        {} as Partial<GateRecord<undefined>>
    )
/* eslint-enable */

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
    public get definedGates(): Gate[] {
        return concat(values(this.natal.planets), values(this.design.planets)).map(toGate)
    }

    public get connectivity(): Connectivity {
        return chartConnectivity(this.definedGates)
    }

    /**
     * @public
     */
    public get allGates(): GateRecord<GateDefType> {
        const natal = fromPlanets(this.natal.planets)
        const design = fromPlanets(this.design.planets)

        return mapObjIndexed((_, gateNum): GateDefType => {
            return gateNum in natal
                ? gateNum in design
                    ? 'both'
                    : 'natal'
                : gateNum in design
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
