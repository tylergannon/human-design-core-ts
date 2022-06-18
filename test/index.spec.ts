import { Chart, Configuration, DefaultApiFp, HDChart } from '$astro'
import { Zodiac } from '$hd'

import type { AxiosPromise } from 'axios'

const apiKey = process.env.ASTROAPI_API_KEY!

const newApiClient = (authType: 'APIKeyQuery' | 'APIKeyCookie' | 'APIKeyHeader' = 'APIKeyQuery') =>
    DefaultApiFp(
        new Configuration({
            apiKey,
        })
    )

const cookieApiClient = () => newApiClient()

export const cool = 1
const [tz, bd, time] = ['America/Los_Angeles', '1978-04-07', '15:30']

describe('Api Check April 07, 1978', () => {
    const birth = cookieApiClient().chartGet(tz, bd, time, 0, 0).then()
    const saturnReturn = cookieApiClient().saturnReturnGet(tz, bd, time, 0, 0)
    const uranus = cookieApiClient().uranusOppositionGet(tz, bd, time, 0, 0)

    it('It should be able to get a chart from the API.', async () => {
        const chart: AxiosPromise<HDChart> = (await birth)()
        return chart.then(value => {
            expect(value.data.natal.sun.zodiac).toBe('Aries')
        })
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
