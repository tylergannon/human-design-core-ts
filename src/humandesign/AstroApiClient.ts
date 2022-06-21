import { Configuration, DefaultApiFp } from '../astro'
import type { BirthChart } from './models/BirthChart'
import { fromApi } from './models/BirthChart'

/**
 * @public
 */
export class AstroApiClient {
    private readonly apiClient: ReturnType<typeof DefaultApiFp>

    /**
     * @public
     * @param tz
     * @param date
     * @param time
     * @returns
     */
    async getChart(tz: string, date: string, time: string): Promise<BirthChart> {
        const req = await this.apiClient.chartGet(tz, date, time, 0, 0)
        const response = await req()
        return fromApi(response.data)
    }

    /**
     * @public
     * @param tz
     * @param date
     * @param time
     * @returns
     */
    async getSaturnReturn(tz: string, date: string, time: string): Promise<BirthChart> {
        const req = await this.apiClient.saturnReturnGet(tz, date, time, 0, 0)
        const response = await req()
        return fromApi(response.data)
    }

    /**
     * @public
     * @param tz
     * @param date
     * @param time
     * @returns
     */
    async getUranusOpposition(tz: string, date: string, time: string): Promise<BirthChart> {
        const req = await this.apiClient.uranusOppositionGet(tz, date, time, 0, 0)
        const response = await req()
        return fromApi(response.data)
    }

    /**
     * @public
     * @param apiKey
     */
    constructor(apiKey: string) {
        this.apiClient = DefaultApiFp(new Configuration({ apiKey }))
    }
}
