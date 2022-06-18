import { createConfiguration, DefaultApi } from '$astro'
import { BirthChart } from './models/BirthChart'

export class AstroApiClient {
    private readonly apiClient: DefaultApi

    async getChart(tz: string, date: string, time: string): Promise<BirthChart> {
        return BirthChart.fromApi(await this.apiClient.chartGet(tz, date, time, 0, 0))
    }

    async getSaturnReturn(tz: string, date: string, time: string): Promise<BirthChart> {
        return BirthChart.fromApi(await this.apiClient.saturnReturnGet(tz, date, time, 0, 0))
    }

    async getUranusOpposition(tz: string, date: string, time: string): Promise<BirthChart> {
        return BirthChart.fromApi(await this.apiClient.uranusOppositionGet(tz, date, time, 0, 0))
    }

    constructor(apiKey: string) {
        this.apiClient = new DefaultApi(createConfiguration({ authMethods: { APIKeyHeader: apiKey } }))
    }
}
