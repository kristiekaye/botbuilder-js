// This file has been autogenerated.

exports.setEnvironment = function() {
    process.env['USER_ID'] = 'UK8CH2281:TKGSUQHQE';
    process.env['BOT_ID'] = 'BKGSYSTFG:TKGSUQHQE';
    process.env['HOST_URL'] = 'https://slack.botframework.com';
    process.env['AZURE_SUBSCRIPTION_ID'] = '0389857f-2464-451b-ac83-5f54d565b1a7';
};

exports.scopes = [[function(nock) { 
    var result = 
nock('https://slack.botframework.com:443', {'encodedQueryParams':true})
    .filteringRequestBody(function(path) { return '*';})
    .post('/v3/conversations', '*')
    .reply(200, {'activityId':'1560983018.001600','id':'BKGSYSTFG:TKGSUQHQE:DKE8NUG92'}, [ 'Cache-Control',
        'no-cache',
        'Pragma',
        'no-cache',
        'Content-Length',
        '83',
        'Content-Type',
        'application/json; charset=utf-8',
        'Expires',
        '-1',
        'Server',
        'Microsoft-IIS/10.0',
        'x-ms-request-id',
        '|e9069ed42e03b94fb0f9554c56818e61.81c14fec_',
        'Strict-Transport-Security',
        'max-age=31536000',
        'Set-Cookie',
        'ARRAffinity=4074cd6b472d7d72b135637cefd7ef7029db6bdecaba57cb48c8606456f96880;Path=/;HttpOnly;Domain=slack.botframework.com',
        'Date',
        'Wed, 19 Jun 2019 22:23:38 GMT',
        'Connection',
        'close' ]);
    return result; }]];
