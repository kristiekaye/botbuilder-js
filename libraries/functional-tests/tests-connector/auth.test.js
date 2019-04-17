const assert = require('assert');
const { ChannelValidation, ClaimsIdentity, EndorsementsValidator, EnterpriseChannelValidation,
    GovernmentChannelValidation, JwtTokenValidation, MicrosoftAppCredentials, SimpleCredentialProvider } = require('../lib');
const Connector = require('../lib');

describe('Bot Framework Connector - Auth Tests', function () {

    describe('Connector Tokens', function () {
        this.timeout(20000);

        describe('EmptyHeader', function () {
            it('Bot with noCredentials should throw', async () => {
                var credentials = new SimpleCredentialProvider('', '');
                try {
                    const claims = await JwtTokenValidation.validateAuthHeader('', credentials, undefined, '', '');
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message === `'authHeader' required.`, `unexpected error thrown: "${ err.message }"`);
                }
            });
        });

        describe('Emulator', function () {
            it('MsaHeader correct AppId and ServiceUrl should validate', async () => {
                const tokenGenerator = new MicrosoftAppCredentials('2cd87869-38a0-4182-9251-d056e8f0ac24', '2.30Vs3VQLKt974F');
                const header = `Bearer ${ await tokenGenerator.getToken(true) }`;
                const credentials = new SimpleCredentialProvider('2cd87869-38a0-4182-9251-d056e8f0ac24', '');
                const claims = await JwtTokenValidation.validateAuthHeader(header, credentials, undefined, '', '');
                assert(claims.isAuthenticated);
            });

            it('MsaHeader Bot AppId differs should not validate', async () => {
                const tokenGenerator = new MicrosoftAppCredentials('2cd87869-38a0-4182-9251-d056e8f0ac24', '2.30Vs3VQLKt974F');
                const header = `Bearer ${ await tokenGenerator.getToken(true) }`;
                const credentials = new SimpleCredentialProvider('00000000-0000-0000-0000-000000000000', '');
                try {
                    const claims = await JwtTokenValidation.validateAuthHeader(header, credentials, undefined, '', '');
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message.substring('Unauthorized. Invalid AppId passed on token:'), `unexpected error thrown: "${ err.message }"`);
                }
            });

            it('MsaHeader Bot AppId missing should not validate', async () => {
                const tokenGenerator = new MicrosoftAppCredentials('2cd87869-38a0-4182-9251-d056e8f0ac24', '2.30Vs3VQLKt974F');
                const header = `Bearer ${ await tokenGenerator.getToken(true) }`;
                const credentials = new SimpleCredentialProvider('', '');
                try {
                    const claims = await JwtTokenValidation.validateAuthHeader(header, credentials, undefined, '', '');
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message.substring('Unauthorized. Invalid AppId passed on token:'), `unexpected error thrown: "${ err.message }"`);
                }
            });
        });

        describe('Channel', function () {
            it('MsaHeader with valid ServiceUrl should be trusted', async () => {
                const tokenGenerator = new MicrosoftAppCredentials('2cd87869-38a0-4182-9251-d056e8f0ac24', '2.30Vs3VQLKt974F');
                const header = `Bearer ${ await tokenGenerator.getToken(true) }`;
                const credentials = new SimpleCredentialProvider('2cd87869-38a0-4182-9251-d056e8f0ac24', '');
                const claims = await JwtTokenValidation.authenticateRequest({ serviceUrl: 'https://smba.trafficmanager.net/amer-client-ss.msg/' }, header, credentials, undefined);
                assert(MicrosoftAppCredentials.isTrustedServiceUrl('https://smba.trafficmanager.net/amer-client-ss.msg/'));
            });

            it('MsaHeader with invalid ServiceUrl should not be trusted', async () => {
                const tokenGenerator = new MicrosoftAppCredentials('2cd87869-38a0-4182-9251-d056e8f0ac24', '2.30Vs3VQLKt974F');
                const header = `Bearer ${ await tokenGenerator.getToken(true) }`;
                const credentials = new SimpleCredentialProvider('7f74513e-6f96-4dbc-be9d-9a81fea22b88', '');
                try {
                    const claims = await JwtTokenValidation.authenticateRequest({ serviceUrl: 'https://webchat.botframework.com/' }, header, credentials, undefined);
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(!MicrosoftAppCredentials.isTrustedServiceUrl('https://webchat.botframework.com/'));
                }
            });

            it('with AuthenticationDisabled should be anonymous', async () => {
                const credentials = new SimpleCredentialProvider('', '');
                const claims = await JwtTokenValidation.authenticateRequest({ serviceUrl: 'https://webchat.botframework.com/' }, '', credentials, undefined);
                assert(claims.isAuthenticated);
                assert.equal(claims.claims.length, 0);
            });

            it('with authentication disabled and serviceUrl should not be trusted', async () => {
                const credentials = new SimpleCredentialProvider('', '');
                const claims = await JwtTokenValidation.authenticateRequest({ serviceUrl: 'https://webchat.botframework.com/' }, '', credentials, undefined);
                assert(claims.isAuthenticated);
                assert(!MicrosoftAppCredentials.isTrustedServiceUrl('https://webchat.botframework.com/'));
            });
        });

        describe('EndorsementsValidator', function () {
            it('with null channelId should pass', function (done) {
                var isEndorsed = EndorsementsValidator.validate(null, []);
                assert(isEndorsed);
                done();
            });

            it('with null endorsements should throw', (done) => {
                assert.throws(() => EndorsementsValidator.validate('foo', null));
                done();
            });

            it('with unendorsed channelId should fail', function (done) {
                var isEndorsed = EndorsementsValidator.validate('channelOne', []);
                assert(!isEndorsed);
                done();
            });

            it('with mismatched endorsements should fail', (done) => {
                var isEndorsed = EndorsementsValidator.validate('right', ['wrong']);
                assert(!isEndorsed);
                done();
            });

            it('with endorsed channelId should pass', (done) => {
                var isEndorsed = EndorsementsValidator.validate('right', ['right']);
                assert(isEndorsed);
                done();
            });

            it('with endorsed channelId and many endorsements should pass', (done) => {
                var isEndorsed = EndorsementsValidator.validate('right', ['wrong', 'right']);
                assert(isEndorsed);
                done();
            });

            it('with empty channelId should pass', (done) => {
                var isEndorsed = EndorsementsValidator.validate('', ['wrong', 'right']);
                assert(isEndorsed);
                done();
            });
        });

        describe('ChannelValidator', function () {
            it('validateIdentity should fail if unauthenticated', async () => {
                try {
                    const claims = await ChannelValidation.validateIdentity(new ClaimsIdentity([], false), undefined);
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message === 'Unauthorized. Is not authenticated', `unexpected error thrown: "${ err.message }"`);
                }
            });

            it('validateIdentity should fail if no identity', async () => {
                try {
                    const claims = await ChannelValidation.validateIdentity(undefined, undefined);
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message === 'Unauthorized. Is not authenticated', `unexpected error thrown: "${ err.message }"`);
                }
            });

            it('validateIdentity should fail if no issuer', async () => {
                const credentials = new SimpleCredentialProvider('2cd87869-38a0-4182-9251-d056e8f0ac24', '2.30Vs3VQLKt974F');
                try {
                    const claims = await ChannelValidation.validateIdentity(new ClaimsIdentity([{ type: 'peanut', value: 'peanut' }], true), credentials);
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message === 'Unauthorized. Issuer Claim MUST be present.', `unexpected error thrown: "${ err.message }"`);
                }
            });

            it('validateIdentity should fail if wrong issuer', async () => {
                var credentials = new SimpleCredentialProvider('2cd87869-38a0-4182-9251-d056e8f0ac24', '2.30Vs3VQLKt974F');
                try {
                    const claims = await ChannelValidation.validateIdentity(new ClaimsIdentity([{ type: 'iss', value: 'peanut' }], true), credentials);
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message === 'Unauthorized. Issuer Claim MUST be present.', `unexpected error thrown: "${ err.message }"`);
                }
            });

            it('validateIdentity should fail if no audience', async () => {
                const credentials = new SimpleCredentialProvider('2cd87869-38a0-4182-9251-d056e8f0ac24', '2.30Vs3VQLKt974F');
                try {
                    await ChannelValidation.validateIdentity(new ClaimsIdentity([{ type: 'iss', value: 'https://api.botframework.com' }], true), credentials);
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message === 'Unauthorized. Invalid AppId passed on token: null', `unexpected error thrown: "${ err.message }"`);
                }
            });

            it('validateIdentity should fail if wrong audience', async () => {
                var credentials = new SimpleCredentialProvider('2cd87869-38a0-4182-9251-d056e8f0ac24', '2.30Vs3VQLKt974F');
                try {
                    const claims = await ChannelValidation.validateIdentity(new ClaimsIdentity([
                        { type: 'iss', value: 'https://api.botframework.com' },
                        { type: 'aud', value: 'peanut' }
                    ], true), credentials);
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message === 'Unauthorized. Invalid AppId passed on token: peanut', `unexpected error thrown: "${ err.message }"`);
                }
            });

            it('validateIdentity should work', async () => {
                var credentials = new SimpleCredentialProvider('2cd87869-38a0-4182-9251-d056e8f0ac24', '2.30Vs3VQLKt974F');
                const claims = await ChannelValidation.validateIdentity(new ClaimsIdentity([
                    { type: 'iss', value: 'https://api.botframework.com' },
                    { type: 'aud', value: credentials.appId }
                ], true), credentials);
            });
        });

        describe('GovernmentChannelValidator', function () {
            it('validateIdentity should fail if unauthenticated', async () => {
                try {
                    const claims = await GovernmentChannelValidation.validateIdentity(new ClaimsIdentity([], false), undefined);
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message === 'Unauthorized. Is not authenticated', `unexpected error thrown: "${ err.message }"`);
                }
            });

            it('validateIdentity should fail if no identity', async () => {
                try {
                    const claims = await GovernmentChannelValidation.validateIdentity(new ClaimsIdentity([], false), undefined);
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message === 'Unauthorized. Is not authenticated', `unexpected error thrown: "${ err.message }"`);
                }
            });

            it('validateIdentity should fail if no issuer', async () => {
                var credentials = new SimpleCredentialProvider('2cd87869-38a0-4182-9251-d056e8f0ac24', '2.30Vs3VQLKt974F');
                try {
                    const claims = await GovernmentChannelValidation.validateIdentity(new ClaimsIdentity([{ type: 'peanut', value: 'peanut' }], true), credentials);
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message === 'Unauthorized. Issuer Claim MUST be present.', `unexpected error thrown: "${ err.message }"`);
                }
            });

            it('validateIdentity should fail if wrong issuer', async () => {
                var credentials = new SimpleCredentialProvider('2cd87869-38a0-4182-9251-d056e8f0ac24', '2.30Vs3VQLKt974F');
                try {
                    const claims = await GovernmentChannelValidation.validateIdentity(new ClaimsIdentity([{ type: 'iss', value: 'peanut' }], true), credentials);
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message === 'Unauthorized. Issuer Claim MUST be present.', `unexpected error thrown: "${ err.message }"`);
                }
            });

            it('validateIdentity should fail if no audience', async () => {
                var credentials = new SimpleCredentialProvider('2cd87869-38a0-4182-9251-d056e8f0ac24', '2.30Vs3VQLKt974F');
                try {
                    const claims = await GovernmentChannelValidation.validateIdentity(new ClaimsIdentity([{ type: 'iss', value: 'https://api.botframework.us' }], true), credentials);
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message === 'Unauthorized. Invalid AppId passed on token: null', `unexpected error thrown: "${ err.message }"`);
                }
            });

            it('validateIdentity should fail if wrong audience', async () => {
                var credentials = new SimpleCredentialProvider('2cd87869-38a0-4182-9251-d056e8f0ac24', '2.30Vs3VQLKt974F');
                try {
                    const claims = await GovernmentChannelValidation.validateIdentity(new ClaimsIdentity([
                        { type: 'iss', value: 'https://api.botframework.us' },
                        { type: 'aud', value: 'peanut' }
                    ], true), credentials);
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message === 'Unauthorized. Invalid AppId passed on token: peanut', `unexpected error thrown: "${ err.message }"`);
                }
            });

            it('validateIdentity should work', async () => {
                var credentials = new SimpleCredentialProvider('2cd87869-38a0-4182-9251-d056e8f0ac24', '2.30Vs3VQLKt974F');
                try {
                    const claims = await GovernmentChannelValidation.validateIdentity(new ClaimsIdentity([
                        { type: 'iss', value: 'https://api.botframework.us' },
                        { type: 'aud', value: credentials.appId }
                    ], true), credentials);
                } catch (err) {
                    throw err;
                }
            });
        });

        describe('EnterpriseChannelValidator', function () {
            it('validateIdentity should fail if unauthenticated', async () => {
                try {
                    const claims = await EnterpriseChannelValidation.validateIdentity(new ClaimsIdentity([], false), undefined);
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message === 'Unauthorized. Is not authenticated', `unexpected error thrown: "${ err.message }"`);
                }
            });

            it('validateIdentity should fail if no identity', async () => {
                try {
                    const claims = await EnterpriseChannelValidation.validateIdentity(undefined, undefined);
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message === 'Unauthorized. No valid identity.', `unexpected error thrown: "${ err.message }"`);
                }
            });

            it('validateIdentity should fail if no issuer', async () => {
                var credentials = new SimpleCredentialProvider('2cd87869-38a0-4182-9251-d056e8f0ac24', '2.30Vs3VQLKt974F');
                try {
                    const claims = await EnterpriseChannelValidation.validateIdentity(new ClaimsIdentity([{ type: 'peanut', value: 'peanut' }], true), credentials);
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message === 'Unauthorized. Issuer Claim MUST be present.', `unexpected error thrown: "${ err.message }"`);
                }
            });

            it('validateIdentity should fail if wrong issuer', async () => {
                var credentials = new SimpleCredentialProvider('2cd87869-38a0-4182-9251-d056e8f0ac24', '2.30Vs3VQLKt974F');
                try {
                    const claims = await EnterpriseChannelValidation.validateIdentity(new ClaimsIdentity([{ type: 'iss', value: 'peanut' }], true), credentials);
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message === 'Unauthorized. Issuer Claim MUST be present.', `unexpected error thrown: "${ err.message }"`);
                }
            });

            it('validateIdentity should fail if no audience', async () => {
                var credentials = new SimpleCredentialProvider('2cd87869-38a0-4182-9251-d056e8f0ac24', '2.30Vs3VQLKt974F');
                try {
                    const claims = await EnterpriseChannelValidation.validateIdentity(new ClaimsIdentity([{ type: 'iss', value: 'https://api.botframework.com' }], true), credentials)
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message === 'Unauthorized. Invalid AppId passed on token: null', `unexpected error thrown: "${ err.message }"`);
                }
            });

            it('validateIdentity should fail if wrong audience', async () => {
                var credentials = new SimpleCredentialProvider('2cd87869-38a0-4182-9251-d056e8f0ac24', '2.30Vs3VQLKt974F');
                try {
                    const claims = await EnterpriseChannelValidation.validateIdentity(new ClaimsIdentity([
                        { type: 'iss', value: 'https://api.botframework.com' },
                        { type: 'aud', value: 'peanut' }
                    ], true), credentials);
                    throw new Error('Expected validation to fail.');
                } catch (err) {
                    assert(err.message === 'Unauthorized. Invalid AppId passed on token: peanut', `unexpected error thrown: "${ err.message }"`);
                }
            });

            it('validateIdentity should work', async () => {
                var credentials = new SimpleCredentialProvider('2cd87869-38a0-4182-9251-d056e8f0ac24', '2.30Vs3VQLKt974F');
                try {
                    const claims = await EnterpriseChannelValidation.validateIdentity(new ClaimsIdentity([
                        { type: 'iss', value: 'https://api.botframework.com' },
                        { type: 'aud', value: credentials.appId }
                    ], true), credentials);
                } catch (err) {
                    throw err;
                }
            });
        });
    });
});