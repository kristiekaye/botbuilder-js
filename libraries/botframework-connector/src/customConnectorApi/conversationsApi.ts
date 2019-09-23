/**
 * Microsoft Bot Connector API - v3.0
 * The Bot Connector REST API allows your bot to send and receive messages to channels configured in the  [Bot Framework Developer Portal](https://dev.botframework.com). The Connector service uses industry-standard REST  and JSON over HTTPS.    Client libraries for this REST API are available. See below for a list.    Many bots will use both the Bot Connector REST API and the associated [Bot State REST API](/en-us/restapi/state). The  Bot State REST API allows a bot to store and retrieve state associated with users and conversations.    Authentication for both the Bot Connector and Bot State REST APIs is accomplished with JWT Bearer tokens, and is  described in detail in the [Connector Authentication](/en-us/restapi/authentication) document.    # Client Libraries for the Bot Connector REST API    * [Bot Builder for C#](/en-us/csharp/builder/sdkreference/)  * [Bot Builder for Node.js](/en-us/node/builder/overview/)  * Generate your own from the [Connector API Swagger file](https://raw.githubusercontent.com/Microsoft/BotBuilder/master/CSharp/Library/Microsoft.Bot.Connector.Shared/Swagger/ConnectorAPI.json)    © 2016 Microsoft
 *
 * The version of the OpenAPI document: v3
 * Contact: botframework@microsoft.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import http = require('http');
import * as HttpStatus from 'http-status-codes';

/* tslint:disable:no-unused-locals */
import { AttachmentData } from './model/attachmentData';
import { Transcript } from './model/transcript';
import { ObjectSerializer, RequestOptions, Activity } from './model/models';
import { CreateConversationResponse, ConversationParameters, PagedParameters, DeleteActivityResponse, useResourceResponse } from './model';
import { GetConversationMembersResponse } from './model/responses/getConversationMembersResponse';
import { CustomMicrosoftAppCredentials } from '../auth'
import * as Models from './model';


const fetch = (new Function('require', 'if (!this.hasOwnProperty("fetch")) { return require("node-fetch"); } else { return this.fetch; }'))(require);
let defaultBasePath = 'https://api.botframework.com';

export enum ConversationsApiApiKeys {
}

export class ConversationsApi {
    protected _basePath = defaultBasePath;
    protected _defaultHeaders: any = {};
    protected _useQuerystring: boolean = false;
    protected credentials: CustomMicrosoftAppCredentials;

    constructor(CustomCredentials: CustomMicrosoftAppCredentials)
    constructor(CustomCredentials: CustomMicrosoftAppCredentials, basePath?: string) {
        if (basePath)
            this.basePath = basePath;

        if (CustomCredentials) {
            this.credentials = CustomCredentials;
        }
    }

    set useQuerystring(value: boolean) {
        this._useQuerystring = value;
    }

    set basePath(basePath: string) {
        this._basePath = basePath;
    }

    get basePath() {
        return this._basePath;
    }

    set defaultHeaders(defaultHeaders: {}) {
        this._defaultHeaders = defaultHeaders;
    }

    private async deserializeResponse<T>(url, requestOptions): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            fetch(url, requestOptions).then(response => {
                let httpResponse: http.IncomingMessage = response;

                if (response.status && response.status >= HttpStatus.OK && response.status < HttpStatus.MULTIPLE_CHOICES) {
                        const testing = response.json();
                        testing.then(result => {
                            let _body: T = ObjectSerializer.deserialize(result);
                            let _bodyAsText: string = _body == undefined ? "" : ObjectSerializer.deserialize(result);
                            let _response = Object.assign(httpResponse, { bodyAsText: _bodyAsText, parsedBody: _body });
                            let toReturn: T = _body == undefined? Object.assign( {_response: _response.parsedBody}) : Object.assign(_body, {_response: _response.parsedBody});

                            resolve(toReturn);
                        }).catch(error => {
                                let toReturn: T =  {}  as any
                                resolve(toReturn);
                            });
                } else {
                    let toReturn: T = Object.assign({ _response: httpResponse });

                    resolve(toReturn);;
                }
            });
        });
    }

    public async createConversation(parameters: ConversationParameters, options: RequestOptions = {headers: {}}) : Promise<CreateConversationResponse> {
        // verify required parameter 'parameters' is not null or undefined
        if (parameters == null) {
            throw new Error('Required parameter parameters was null or undefined when calling conversationsCreateConversation.');
        }

        const path = this.basePath + '/v3/conversations';
        let queryParameters: any = {};
        let headerParams: any = Object.assign({}, this._defaultHeaders);

        Object.assign(headerParams, options.headers);

        let formParams: any = {};
        let useFormData = false;
        let url = new URL(path);

        Object.keys(queryParameters).forEach(key => url.searchParams.append(key, queryParameters[key]));

        let requestOptions = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            useQuerystring: this._useQuerystring,
            json: true,
            body: JSON.stringify(ObjectSerializer.serialize(parameters, "ConversationParameters")),
            proxy: options.proxyOptions
        };
        

        if (Object.keys(formParams).length) {
            useFormData ? requestOptions['formData'] = formParams : requestOptions['form'] = formParams;
        }

        await this.credentials.signRequest(requestOptions);

        return this.deserializeResponse<CreateConversationResponse>(url, requestOptions) ;
    }

    /**
     * Delete an existing activity.
     * Some channels allow you to delete an existing activity, and if successful this method will remove the specified activity.
     * @summary DeleteActivity
     * @param conversationId Conversation ID
     * @param activityId activityId to delete
     */
    public async deleteActivity(conversationId: string, activityId: string, options?: RequestOptions)
        : Promise<DeleteActivityResponse> {

        // verify required parameter 'conversationId' is not null or undefined
        if (conversationId == null) {
            throw new Error('Required parameter conversationId was null or undefined when calling conversationsDeleteActivity.');
        }

        // verify required parameter 'activityId' is not null or undefined
        if (activityId == null) {
            throw new Error('Required parameter activityId was null or undefined when calling conversationsDeleteActivity.');
        }

        const path = this.basePath + '/v3/conversations/{conversationId}/activities/{activityId}'
            .replace('{' + 'conversationId' + '}', encodeURIComponent(String(conversationId)))
            .replace('{' + 'activityId' + '}', encodeURIComponent(String(activityId)));
        let queryParameters: {};
        let headerParams = Object.assign({}, this.defaultHeaders);
        
        Object.assign(headerParams, options.headers);
        
        let formParams = {};
        let useFormData = false;
        let url = new URL(path)

        Object.keys(queryParameters).forEach(key => url.searchParams.append(key, queryParameters[key]));

        let requestOptions = {
            method: 'DELETE',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            useQuerystring: this._useQuerystring,
            json: true,
            proxy: options.proxyOptions
        };

        if (Object.keys(formParams).length) {
            useFormData ? requestOptions['formData'] = formParams : requestOptions['form'] = formParams;
        }

        await this.credentials.signRequest(requestOptions);

        return this.deserializeResponse<DeleteActivityResponse>(url, requestOptions);
    }



    /**
     * Deletes a member from a conversation.
     * This REST API takes a ConversationId and a memberId (of type string) and removes that member from the conversation.
     * If that member was the last member of the conversation, the conversation will also be deleted.
     * @summary DeleteConversationMember
     * @param conversationId Conversation ID
     * @param memberId ID of the member to delete from this conversation
     */
    public async deleteConversationMember(conversationId: string,
        memberId: string,
        options?: RequestOptions)
        : Promise<DeleteActivityResponse> {

        // verify required parameter 'conversationId' is not null or undefined
        if (conversationId == null) {
            throw new Error('Required parameter conversationId was null or undefined when calling conversationsDeleteConversationMember.');
        }

        // verify required parameter 'memberId' is not null or undefined
        if (memberId == null) {
            throw new Error('Required parameter memberId was null or undefined when calling conversationsDeleteConversationMember.');
        }

        const path = this.basePath + `/v3/conversations/{conversationId}/members/{memberId}`
            .replace('{conversationId}', encodeURIComponent(String(conversationId)))
            .replace('{memberId}', encodeURIComponent(String(memberId)));
        let queryParameters: any = {};
        let headerParams: any = Object.assign({}, this.defaultHeaders);
        
        Object.assign(headerParams, options.headers);
        
        let useFormData = false;
        let formParams: any = {};
        let url = new URL(path)

        Object.keys(queryParameters).forEach(key => url.searchParams.append(key, queryParameters[key]));

        let requestOptions = {
            method: 'DELETE',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            useQuerystring: this._useQuerystring,
            json: true,
            proxy: options.proxyOptions
        };

        if (Object.keys(formParams).length) {
            useFormData ? requestOptions['formData'] = formParams : requestOptions['form'] = formParams;
        }

        await this.credentials.signRequest(requestOptions);

        return this.deserializeResponse<DeleteActivityResponse>(url, requestOptions);
    }

    /**
     * Enumerate the members of an activity.
     * This REST API takes a ConversationId and a ActivityId, returning an array
     * of ChannelAccount objects representing the members of the particular activity in the conversation.
     * @summary GetActivityMembers
     * @param conversationId Conversation ID
     * @param activityId Activity ID
     */
    public async getActivityMembers(conversationId: string, activityId: string, options: RequestOptions): Promise<GetConversationMembersResponse> {

        // verify required parameter 'conversationId' is not null or undefined
        if (conversationId == null) {
            throw new Error('Required parameter conversationId was null or undefined when calling conversationsGetActivityMembers.');
        }

        // verify required parameter 'activityId' is not null or undefined
        if (activityId == null) {
            throw new Error('Required parameter activityId was null or undefined when calling conversationsGetActivityMembers.');
        }

        const path = this.basePath + '/v3/conversations/{conversationId}/activities/{activityId}/members'
            .replace('{conversationId}', encodeURIComponent(String(conversationId)))
            .replace('{activityId}', encodeURIComponent(String(activityId)));
        let queryParameters: any = {};
        let headerParams: any = Object.assign({}, this.defaultHeaders);
        
        Object.assign(headerParams, options.headers);
        
        let useFormData = false;
        let formParams: any = {};
        let url = new URL(path)

        Object.keys(queryParameters).forEach(key => url.searchParams.append(key, queryParameters[key]));

        let requestOptions = {
            method: 'GET',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            useQuerystring: this._useQuerystring,
            json: true,
            proxy: options.proxyOptions
        };

        if (Object.keys(formParams).length) {
            useFormData ? requestOptions['formData'] = formParams : requestOptions['form'] = formParams;
        }

        await this.credentials.signRequest(requestOptions);

        return this.deserializeResponse<GetConversationMembersResponse>(url, requestOptions);
    }

    /**
     * Enumerate the members of a conversation.
     * This REST API takes a ConversationId and returns an array of ChannelAccount objects representing the members of the conversation.
     * @summary GetConversationMembers
     * @param conversationId Conversation ID
     */
    public async getConversationMembers(conversationId: string, options: RequestOptions)
        : Promise<GetConversationMembersResponse> {

        // verify required parameter 'conversationId' is not null or undefined
        if (conversationId == null) {
            throw new Error('Required parameter conversationId was null or undefined when calling conversationsGetConversationMembers.');
        }

        const path = this.basePath + '/v3/conversations/{conversationId}/members'
            .replace('{' + 'conversationId' + '}', encodeURIComponent(String(conversationId)));
        let queryParameters: any = {};
        let headerParams: any = Object.assign({}, this.defaultHeaders);
        
        Object.assign(headerParams, options.headers);
        
        let formParams: any = {};
        let useFormData = false;
        let url = new URL(path)

        Object.keys(queryParameters).forEach(key => url.searchParams.append(key, queryParameters[key]));

        let requestOptions = {
            method: 'GET',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            useQuerystring: this._useQuerystring,
            json: true,
            proxy: options.proxyOptions
        };

        if (Object.keys(formParams).length) {
            useFormData ? requestOptions['formData'] = formParams : requestOptions['form'] = formParams;
        }

        await this.credentials.signRequest(requestOptions);

        return this.deserializeResponse<GetConversationMembersResponse>(url, requestOptions);
    }

    /**
     * Enumerate the members of a conversation one page at a time.
     * This REST API takes a ConversationId. Optionally a pageSize and/or continuationToken
     * can be provided. It returns a PagedMembersResult, which contains an array
     * of ChannelAccounts representing the members of the conversation and a continuation
     * token that can be used to get more values.
     * One page of ChannelAccounts records are returned with each call.
     * The number of records in a page may vary between channels and calls.
     * The pageSize parameter can be used as a suggestion.
     * If there are no additional results the response will not contain a continuation token.
     * If there are no members in the conversation the Members will be empty or not present in the response.
     * A response to a request that has a continuation token from a prior request may rarely return members
     * from a previous request.
     * @summary GetConversationPagedMembers
     * @param conversationId Conversation ID
     * @param pageSize Suggested page size
     * @param continuationToken Continuation Token
     */
    public async getConversationPagedMembers(conversationId: string, parameters?: PagedParameters, options?: RequestOptions)
        : Promise<useResourceResponse> {

        let queryParameters: any = {};
        // verify required parameter 'conversationId' is not null or undefined
        if (conversationId == null) {
            throw new Error('Required parameter conversationId was null or undefined when calling conversationsGetConversationPagedMembers.');
        }

        if (parameters.pageSize !== undefined) {
            queryParameters['pageSize'] = ObjectSerializer.serialize(parameters.pageSize, "number");
        }

        if (parameters.continuationToken !== undefined) {
            queryParameters['continuationToken'] = ObjectSerializer.serialize(parameters.continuationToken, "string");
        }

        const path = this.basePath + '/v3/conversations/{conversationId}/pagedmembers'
            .replace('{' + 'conversationId' + '}', encodeURIComponent(String(parameters.conversationId)));
        let headerParams: any = Object.assign({}, this.defaultHeaders);
        
        Object.assign(headerParams, options.headers);
        
        let formParams: any = {};
        let url = new URL(path);
        let useFormData = false;

        Object.keys(queryParameters).forEach(key => url.searchParams.append(key, queryParameters[key]));

        let requestOptions = {
            method: 'GET',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            useQuerystring: this._useQuerystring,
            json: true,
            proxy: options.proxyOptions
        };

        if (Object.keys(formParams).length) {
            useFormData ? requestOptions['formData'] = formParams : requestOptions['form'] = formParams;
        }

        await this.credentials.signRequest(requestOptions);

        return this.deserializeResponse<useResourceResponse>(url, requestOptions);
    }

    /**
     * List the Conversations in which this bot has participated.
     *
     * GET from this method with a skip token
     *
     * The return value is a ConversationsResult, which contains an array of ConversationMembers and a skip token.
     * If the skip token is not empty, then there are further values to be returned.
     * Call this method again with the returned token to get more values.
     *
     * Each ConversationMembers object contains the ID of the conversation and an array of
     * ChannelAccounts that describe the members of the conversation.
     * @summary GetConversations
     * @param continuationToken skip or continuation token
     */
    public async getConversations(options?: RequestOptions)
        : Promise<useResourceResponse> {
        const path = this.basePath + '/v3/conversations';
        let queryParameters: any = {};
        let headerParams: any = Object.assign({}, this._defaultHeaders);

        Object.assign(headerParams, options.headers);

        let formParams: any = {};
        let url = new URL(path);
        let useFormData = false;

        Object.keys(queryParameters).forEach(key => url.searchParams.append(key, queryParameters[key]));

        let requestOptions = {
            method: 'GET',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            useQuerystring: this._useQuerystring,
            json: true,
            proxy: options.proxyOptions
        };     

        if (Object.keys(formParams).length) {
            useFormData ? requestOptions['formData'] = formParams : requestOptions['form'] = formParams;
        }

        await this.credentials.signRequest(requestOptions);

        return this.deserializeResponse<useResourceResponse>(url, requestOptions);
    }

    /**
     * This method allows you to reply to an activity.
     * This is slightly different from SendToConversation().
     * * SendToConversation(conversationId) - will append the activity to the end of the conversation according to the timestamp or semantics of the channel.
     * * ReplyToActivity(conversationId,ActivityId) - adds the activity as a reply to another activity, if the channel supports it.
     * If the channel does not support nested replies, ReplyToActivity falls back to SendToConversation.
     * Use ReplyToActivity when replying to a specific activity in the conversation.
     * Use SendToConversation in all other cases.
     * @summary ReplyToActivity
     * @param activity Activity to send
     * @param conversationId Conversation ID
     * @param activityId activityId the reply is to (OPTIONAL)
     */
    public async replyToActivity(conversationId: string, activityId: string, activity: Activity, parameters: ConversationParameters, options: RequestOptions)
        : Promise<useResourceResponse> {

        // verify required parameter 'activity' is not null or undefined
        if (activity == null) {
            throw new Error('Required parameter activity was null or undefined when calling conversationsReplyToActivity.');
        }

        // verify required parameter 'conversationId' is not null or undefined
        if (conversationId == null) {
            throw new Error('Required parameter conversationId was null or undefined when calling conversationsReplyToActivity.');
        }

        // verify required parameter 'activityId' is not null or undefined
        if (activityId == null) {
            throw new Error('Required parameter activityId was null or undefined when calling conversationsReplyToActivity.');
        }
        const path = this.basePath + '/v3/conversations/{conversationId}/activities/{activityId}'
            .replace('{' + 'conversationId' + '}', encodeURIComponent(String(parameters.activity.conversation.id)))
            .replace('{' + 'activityId' + '}', encodeURIComponent(String(parameters.activity.id)));
        let queryParameters: any = {};
        let headerParams: any = Object.assign({}, this.defaultHeaders);
        
        Object.assign(headerParams, options.headers);
        
        let formParams: any = {};
        let url = new URL(path);
        let useFormData = false;

        Object.keys(queryParameters).forEach(key => url.searchParams.append(key, queryParameters[key]));

        let requestOptions = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(parameters.activity, "Activity"),
            proxy: options.proxyOptions
        };

        if (Object.keys(formParams).length) {
            useFormData ? requestOptions['formData'] = formParams : requestOptions['form'] = formParams;
        }

        await this.credentials.signRequest(requestOptions);

        return this.deserializeResponse<useResourceResponse>(url, requestOptions);
    }

    /**
     * This method allows you to upload the historic activities to the conversation.
     * Sender must ensure that the historic activities have unique ids and appropriate timestamps.
     * The ids are used by the client to deal with duplicate activities and the timestamps are used
     * by the client to render the activities in the right order.
     * @summary SendConversationHistory
     * @param history Historic activities
     * @param conversationId Conversation ID
     */
    public async sendConversationHistory(conversationId: string,
        history: Transcript, options: RequestOptions)
        : Promise<useResourceResponse> {

        // verify required parameter 'history' is not null or undefined
        if (history == null) {
            throw new Error('Required parameter history was null or undefined when calling SendConversationHistory.');
        }
        // verify required parameter 'conversationId' is not null or undefined
        if (conversationId == null) {
            throw new Error('Required parameter conversationId was null or undefined when calling SendConversationHistory.');
        }
        const path = this.basePath + '/v3/conversations/{conversationId}/activities/history'
            .replace('{' + 'conversationId' + '}', encodeURIComponent(String(conversationId)));
        let queryParameters: any = {};
        let headerParams: any = Object.assign({}, this.defaultHeaders);
        
        Object.assign(headerParams, options.headers);
        
        let formParams: any = {};
        let useFormData = false;
        let url = new URL(path)

        Object.keys(queryParameters).forEach(key => url.searchParams.append(key, queryParameters[key]));

        let requestOptions = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(history, "Transcript"),
            proxy: options.proxyOptions
        };

        if (Object.keys(formParams).length) {
            useFormData ? requestOptions['formData'] = formParams : requestOptions['form'] = formParams;
        }

        await this.credentials.signRequest(requestOptions);

        return this.deserializeResponse<useResourceResponse>(url, requestOptions);
    }

    /**
     * This method allows you to send an activity to the end of a conversation.
     * This is slightly different from ReplyToActivity().
     * * SendToConversation(conversationId) - will append the activity to the end of the conversation according to the timestamp or semantics of the channel.
     * * ReplyToActivity(conversationId,ActivityId) - adds the activity as a reply to another activity, if the channel supports it.
     * If the channel does not support nested replies, ReplyToActivity falls back to SendToConversation.
     * Use ReplyToActivity when replying to a specific activity in the conversation.
     * Use SendToConversation in all other cases.
     * @summary SendToConversation
     * @param activity Activity to send
     * @param conversationId Conversation ID
     */
    public async sendToConversation(conversationId: string, activity: Models.Activity, options: RequestOptions = {headers: {}})
        : Promise<Models.ConversationsSendToConversationResponse> {

        // verify required parameter 'activity' is not null or undefined
        if (activity == null) {
            throw new Error('Required parameter activity was null or undefined when calling SendToConversation.');
        }
        // verify required parameter 'conversationId' is not null or undefined
        if (conversationId == null) {
            throw new Error('Required parameter conversationId was null or undefined when calling SendToConversation.');
        }
        const path = this.basePath + '/v3/conversations/{conversationId}/activities'
            .replace('{' + 'conversationId' + '}', encodeURIComponent(String(conversationId)));
        let queryParameters = {};
        let headerParams = Object.assign({}, this._defaultHeaders);

        let url = new URL(path);
        Object.keys(queryParameters).forEach(key => url.searchParams.append(key, queryParameters[key]));
        Object.assign(headerParams, options.headers);

        let requestOptions = {
            method: 'POST',            
            headers: headerParams,
            body: JSON.stringify(activity),
            uri: path,                   
            proxy: options.proxyOptions
        };

        await this.credentials.signRequest(requestOptions);

        return this.deserializeResponse<Models.ConversationsSendToConversationResponse>(url, requestOptions);
    }

    /**
     * Edit an existing activity.
     * Some channels allow you to edit an existing activity to reflect the new state of a bot conversation.
     * For example, you can remove buttons after someone has clicked \"Approve\" button.
     * @summary UpdateActivity
     * @param activity replacement Activity
     * @param conversationId Conversation ID
     * @param activityId activityId to update
     */
    public async updateActivity(conversationId: string, activityId: string, activity: Activity, options: RequestOptions)
        : Promise<useResourceResponse> {

        // verify required parameter 'activity' is not null or undefined
        if (activity == null) {
            throw new Error('Required parameter activity was null or undefined when calling conversationsUpdateActivity.');
        }

        // verify required parameter 'conversationId' is not null or undefined
        if (conversationId == null) {
            throw new Error('Required parameter conversationId was null or undefined when calling conversationsUpdateActivity.');
        }

        // verify required parameter 'activityId' is not null or undefined
        if (activityId == null) {
            throw new Error('Required parameter activityId was null or undefined when calling conversationsUpdateActivity.');
        }
        const path = this.basePath + '/v3/conversations/{conversationId}/activities/{activityId}'
            .replace('{' + 'conversationId' + '}', encodeURIComponent(String(conversationId)))
            .replace('{' + 'activityId' + '}', encodeURIComponent(String(activityId)));
        let queryParameters: any = {};
        let headerParams: any = Object.assign({}, this._defaultHeaders);

        Object.assign(headerParams, options.headers);

        let formParams: any = {};
        let useFormData = false;
        let url = new URL(path)

        Object.keys(queryParameters).forEach(key => url.searchParams.append(key, queryParameters[key]));

        let requestOptions = {
            method: 'PUT',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(activity, "Activity"),
            proxy: options.proxyOptions
        };

        if (Object.keys(formParams).length) {
            useFormData ? requestOptions['formData'] = formParams : requestOptions['form'] = formParams;
        }

        await this.credentials.signRequest(requestOptions);

        return this.deserializeResponse<useResourceResponse>(url, requestOptions);
    }

    /**
     * Upload an attachment directly into a channel\'s blob storage.
     * This is useful because it allows you to store data in a compliant store when dealing with enterprises.
     * The response is a ResourceResponse which contains an AttachmentId which is suitable for using with
     * the attachments API.
     * @summary UploadAttachment
     * @param attachmentUpload Attachment data
     * @param conversationId Conversation ID
     */
    public async uploadAttachment(conversationId: string,
        attachmentUpload: AttachmentData, options: RequestOptions)
        : Promise<useResourceResponse> {
        // verify required parameter 'attachmentUpload' is not null or undefined
        if (attachmentUpload == null) {
            throw new Error('Required parameter attachmentUpload was null or undefined when calling conversationsUploadAttachment.');
        }

        // verify required parameter 'conversationId' is not null or undefined
        if (conversationId == null) {
            throw new Error('Required parameter conversationId was null or undefined when calling conversationsUploadAttachment.');
        }

        const path = this.basePath + '/v3/conversations/{conversationId}/attachments'
            .replace('{' + 'conversationId' + '}', encodeURIComponent(String(conversationId)));
        let queryParameters: any = {};
        let headerParams: any = Object.assign({}, this._defaultHeaders);

        Object.assign(headerParams, options.headers);

        let formParams: any = {};
        let useFormData = false;
        let url = new URL(path)

        Object.keys(queryParameters).forEach(key => url.searchParams.append(key, queryParameters[key]));

        let requestOptions = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(attachmentUpload, "AttachmentData"),
            proxy: options.proxyOptions
        };

        if (Object.keys(formParams).length) {
            useFormData ? requestOptions['formData'] = formParams : requestOptions['form'] = formParams;
        }

        await this.credentials.signRequest(requestOptions);

        return this.deserializeResponse<useResourceResponse>(url, requestOptions);
    }
}
