import { RequestContext } from '../http/http'

/**
 * Interface authentication schemes.
 */
export interface SecurityAuthentication {
    /*
     * @return returns the name of the security authentication as specified in OAI
     */
    getName(): string

    /**
     * Applies the authentication scheme to the request context
     *
     * @params context the request context which should use this authentication scheme
     */
    applySecurityAuthentication(context: RequestContext): void | Promise<void>
}

export interface TokenProvider {
    getToken(): Promise<string> | string
}

/**
 * Applies apiKey authentication to the request context.
 */
export class APIKeyCookieAuthentication implements SecurityAuthentication {
    /**
     * Configures this api key authentication with the necessary properties
     *
     * @param apiKey: The api key to be used for every request
     */
    public constructor(private apiKey: string) {}

    public getName(): string {
        return 'APIKeyCookie'
    }

    public applySecurityAuthentication(context: RequestContext) {
        context.addCookie('Api-Key', this.apiKey)
    }
}

/**
 * Applies apiKey authentication to the request context.
 */
export class APIKeyHeaderAuthentication implements SecurityAuthentication {
    /**
     * Configures this api key authentication with the necessary properties
     *
     * @param apiKey: The api key to be used for every request
     */
    public constructor(private apiKey: string) {}

    public getName(): string {
        return 'APIKeyHeader'
    }

    public applySecurityAuthentication(context: RequestContext) {
        context.setHeaderParam('Api-Key', this.apiKey)
    }
}

/**
 * Applies apiKey authentication to the request context.
 */
export class APIKeyQueryAuthentication implements SecurityAuthentication {
    /**
     * Configures this api key authentication with the necessary properties
     *
     * @param apiKey: The api key to be used for every request
     */
    public constructor(private apiKey: string) {}

    public getName(): string {
        return 'APIKeyQuery'
    }

    public applySecurityAuthentication(context: RequestContext) {
        context.setQueryParam('apiKey', this.apiKey)
    }
}

export type AuthMethods = {
    default?: SecurityAuthentication
    APIKeyCookie?: SecurityAuthentication
    APIKeyHeader?: SecurityAuthentication
    APIKeyQuery?: SecurityAuthentication
}

export type ApiKeyConfiguration = string
export type HttpBasicConfiguration = { username: string; password: string }
export type HttpBearerConfiguration = { tokenProvider: TokenProvider }
export type OAuth2Configuration = { accessToken: string }

export type AuthMethodsConfiguration = {
    default?: SecurityAuthentication
    APIKeyCookie?: ApiKeyConfiguration
    APIKeyHeader?: ApiKeyConfiguration
    APIKeyQuery?: ApiKeyConfiguration
}

/**
 * Creates the authentication methods from a swagger description.
 *
 */
export function configureAuthMethods(
    config: AuthMethodsConfiguration | undefined
): AuthMethods {
    const authMethods: AuthMethods = {}

    if (!config) {
        return authMethods
    }
    authMethods['default'] = config['default']

    if (config['APIKeyCookie']) {
        authMethods['APIKeyCookie'] = new APIKeyCookieAuthentication(
            config['APIKeyCookie']
        )
    }

    if (config['APIKeyHeader']) {
        authMethods['APIKeyHeader'] = new APIKeyHeaderAuthentication(
            config['APIKeyHeader']
        )
    }

    if (config['APIKeyQuery']) {
        authMethods['APIKeyQuery'] = new APIKeyQueryAuthentication(
            config['APIKeyQuery']
        )
    }

    return authMethods
}
