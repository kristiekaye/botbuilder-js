import * as msRest from "@azure/ms-rest-js";
import * as Models from "../models";
import { TokenApiClientContext } from "../tokenApiClientContext";
/** Class representing a BotSignIn. */
export declare class BotSignIn {
    private readonly client;
    /**
     * Create a BotSignIn.
     * @param {TokenApiClientContext} client Reference to the service client.
     */
    constructor(client: TokenApiClientContext);
    /**
     * @param state
     * @param [options] The optional parameters
     * @returns Promise<Models.BotSignInGetSignInUrlResponse>
     */
    getSignInUrl(state: string, options?: Models.BotSignInGetSignInUrlOptionalParams): Promise<Models.BotSignInGetSignInUrlResponse>;
    /**
     * @param state
     * @param callback The callback
     */
    getSignInUrl(state: string, callback: msRest.ServiceCallback<string>): void;
    /**
     * @param state
     * @param options The optional parameters
     * @param callback The callback
     */
    getSignInUrl(state: string, options: Models.BotSignInGetSignInUrlOptionalParams, callback: msRest.ServiceCallback<string>): void;
}
//# sourceMappingURL=botSignIn.d.ts.map