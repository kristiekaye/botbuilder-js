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
    .reply(200, {'id':'BKGSYSTFG:TKGSUQHQE:DKE8NUG92'}, [ 'Cache-Control',
        'no-cache',
        'Pragma',
        'no-cache',
        'Content-Length',
        '45',
        'Content-Type',
        'application/json; charset=utf-8',
        'Expires',
        '-1',
        'Server',
        'Microsoft-IIS/10.0',
        'x-ms-request-id',
        '|3ac53080e639eb40a7387dd71c350c92.81c15006_',
        'Strict-Transport-Security',
        'max-age=31536000',
        'Date',
        'Wed, 19 Jun 2019 22:23:42 GMT',
        'Connection',
        'close' ]);
    return result; },
function(nock) { 
    var result = 
nock('https://slack.botframework.com:443', {'encodedQueryParams':true})
    .filteringRequestBody(function(path) { return '*';})
    .post('/v3/conversations/BKGSYSTFG%3ATKGSUQHQE%3ADKE8NUG92/activities', '*')
    .reply(200, {'id':'1560983023.002400'}, [ 'Cache-Control',
        'no-cache',
        'Pragma',
        'no-cache',
        'Content-Length',
        '33',
        'Content-Type',
        'application/json; charset=utf-8',
        'Expires',
        '-1',
        'Server',
        'Microsoft-IIS/10.0',
        'x-ms-request-id',
        '|0d2a16ab2cb17249ba6f6667af9ad0c4.81c15007_',
        'Strict-Transport-Security',
        'max-age=31536000',
        'Date',
        'Wed, 19 Jun 2019 22:23:42 GMT',
        'Connection',
        'close' ]);
    return result; },
function(nock) { 
    var result = 
nock('https://slack.botframework.com:443', {'encodedQueryParams':true})
    .filteringRequestBody(function(path) { return '*';})
    .post('/v3/conversations/invalid-id/activities/1560983023.002400', '*')
    .reply(400, {'error':{'code':'ServiceError','message':'Invalid ConversationId: invalid-id'}}, [ 'Cache-Control',
        'no-cache',
        'Pragma',
        'no-cache',
        'Content-Length',
        '105',
        'Content-Type',
        'application/json; charset=utf-8',
        'Expires',
        '-1',
        'Server',
        'Microsoft-IIS/10.0',
        'x-ms-request-id',
        '|83c1f293e9bbdb42970de9705a3bca86.81c15008_',
        'Strict-Transport-Security',
        'max-age=31536000',
        'Date',
        'Wed, 19 Jun 2019 22:23:42 GMT',
        'Connection',
        'close' ]);
    return result; }]];
