// TODO: better import syntax?
import {BaseAPIRequestFactory, RequiredError} from './baseapi';
import type {Configuration} from '../configuration';
import {RequestContext, HttpMethod, ResponseContext} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {isCodeInRange} from '../util';
import type {SecurityAuthentication} from '../auth/auth';


import type { HDChart } from '../models/HDChart';
import type { HTTPValidationError } from '../models/HTTPValidationError';

/**
 * no description
 */
export class DefaultApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * Get the human design chart for the given birth coordinates.
     * 
     * @param tz 
     * @param localDate 
     * @param localTime 
     * @param lat 
     * @param lng 
     */
    public async chartGet(tz: string, localDate: string, localTime: string, lat: number, lng: number, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'tz' is not null or undefined
        if (tz === null || tz === undefined) {
            throw new RequiredError("DefaultApi", "chartGet", "tz");
        }


        // verify required parameter 'localDate' is not null or undefined
        if (localDate === null || localDate === undefined) {
            throw new RequiredError("DefaultApi", "chartGet", "localDate");
        }


        // verify required parameter 'localTime' is not null or undefined
        if (localTime === null || localTime === undefined) {
            throw new RequiredError("DefaultApi", "chartGet", "localTime");
        }


        // verify required parameter 'lat' is not null or undefined
        if (lat === null || lat === undefined) {
            throw new RequiredError("DefaultApi", "chartGet", "lat");
        }


        // verify required parameter 'lng' is not null or undefined
        if (lng === null || lng === undefined) {
            throw new RequiredError("DefaultApi", "chartGet", "lng");
        }


        // Path Params
        const localVarPath = '/chart';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (tz !== undefined) {
            requestContext.setQueryParam("tz", ObjectSerializer.serialize(tz, "string", ""));
        }

        // Query Params
        if (localDate !== undefined) {
            requestContext.setQueryParam("local_date", ObjectSerializer.serialize(localDate, "string", "date"));
        }

        // Query Params
        if (localTime !== undefined) {
            requestContext.setQueryParam("local_time", ObjectSerializer.serialize(localTime, "string", "time"));
        }

        // Query Params
        if (lat !== undefined) {
            requestContext.setQueryParam("lat", ObjectSerializer.serialize(lat, "number", ""));
        }

        // Query Params
        if (lng !== undefined) {
            requestContext.setQueryParam("lng", ObjectSerializer.serialize(lng, "number", ""));
        }


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["APIKeyCookie"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        // Apply auth methods
        authMethod = _config.authMethods["APIKeyHeader"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        // Apply auth methods
        authMethod = _config.authMethods["APIKeyQuery"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
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
    public async saturnReturnGet(tz: string, localDate: string, localTime: string, lat: number, lng: number, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'tz' is not null or undefined
        if (tz === null || tz === undefined) {
            throw new RequiredError("DefaultApi", "saturnReturnGet", "tz");
        }


        // verify required parameter 'localDate' is not null or undefined
        if (localDate === null || localDate === undefined) {
            throw new RequiredError("DefaultApi", "saturnReturnGet", "localDate");
        }


        // verify required parameter 'localTime' is not null or undefined
        if (localTime === null || localTime === undefined) {
            throw new RequiredError("DefaultApi", "saturnReturnGet", "localTime");
        }


        // verify required parameter 'lat' is not null or undefined
        if (lat === null || lat === undefined) {
            throw new RequiredError("DefaultApi", "saturnReturnGet", "lat");
        }


        // verify required parameter 'lng' is not null or undefined
        if (lng === null || lng === undefined) {
            throw new RequiredError("DefaultApi", "saturnReturnGet", "lng");
        }


        // Path Params
        const localVarPath = '/saturn_return';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (tz !== undefined) {
            requestContext.setQueryParam("tz", ObjectSerializer.serialize(tz, "string", ""));
        }

        // Query Params
        if (localDate !== undefined) {
            requestContext.setQueryParam("local_date", ObjectSerializer.serialize(localDate, "string", "date"));
        }

        // Query Params
        if (localTime !== undefined) {
            requestContext.setQueryParam("local_time", ObjectSerializer.serialize(localTime, "string", "time"));
        }

        // Query Params
        if (lat !== undefined) {
            requestContext.setQueryParam("lat", ObjectSerializer.serialize(lat, "number", ""));
        }

        // Query Params
        if (lng !== undefined) {
            requestContext.setQueryParam("lng", ObjectSerializer.serialize(lng, "number", ""));
        }


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["APIKeyCookie"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        // Apply auth methods
        authMethod = _config.authMethods["APIKeyHeader"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        // Apply auth methods
        authMethod = _config.authMethods["APIKeyQuery"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
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
    public async uranusOppositionGet(tz: string, localDate: string, localTime: string, lat: number, lng: number, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'tz' is not null or undefined
        if (tz === null || tz === undefined) {
            throw new RequiredError("DefaultApi", "uranusOppositionGet", "tz");
        }


        // verify required parameter 'localDate' is not null or undefined
        if (localDate === null || localDate === undefined) {
            throw new RequiredError("DefaultApi", "uranusOppositionGet", "localDate");
        }


        // verify required parameter 'localTime' is not null or undefined
        if (localTime === null || localTime === undefined) {
            throw new RequiredError("DefaultApi", "uranusOppositionGet", "localTime");
        }


        // verify required parameter 'lat' is not null or undefined
        if (lat === null || lat === undefined) {
            throw new RequiredError("DefaultApi", "uranusOppositionGet", "lat");
        }


        // verify required parameter 'lng' is not null or undefined
        if (lng === null || lng === undefined) {
            throw new RequiredError("DefaultApi", "uranusOppositionGet", "lng");
        }


        // Path Params
        const localVarPath = '/uranus_opposition';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (tz !== undefined) {
            requestContext.setQueryParam("tz", ObjectSerializer.serialize(tz, "string", ""));
        }

        // Query Params
        if (localDate !== undefined) {
            requestContext.setQueryParam("local_date", ObjectSerializer.serialize(localDate, "string", "date"));
        }

        // Query Params
        if (localTime !== undefined) {
            requestContext.setQueryParam("local_time", ObjectSerializer.serialize(localTime, "string", "time"));
        }

        // Query Params
        if (lat !== undefined) {
            requestContext.setQueryParam("lat", ObjectSerializer.serialize(lat, "number", ""));
        }

        // Query Params
        if (lng !== undefined) {
            requestContext.setQueryParam("lng", ObjectSerializer.serialize(lng, "number", ""));
        }


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["APIKeyCookie"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        // Apply auth methods
        authMethod = _config.authMethods["APIKeyHeader"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        // Apply auth methods
        authMethod = _config.authMethods["APIKeyQuery"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

}

export class DefaultApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to chartGet
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async chartGet(response: ResponseContext): Promise<HDChart > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: HDChart = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HDChart", ""
            ) as HDChart;
            return body;
        }
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: HTTPValidationError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HTTPValidationError", ""
            ) as HTTPValidationError;
            throw new ApiException<HTTPValidationError>(422, "Validation Error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: HDChart = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HDChart", ""
            ) as HDChart;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to saturnReturnGet
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async saturnReturnGet(response: ResponseContext): Promise<HDChart > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: HDChart = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HDChart", ""
            ) as HDChart;
            return body;
        }
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: HTTPValidationError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HTTPValidationError", ""
            ) as HTTPValidationError;
            throw new ApiException<HTTPValidationError>(422, "Validation Error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: HDChart = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HDChart", ""
            ) as HDChart;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to uranusOppositionGet
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async uranusOppositionGet(response: ResponseContext): Promise<HDChart > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: HDChart = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HDChart", ""
            ) as HDChart;
            return body;
        }
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: HTTPValidationError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HTTPValidationError", ""
            ) as HTTPValidationError;
            throw new ApiException<HTTPValidationError>(422, "Validation Error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: HDChart = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HDChart", ""
            ) as HDChart;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
