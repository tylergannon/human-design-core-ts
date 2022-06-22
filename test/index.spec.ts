import type { AxiosPromise } from 'axios'

import { Configuration, DefaultApiFp } from '$astro'
import type { HDChart } from '$astro'
import { AstroApiClient } from '../dist/human-design.es'
import { fromApi } from '$hd/models/BirthChart'

const apiKey = process.env.ASTROAPI_API_KEY!

const newApiClient = (authType: 'APIKeyQuery' | 'APIKeyCookie' | 'APIKeyHeader' = 'APIKeyQuery') =>
    DefaultApiFp(
        new Configuration({
            apiKey,
        })
    )

type ChartApiFn = typeof AstroApiClient.prototype.getChart
const cookieApiClient = () => newApiClient()

const callApi = (fn: ChartApiFn) => fn('America/Los_Angeles', '1978-04-07', '15:30', 36.6777, -121.6555)

export const cool = 1
const [tz, bd, time] = ['America/Los_Angeles', '1978-04-07', '15:30']

describe('Api Check April 07, 1978', () => {
    const birth = cookieApiClient().chartGet(tz, bd, time, 36.6777, -121.6555).then()
    const saturnReturn = cookieApiClient().saturnReturnGet(tz, bd, time, 36.6777, -121.6555)
    const uranus = cookieApiClient().uranusOppositionGet(tz, bd, time, 36.6777, -121.6555)

    it('It should be able to get a chart from the API.', async () => {
        const hd_chart = (await (await birth)().then(x => x)).data
        expect(hd_chart.natal.sun.zodiac).toBe('Aries')
        const borth = fromApi(hd_chart)
    })
    it('Should load saturn returns', async () => {
        const chart: AxiosPromise<HDChart> = (await saturnReturn)()
        return chart.then(value => {
            expect(value.data.natal.chart_date.date).toBe('2006-10-31')
        })
    })
    it('Should load Uranus', async () => {
        const chart: AxiosPromise<HDChart> = (await uranus)()
        return chart.then(response => {
            expect(response.data.natal.chart_date.date).toBe('2022-05-16')
        })
    })
})

describe('AstroApiClient', () => {
    const apiClient = (): ChartApiFn =>
        ((x: AstroApiClient) => x.getChart.bind(x))(new AstroApiClient(apiKey))
    it('can get the graph and connectivity', async () => {
        const graph = await callApi(apiClient())
        expect(graph.allGates[51]).toBe('natal')
        expect(graph.definedGates).toHaveLength(17)
        // const dorth = buildBodyGraph(graph.definedGates)

        // console.log("ROOTS!", dorth.roots)
        // expect(graph.connectivity)
        // expect(graph.connectivity.authority).toBe('sacral')
    })
})
