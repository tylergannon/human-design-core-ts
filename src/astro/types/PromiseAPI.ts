import type { Configuration} from '../configuration'

import type { HDChart } from '../models/HDChart';
import { ObservableDefaultApi } from './ObservableAPI';

import type { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";

export class PromiseDefaultApi {
    private api: ObservableDefaultApi

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get the human design chart for the given birth coordinates.
     * 
     * @param tz 
     * @param localDate 
     * @param localTime 
     * @param lat 
     * @param lng 
     */
    public chartGet(tz: string, localDate: string, localTime: string, lat: number, lng: number, _options?: Configuration): Promise<HDChart> {
        const result = this.api.chartGet(tz, localDate, localTime, lat, lng, _options);
        return result.toPromise();
    }

    /**
     * Get the full chart for the date of Saturn's conjunction with its own position in the natal chart for the given date of birth.
     * 
     * @param tz 
     * @param localDate 
     * @param localTime 
     * @param lat 
     * @param lng 
     */
    public saturnReturnGet(tz: string, localDate: string, localTime: string, lat: number, lng: number, _options?: Configuration): Promise<HDChart> {
        const result = this.api.saturnReturnGet(tz, localDate, localTime, lat, lng, _options);
        return result.toPromise();
    }

    /**
     * Get the full chart for the date of Uranus' opposition across its own position in the natal chart for the given date of birth.
     * 
     * @param tz 
     * @param localDate 
     * @param localTime 
     * @param lat 
     * @param lng 
     */
    public uranusOppositionGet(tz: string, localDate: string, localTime: string, lat: number, lng: number, _options?: Configuration): Promise<HDChart> {
        const result = this.api.uranusOppositionGet(tz, localDate, localTime, lat, lng, _options);
        return result.toPromise();
    }


}



