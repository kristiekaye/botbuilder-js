var fs = require('fs');
var path = require('path');

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
        '|a67bd11272e64141b015ec153ad2b6ab.81c1501d_',
        'Strict-Transport-Security',
        'max-age=31536000',
        'Date',
        'Wed, 19 Jun 2019 22:23:46 GMT',
        'Connection',
        'close' ]);
    return result; },
function(nock) { 
    var result = 
nock('https://slack.botframework.com:443', {'encodedQueryParams':true})
    .filteringRequestBody(function(path) { return '*';})
    .post('/v3/conversations/BKGSYSTFG%3ATKGSUQHQE%3ADKE8NUG92/attachments', '*')
    .reply(200, {'id':'at26759-2fLhhkrz9KJ-e'}, [ 'Cache-Control',
        'no-cache',
        'Pragma',
        'no-cache',
        'Content-Length',
        '37',
        'Content-Type',
        'application/json; charset=utf-8',
        'Expires',
        '-1',
        'Server',
        'Microsoft-IIS/10.0',
        'x-ms-request-id',
        '|055193c56d70f44fa7ccc19c08f751a4.81c1501e_',
        'Strict-Transport-Security',
        'max-age=31536000',
        'Date',
        'Wed, 19 Jun 2019 22:23:46 GMT',
        'Connection',
        'close' ]);
    return result; },
function(nock) { 
    var result = 
nock('https://slack.botframework.com:443', {'encodedQueryParams':true})
    .get('/v3/attachments/at26759-2fLhhkrz9KJ-e')
    .reply(200, {'name':'bot-framework.png','type':'image/png','views':[{'viewId':'original','size':8369}]}, [ 'Cache-Control',
        'no-cache',
        'Pragma',
        'no-cache',
        'Content-Length',
        '142',
        'Content-Type',
        'application/json; charset=utf-8',
        'Expires',
        '-1',
        'Server',
        'Microsoft-IIS/10.0',
        'x-ms-request-id',
        '|b8cf27161f46404ca704be0387d4c4f4.81c1501f_',
        'Strict-Transport-Security',
        'max-age=31536000',
        'Date',
        'Wed, 19 Jun 2019 22:23:46 GMT',
        'Connection',
        'close' ]);
    return result; },
function(nock) { 
    var result = 
nock('https://slack.botframework.com:443', {'encodedQueryParams':true})
    .get('/v3/attachments/at26759-2fLhhkrz9KJ-e/views/original')
    .reply(200, () => {
        return fs.createReadStream(path.join(__dirname, '../bot-framework.png'));
    }, [ 'Cache-Control',
        'no-cache',
        'Pragma',
        'no-cache',
        'Content-Length',
        '8369',
        'Content-Type',
        'image/png',
        'Expires',
        '-1',
        'Server',
        'Microsoft-IIS/10.0',
        'x-ms-request-id',
        '|c4ebe346cbf66044898a95dfe2aa98b7.81c15020_',
        'Content-Disposition',
        'attachment; filename=bot-framework.png; size=8369',
        'Strict-Transport-Security',
        'max-age=31536000',
        'Date',
        'Wed, 19 Jun 2019 22:23:46 GMT',
        'Connection',
        'close' ]);
    return result; }]];
