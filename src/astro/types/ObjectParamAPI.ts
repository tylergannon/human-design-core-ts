import type { Configuration} from '../configuration'
import type { HDChart } from '../models/HDChart';

import { ObservableDefaultApi } from "./ObservableAPI";
import type { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";

export interface DefaultApiChartGetRequest {
    /**
     * 
     * @type string
     * @memberof DefaultApichartGet
     */
    tz: string
    /**
     * 
     * @type string
     * @memberof DefaultApichartGet
     */
    localDate: string
    /**
     * 
     * @type string
     * @memberof DefaultApichartGet
     */
    localTime: string
    /**
     * 
     * @type number
     * @memberof DefaultApichartGet
     */
    lat: number
    /**
     * 
     * @type number
     * @memberof DefaultApichartGet
     */
    lng: number
}

export interface DefaultApiSaturnReturnGetRequest {
    /**
     * 
     * @type string
     * @memberof DefaultApisaturnReturnGet
     */
    tz: string
    /**
     * 
     * @type string
     * @memberof DefaultApisaturnReturnGet
     */
    localDate: string
    /**
     * 
     * @type string
     * @memberof DefaultApisaturnReturnGet
     */
    localTime: string
    /**
     * 
     * @type number
     * @memberof DefaultApisaturnReturnGet
     */
    lat: number
    /**
     * 
     * @type number
     * @memberof DefaultApisaturnReturnGet
     */
    lng: number
}

export interface DefaultApiUranusOppositionGetRequest {
    /**
     * 
     * @type string
     * @memberof DefaultApiuranusOppositionGet
     */
    tz: string
    /**
     * 
     * @type string
     * @memberof DefaultApiuranusOppositionGet
     */
    localDate: string
    /**
     * 
     * @type string
     * @memberof DefaultApiuranusOppositionGet
     */
    localTime: string
    /**
     * 
     * @type number
     * @memberof DefaultApiuranusOppositionGet
     */
    lat: number
    /**
     * 
     * @type number
     * @memberof DefaultApiuranusOppositionGet
     */
    lng: number
}

export class ObjectDefaultApi {
    private api: ObservableDefaultApi

    public constructor(configuration: Configuration, requestFactory?: DefaultApiRequestFactory, responseProcessor?: DefaultApiResponseProcessor) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get the human design chart for the given birth coordinates.
     * 
     * @param param the request object
     */
    public chartGet(param: DefaultApiChartGetRequest, options?: Configuration): Promise<HDChart> {
        return this.api.chartGet(param.tz, param.localDate, param.localTime, param.lat, param.lng,  options).toPromise();
    }

    /**
     * Get the full chart for the date of Saturn's conjunction with its own position in the natal chart for the given date of birth.
     * 
     * @param param the request object
     */
    public saturnReturnGet(param: DefaultApiSaturnReturnGetRequest, options?: Configuration): Promise<HDChart> {
        return this.api.saturnReturnGet(param.tz, param.localDate, param.localTime, param.lat, param.lng,  options).toPromise();
    }

    /**
     * Get the full chart for the date of Uranus' opposition across its own position in the natal chart for the given date of birth.
     * 
     * @param param the request object
     */
    public uranusOppositionGet(param: DefaultApiUranusOppositionGetRequest, options?: Configuration): Promise<HDChart> {
        return this.api.uranusOppositionGet(param.tz, param.localDate, param.localTime, param.lat, param.lng,  options).toPromise();
    }

}
