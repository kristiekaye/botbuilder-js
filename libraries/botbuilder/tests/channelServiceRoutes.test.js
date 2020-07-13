const { ChannelServiceRoutes, ChannelServiceHandler, WebRequest, WebResponse, StatusCodes } = require('../');
const assert = require('assert');
const sinon = require('sinon');
const { Activity } = require('botframework-connector/lib/connectorApi/models/mappers');
const { spy } = require('sinon');
const { send } = require('process');

class MockResponse {
    constructor(expects, done) {
        this.expects = expects;
        this.statusCode = 0;
        this.body = {};
        this.done = done;
    }

    end() {
        try {
            assert.deepStrictEqual(this.statusCode, this.expects.statusCode, 'not equal');
            assert.deepStrictEqual(this.body, this.expects.body, 'not equal');
            this.done();
        } catch (error) {
            console.log('error')
            this.done(error)
        }
    }

    status(code) {
        this.statusCode = code;
    }

    send(body) {
        this.body = body;
    }
}

class ExposedChannelServiceRoutes extends ChannelServiceRoutes {
    processSendToConversation(req, res) {
        super.processSendToConversation(req, res);
    };

    processReplyToActivity(req, res) {
        super.processReplyToActivity(req, res);
    };

    processUpdateActivity(req, res) {
        super.processUpdateActivity(req, res);
    };

    processDeleteActivity(req, res) {
        super.processDeleteActivity(req, res);
    };

    processGetActivityMembers(req, res) {
        super.processGetActivityMembers(req, res);
    };

    processCreateConversation(req, res) {
        super.processCreateConversation(req, res);
    };

    processGetConversations(req, res) {
        super.processGetConversations(req, res);
    };

    processGetConversationMembers(req, res) {
        super.processGetConversationMembers(req, res);
    };

    processGetConversationPagedMembers(req, res) {
        super.processGetConversationPagedMembers(req, res);
    };

    processDeleteConversationMember(req, res) {
        super.processDeleteConversationMember(req, res);
    };

    processSendConversationHistory(req, res) {
        super.processSendConversationHistory(req, res);
    };

    processUploadAttachment(req, res) {
        super.processUploadAttachment(req, res);
    };

    static async readActivity(req) {
        return ChannelServiceRoutes.readActivity(req);
    };

    static async readBody(req) {
        return ChannelServiceRoutes.readBody(req);
    };
}

describe('channelServiceRoutes', function() {
    describe('constructor()', () => {
        it('should succed with correct parameters', () => {
            let testHandler = sinon.mock(ChannelServiceHandler);
            let channelServiceRoutes = new ChannelServiceRoutes(testHandler);

            assert.strictEqual(channelServiceRoutes.channelServiceHandler, testHandler);
        });
    });

    describe('register()', () => {
        let testHandler = sinon.mock(ChannelServiceHandler);
        let channel = new ChannelServiceRoutes(testHandler);
        let server = {
            post: sinon.spy(),
            get: sinon.spy(),
            put: sinon.spy(),
            del: sinon.spy(),
        };

        it('should register webservers', () => {
            channel.register(server, 'test');

            assert(server.post.calledWith('test/v3/conversations/:conversationId/activities'));
            assert(server.post.calledWith('test/v3/conversations/:conversationId/activities/:activityId'));
            assert(server.post.calledWith('test/v3/conversations/:conversationId/activities/history'));
            assert(server.post.calledWith('test/v3/conversations'));
            assert(server.post.calledWith('test/v3/conversations/:conversationId/attachments'));
            assert(server.get.calledWith('test/v3/conversations/:conversationId/activities/:activityId/members'));
            assert(server.get.calledWith('test/v3/conversations'));
            assert(server.get.calledWith('test/v3/conversations/:conversationId/members'));
            assert(server.get.calledWith('test/v3/conversations/:conversationId/pagedmembers'));
            assert(server.put.calledWith('test/v3/conversations/:conversationId/activities/:activityId'));
            assert(server.del.calledWith('test/v3/conversations/:conversationId/members/:memberId'));
            assert(server.del.calledWith('test/v3/conversations/:conversationId/activities/:activityId'));
        });
    });

    describe('private functions', () => {
        describe('processSendToConversation()', () => {
            it('should do something', (done) => {
                try {
                    const resourceResponse = { id: 'random' };

                    var service = sinon.createStubInstance(ChannelServiceHandler);

                    service.handleSendToConversation = sinon.stub().resolves(resourceResponse)

                    let channel = new ChannelServiceRoutes(service);

                    const req = {
                        body: {
                            type: ''
                        },
                        headers:{},
                        params:{}
                    };

                    let res = new MockResponse({
                        statusCode: 300,
                        body: resourceResponse
                    }, done);

                    channel.processSendToConversation(req, res)
                } catch (error) {
                    done(error);
                }
            });
        });

        describe('readActivity()', async () => {
            it('should throw with invalid body', async () => {
                let req = sinon.mock(WebRequest);
                req.body = {};

                ExposedChannelServiceRoutes.readActivity(req).catch(err => {
                    assert.strictEqual(err.statusCode, StatusCodes.BAD_REQUEST);
                });
            });

            it('should return activity', async () => {
                let req = sinon.mock(WebRequest);
                req.body = {
                    type: 'testactivity',
                    timestamp: Date.now(),
                    expiration: '2200-01-01',
                    localTimeStamp: Date.now(),
                };

                ExposedChannelServiceRoutes.readActivity(req).then((activity) => {
                    assert.strictEqual(activity.type, 'testactivity');
                });
            });
        });
    });
});
;