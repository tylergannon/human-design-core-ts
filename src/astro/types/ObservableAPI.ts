import type { ResponseContext, RequestContext } from '../http/http';
import type { Configuration} from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
import type { HDChart } from '../models/HDChart';

import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";
export class ObservableDefaultApi {
    private requestFactory: DefaultApiRequestFactory;
    private responseProcessor: DefaultApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new DefaultApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new DefaultApiResponseProcessor();
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
    public chartGet(tz: string, localDate: string, localTime: string, lat: number, lng: number, _options?: Configuration): Observable<HDChart> {
        const requestContextPromise = this.requestFactory.chartGet(tz, localDate, localTime, lat, lng, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.chartGet(rsp)));
            }));
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
    public saturnReturnGet(tz: string, localDate: string, localTime: string, lat: number, lng: number, _options?: Configuration): Observable<HDChart> {
        const requestContextPromise = this.requestFactory.saturnReturnGet(tz, localDate, localTime, lat, lng, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.saturnReturnGet(rsp)));
            }));
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
    public uranusOppositionGet(tz: string, localDate: string, localTime: string, lat: number, lng: number, _options?: Configuration): Observable<HDChart> {
        const requestContextPromise = this.requestFactory.uranusOppositionGet(tz, localDate, localTime, lat, lng, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.uranusOppositionGet(rsp)));
            }));
    }

}
