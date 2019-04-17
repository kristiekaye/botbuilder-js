import * as msRest from "@azure/ms-rest-js";
import * as Models from "../models";
import { TokenApiClientContext } from "../tokenApiClientContext";
/** Class representing a UserToken. */
export declare class UserToken {
    private readonly client;
    /**
     * Create a UserToken.
     * @param {TokenApiClientContext} client Reference to the service client.
     */
    constructor(client: TokenApiClientContext);
    /**
     * @param userId
     * @param connectionName
     * @param [options] The optional parameters
     * @returns Promise<Models.UserTokenGetTokenResponse>
     */
    getToken(userId: string, connectionName: string, options?: Models.UserTokenGetTokenOptionalParams): Promise<Models.UserTokenGetTokenResponse>;
    /**
     * @param userId
     * @param connectionName
     * @param callback The callback
     */
    getToken(userId: string, connectionName: string, callback: msRest.ServiceCallback<Models.TokenResponse>): void;
    /**
     * @param userId
     * @param connectionName
     * @param options The optional parameters
     * @param callback The callback
     */
    getToken(userId: string, connectionName: string, options: Models.UserTokenGetTokenOptionalParams, callback: msRest.ServiceCallback<Models.TokenResponse>): void;
    /**
     * @param userId
     * @param connectionName
     * @param aadResourceUrls
     * @param [options] The optional parameters
     * @returns Promise<Models.UserTokenGetAadTokensResponse>
     */
    getAadTokens(userId: string, connectionName: string, aadResourceUrls: Models.AadResourceUrls, options?: Models.UserTokenGetAadTokensOptionalParams): Promise<Models.UserTokenGetAadTokensResponse>;
    /**
     * @param userId
     * @param connectionName
     * @param aadResourceUrls
     * @param callback The callback
     */
    getAadTokens(userId: string, connectionName: string, aadResourceUrls: Models.AadResourceUrls, callback: msRest.ServiceCallback<{
        [propertyName: string]: Models.TokenResponse;
    }>): void;
    /**
     * @param userId
     * @param connectionName
     * @param aadResourceUrls
     * @param options The optional parameters
     * @param callback The callback
     */
    getAadTokens(userId: string, connectionName: string, aadResourceUrls: Models.AadResourceUrls, options: Models.UserTokenGetAadTokensOptionalParams, callback: msRest.ServiceCallback<{
        [propertyName: string]: Models.TokenResponse;
    }>): void;
    /**
     * @param userId
     * @param [options] The optional parameters
     * @returns Promise<Models.UserTokenSignOutResponse>
     */
    signOut(userId: string, options?: Models.UserTokenSignOutOptionalParams): Promise<Models.UserTokenSignOutResponse>;
    /**
     * @param userId
     * @param callback The callback
     */
    signOut(userId: string, callback: msRest.ServiceCallback<any>): void;
    /**
     * @param userId
     * @param options The optional parameters
     * @param callback The callback
     */
    signOut(userId: string, options: Models.UserTokenSignOutOptionalParams, callback: msRest.ServiceCallback<any>): void;
    /**
     * @param userId
     * @param [options] The optional parameters
     * @returns Promise<Models.UserTokenGetTokenStatusResponse>
     */
    getTokenStatus(userId: string, options?: Models.UserTokenGetTokenStatusOptionalParams): Promise<Models.UserTokenGetTokenStatusResponse>;
    /**
     * @param userId
     * @param callback The callback
     */
    getTokenStatus(userId: string, callback: msRest.ServiceCallback<Models.TokenStatus[]>): void;
    /**
     * @param userId
     * @param options The optional parameters
     * @param callback The callback
     */
    getTokenStatus(userId: string, options: Models.UserTokenGetTokenStatusOptionalParams, callback: msRest.ServiceCallback<Models.TokenStatus[]>): void;
}
//# sourceMappingURL=userToken.d.ts.map