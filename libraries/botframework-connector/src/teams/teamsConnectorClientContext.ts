/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */
// This code has been manually edited to reflect the integration of the Teams schemas into botframework-schema
// and the botframework-connector libraries.

import {
    ServiceClientCredentials,
    ServiceClient
} from '@azure/ms-rest-js';
import { TeamsConnectorClientOptions } from './models';

export class TeamsConnectorClientContext extends ServiceClient {
    credentials: ServiceClientCredentials;

    /**
   * Initializes a new instance of the TeamsConnectorClientContext class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param [options] The parameter options
   */
    constructor(credentials: ServiceClientCredentials, options?: TeamsConnectorClientOptions) {

        if (!options) {
            options = {};
        }

        super(credentials, options);

        this.baseUri = options.baseUri || this.baseUri || 'https://api.botframework.com';
        this.requestContentType = 'application/json; charset=utf-8';
        this.credentials = credentials;
    }
}
