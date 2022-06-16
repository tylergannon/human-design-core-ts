import { Chart, DefaultApi, createConfiguration, HDChart } from '$astro'
import { Zodiac } from '$hd'

const apiKey = process.env.ASTROAPI_API_KEY!

const newApiClient = (
    authType: 'APIKeyQuery' | 'APIKeyCookie' | 'APIKeyHeader' = 'APIKeyQuery'
) =>
    new DefaultApi(
        createConfiguration({
            authMethods: {
                [authType]: apiKey,
            },
        })
    )

const cookieApiClient = () => newApiClient()
const apiClientHeader = () => newApiClient('APIKeyHeader')
const apiClientCookie = () => newApiClient('APIKeyCookie')

export const cool = 1
const [tz, bd, time] = ['America/Los_Angeles', '1978-04-07', '15:30']

describe('Api Check April 07, 1978', () => {
    const birth = cookieApiClient().chartGet(tz, bd, time, 0, 0)
    const saturnReturn = apiClientCookie().saturnReturnGet(tz, bd, time, 0, 0)
    const uranus = apiClientHeader().uranusOppositionGet(tz, bd, time, 0, 0)

    it('It should be able to get a chart from the API.', async () => {
        const chart = await birth
        expect(chart.natal.sun.zodiac).toBe('Aries')
    })
    it('Should load saturn returns', async () => {
        const chart = await saturnReturn
        expect(chart.natal.chartDate.date).toBe('2006-10-31')
    })
    it('Should load Uranus', async () => {
        const chart = await uranus
        expect(chart.natal.chartDate.date).toBe('2022-05-16')
    })
})
