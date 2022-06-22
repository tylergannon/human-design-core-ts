import { AstroApiClient } from '../dist/human-design.es'
import { buildBodyGraph, connectivity, linker } from '$hd/models/Connectivity'
const apiKey = process.env.ASTROAPI_API_KEY!
import type { Authority, BirthChart, GateNum, HDType } from '$hd'
import { byGateNum } from '$hd/models/Gate'

type ChartApiFn = typeof AstroApiClient.prototype.getChart

const callApi = (fn: ChartApiFn) => fn('America/Los_Angeles', '1978-04-07', '15:30', 36.6777, -121.6555)

describe('AstroApiClient', () => {
    const myGates: GateNum[] = [
        '54',
        '53',
        '18',
        '17',
        '41',
        '11',
        '31',
        '15',
        '29',
        '1',
        '26',
        '57',
        '51',
        '42',
        '27',
        '56',
        '4',
    ]

    const gatesSet = new Set(myGates)

    it('can get the graph and connectivity', () => {
        const conn = connectivity(myGates)
        expect(conn.authority).toBe('sacral' as Authority)
        expect(conn.rank).toEqual(2)
        expect(conn.type).toEqual('Generator' as HDType)
    })
})
