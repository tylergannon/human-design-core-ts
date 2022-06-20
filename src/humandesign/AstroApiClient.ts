import { Configuration, DefaultApiFp } from '../astro'
import { BirthChart } from './models/BirthChart'

export class AstroApiClient {
    private readonly apiClient: ReturnType<typeof DefaultApiFp>

    async getChart(tz: string, date: string, time: string): Promise<BirthChart> {
        const req = await this.apiClient.chartGet(tz, date, time, 0, 0)
        const response = await req()
        return BirthChart.fromApi(response.data)
    }

    async getSaturnReturn(tz: string, date: string, time: string): Promise<BirthChart> {
        const req = await this.apiClient.saturnReturnGet(tz, date, time, 0, 0)
        const response = await req()
        return BirthChart.fromApi(response.data)
    }

    async getUranusOpposition(tz: string, date: string, time: string): Promise<BirthChart> {
        const req = await this.apiClient.uranusOppositionGet(tz, date, time, 0, 0)
        const response = await req()
        return BirthChart.fromApi(response.data)
    }

    constructor(apiKey: string) {
        this.apiClient = DefaultApiFp(new Configuration({ apiKey }))
    }
}
