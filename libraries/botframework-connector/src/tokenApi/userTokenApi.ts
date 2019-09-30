/**
 * Microsoft Bot Token API - V3.1
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: token
 * Contact: botframework@microsoft.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as Models from '../model';
import { MicrosoftAppCredentials } from '../auth'
import { TokenApiClient } from './tokenApiClient';
import { ApiHelper } from '../apiHelper';


export class UserTokenApi {
    protected _basePath: string;
    protected defaultHeaders = {};    
    protected credentials: MicrosoftAppCredentials;
    protected userAgent: string;

    constructor(client: TokenApiClient){
        this.credentials = client.credentials;
        this.defaultHeaders = {"content-type": client.requestContentType};
        this.userAgent = client.userAgent;
        this.basePath = client.baseUri;
    }

    set basePath(basePath: string) {
        this._basePath = basePath;
    }

    get basePath() {
        return this._basePath;
    }

    /**
     * 
     * @param aadResourceUrls 
     * @param userId 
     * @param connectionName 
     * @param channelId 
     */
    public async getAadTokens (userId: string, connectionName: string, aadResourceUrls: Models.AadResourceUrls, options: Models.TokenOptionalParams = {headers: {}}) : Promise<Models.UserTokenGetAadTokensResponse> {
        const localPath = this.basePath + '/api/usertoken/GetAadTokens';
        let localQueryParameters = {};
        let localHeaderParams = Object.assign({}, this.defaultHeaders);        

        // verify required parameter 'aadResourceUrls' is not null or undefined
        if (aadResourceUrls === null || aadResourceUrls === undefined) {
            throw new Error('Required parameter aadResourceUrls was null or undefined when calling getAadTokens.');
        }

        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling getAadTokens.');
        }

        // verify required parameter 'connectionName' is not null or undefined
        if (connectionName === null || connectionName === undefined) {
            throw new Error('Required parameter connectionName was null or undefined when calling getAadTokens.');
        }

        if (userId !== undefined) {
            localQueryParameters['userId'] = ApiHelper.serialize(userId, "string");
        }

        if (connectionName !== undefined) {
            localQueryParameters['connectionName'] = ApiHelper.serialize(connectionName, "string");
        }

        if (options.channelId !== undefined) {
            localQueryParameters['channelId'] = ApiHelper.serialize(options.channelId, "string");
        }

        let url = new URL(localPath)
        Object.keys(localQueryParameters).forEach(key => url.searchParams.append(key, localQueryParameters[key]))            
        Object.assign(localHeaderParams, options.headers);

        let requestOptions = {
            method: 'POST',
            uri: localPath,
            headers: localHeaderParams,            
            json: true,
            proxy: options.proxyOptions,
            userAgent: this.userAgent
        };

        await this.credentials.signRequest(requestOptions);       

        return ApiHelper.deserializeResponse<Models.UserTokenGetAadTokensResponse>(url, requestOptions);
    }
    /**
     * 
     * @param userId 
     * @param connectionName 
     * @param channelId 
     * @param code 
     */
    public async getToken (userId: string, connectionName: string, options: Models.TokenOptionalParams = {headers: {}}) : Promise<Models.UserTokenGetTokenResponse> {
        const localPath = this.basePath + '/api/usertoken/GetToken';
        let localQueryParameters = {};
        let localHeaderParams = Object.assign({}, this.defaultHeaders);        

        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling getToken.');
        }

        // verify required parameter 'connectionName' is not null or undefined
        if (connectionName === null || connectionName === undefined) {
            throw new Error('Required parameter connectionName was null or undefined when calling getToken.');
        }

        if (userId !== undefined) {
            localQueryParameters['userId'] = ApiHelper.serialize(userId, "string");
        }

        if (connectionName !== undefined) {
            localQueryParameters['connectionName'] = ApiHelper.serialize(connectionName, "string");
        }

        if (options.channelId !== undefined) {
            localQueryParameters['channelId'] = ApiHelper.serialize(options.channelId, "string");
        }

        if (options.code !== undefined) {
            localQueryParameters['code'] = ApiHelper.serialize(options.code, "string");
        }        

        let url = new URL(localPath)
        Object.keys(localQueryParameters).forEach(key => url.searchParams.append(key, localQueryParameters[key]))            
        Object.assign(localHeaderParams, options.headers);

        let requestOptions = {
            method: 'GET',
            uri: localPath,
            headers: localHeaderParams,            
            json: true,
            proxy: options.proxyOptions,
            userAgent: this.userAgent
        };

        await this.credentials.signRequest(requestOptions);

        return ApiHelper.deserializeResponse<Models.UserTokenGetTokenResponse>(url, requestOptions);
    }
    /**
     * 
     * @param userId 
     * @param channelId 
     * @param include 
     */
    public async getTokenStatus (userId: string, options: Models.TokenOptionalParams = {headers: {}}) : Promise<Models.UserTokenGetTokenStatusResponse> {
        const localPath = this.basePath + '/api/usertoken/GetTokenStatus';
        let localQueryParameters = {};
        let localHeaderParams = Object.assign({}, this.defaultHeaders);

        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling getTokenStatus.');
        }

        if (userId !== undefined) {
            localQueryParameters['userId'] = ApiHelper.serialize(userId, "string");
        }

        if (options.channelId !== undefined) {
            localQueryParameters['channelId'] = ApiHelper.serialize(options.channelId, "string");
        }

        if (options.include !== undefined) {
            localQueryParameters['include'] = ApiHelper.serialize(options.include, "string");
        }

        let url = new URL(localPath)
        Object.keys(localQueryParameters).forEach(key => url.searchParams.append(key, localQueryParameters[key]))            
        Object.assign(localHeaderParams, options.headers);

        let requestOptions = {
            method: 'GET',
            uri: localPath,
            headers: localHeaderParams,
            json: true,
            proxy: options.proxyOptions,
            userAgent: this.userAgent
        };

        await this.credentials.signRequest(requestOptions);

        return ApiHelper.deserializeResponse<Models.UserTokenGetTokenStatusResponse>(url, requestOptions);  
    }
    /**
     * 
     * @param userId
     * @param connectionName 
     * @param channelId
     */
    public async signOut (userId: string, options: Models.SignOutParams = {headers: {}}) : Promise<Models.UserTokenSignOutResponse> {
        const localPath = this.basePath + '/api/usertoken/SignOut';
        let localQueryParameters = {};
        let localHeaderParams = Object.assign({}, this.defaultHeaders);        

        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling signOut.');
        }

        if (userId !== undefined) {
            localQueryParameters['userId'] = ApiHelper.serialize(userId, "string");
        }

        if (options.connectionName !== undefined) {
            localQueryParameters['connectionName'] = ApiHelper.serialize(options.connectionName, "string");
        }

        if (options.channelId !== undefined) {
            localQueryParameters['channelId'] = ApiHelper.serialize(options.channelId, "string");
        }

        let url = new URL(localPath)
        Object.keys(localQueryParameters).forEach(key => url.searchParams.append(key, localQueryParameters[key]))            
        Object.assign(localHeaderParams, options.headers);

        let requestOptions = {
            method: 'DELETE',
            uri: localPath,
            headers: localHeaderParams,            
            json: true,
            proxy: options.proxyOptions,
            userAgent: this.userAgent
        };

        await this.credentials.signRequest(requestOptions);

        return await ApiHelper.deserializeResponse<Models.UserTokenSignOutResponse>(url, requestOptions);
    }
}
