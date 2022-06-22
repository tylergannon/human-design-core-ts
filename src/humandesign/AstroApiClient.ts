import { Configuration, DefaultApiFp } from '../astro'
import type { CityGeoFacts } from '../astro'
import type { BirthChart } from './models/BirthChart'
import { fromApi } from './models/BirthChart'

/**
 * @public
 */
export class AstroApiClient {
    private readonly apiClient: ReturnType<typeof DefaultApiFp>

    async searchCities(q: string): Promise<CityGeoFacts[]> {
        const req = await this.apiClient.searchCitiesCitiesGet(q)
        const res = await req()
        return res.data
    }

    /**
     * @public
     * @param tz -
     * @param date -
     * @param time -
     * @returns
     */
    async getChart(tz: string, date: string, time: string, lat: number, lng: number): Promise<BirthChart> {
        const req = await this.apiClient.chartGet(tz, date, time, lat, lng)
        const response = await req()
        return fromApi(response.data)
    }

    /**
     * @public
     * @param tz -
     * @param date -
     * @param time -
     * @returns
     */
    async getSaturnReturn(
        tz: string,
        date: string,
        time: string,
        lat: number,
        lng: number
    ): Promise<BirthChart> {
        const req = await this.apiClient.saturnReturnGet(tz, date, time, lat, lng)
        const response = await req()
        return fromApi(response.data)
    }

    /**
     * @public
     * @param tz -
     * @param date -
     * @param time -
     * @returns
     */
    async getUranusOpposition(
        tz: string,
        date: string,
        time: string,
        lat: number,
        lng: number
    ): Promise<BirthChart> {
        const req = await this.apiClient.uranusOppositionGet(tz, date, time, lat, lng)
        const response = await req()
        return fromApi(response.data)
    }

    /**
     * @public
     * @param apiKey -
     */
    constructor(apiKey: string) {
        this.apiClient = DefaultApiFp(new Configuration({ apiKey }))
    }
}
