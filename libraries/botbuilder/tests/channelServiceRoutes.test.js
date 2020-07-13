const { ChannelServiceRoutes, ChannelServiceHandler, WebRequest, StatusCodes } = require('../');
const assert = require('assert');
const sinon = require('sinon');

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
        } catch (err) {
            this.done(err);
        }
    }

    status(code) {
        this.statusCode = code;
    }

    send(body) {
        this.body = body;
    }
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
        const req = {
            body: {
                type: ''
            },
            headers:{},
            params:{},
            query: {}
        };
        const testResource = { id: 'testId' };

        describe('processSendToConversation()', () => {
            it('should end successful', (done) => {
                try {
                    let res = new MockResponse({
                        statusCode: 200,
                        body: testResource
                    }, done);

                    let service = sinon.createStubInstance(ChannelServiceHandler);
                    service.handleSendToConversation = sinon.stub().resolves(testResource);

                    let channel = new ChannelServiceRoutes(service);
                    channel.processSendToConversation(req, res);
                } catch (err) {
                    done(err);
                }
            });
        });

        describe('processReplyToActivity()', () => {
            it('should end successful', (done) => {
                try{
                    let res = new MockResponse({
                        statusCode: 200,
                        body: testResource
                    }, done);

                    let service = sinon.createStubInstance(ChannelServiceHandler);
                    service.handleReplyToActivity = sinon.stub().resolves(testResource);

                    let channel = new ChannelServiceRoutes(service);
                    channel.processReplyToActivity(req, res);
                } catch (error) {
                    done(error);
                } 
            });
        });

        describe('processUpdateActivity()', () => {
            it('should end successful', (done) => {
                try{
                    let res = new MockResponse({
                        statusCode: 200,
                        body: testResource
                    }, done);

                    let service = sinon.createStubInstance(ChannelServiceHandler);
                    service.handleUpdateActivity = sinon.stub().resolves(testResource);

                    let channel = new ChannelServiceRoutes(service);
                    channel.processUpdateActivity(req, res);
                } catch (error) {
                    done(error);
                } 
            });
        });

        describe('processDeleteActivity()', () => {
            it('should end successful', (done) => {
                try{
                    let res = new MockResponse({
                        statusCode: 200,
                        body: {}
                    }, done);

                    let service = sinon.createStubInstance(ChannelServiceHandler);
                    service.handleDeleteActivity = sinon.stub().resolves();

                    let channel = new ChannelServiceRoutes(service);
                    channel.processDeleteActivity(req, res);
                } catch (error) {
                    done(error);
                } 
            });
        });

        describe('processGetActivityMembers()', () => {
            it('should end successful', (done) => {
                try{
                    let res = new MockResponse({
                        statusCode: 200,
                        body: testResource
                    }, done);

                    let service = sinon.createStubInstance(ChannelServiceHandler);
                    service.handleGetActivityMembers = sinon.stub().resolves(testResource);

                    let channel = new ChannelServiceRoutes(service);
                    channel.processGetActivityMembers(req, res);
                } catch (error) {
                    done(error);
                } 
            });
        });

        describe('processCreateConversation()', () => {
            it('should end successful', (done) => {
                try{
                    let res = new MockResponse({
                        statusCode: 201,
                        body: testResource
                    }, done);

                    let service = sinon.createStubInstance(ChannelServiceHandler);
                    service.handleCreateConversation = sinon.stub().resolves(testResource);

                    let channel = new ChannelServiceRoutes(service);
                    channel.processCreateConversation(req, res);
                } catch (error) {
                    done(error);
                } 
            });
        });

        describe('processGetConversations()', () => {
            it('should end successful', (done) => {
                try{
                    let res = new MockResponse({
                        statusCode: 200,
                        body: testResource
                    }, done);

                    let service = sinon.createStubInstance(ChannelServiceHandler);
                    service.handleGetConversations = sinon.stub().resolves(testResource);

                    let channel = new ChannelServiceRoutes(service);
                    channel.processGetConversations(req, res);
                } catch (error) {
                    done(error);
                } 
            });
        });

        describe('processGetConversationMembers()', () => {
            it('should end successful', (done) => {
                try{
                    let res = new MockResponse({
                        statusCode: 200,
                        body: testResource
                    }, done);

                    let service = sinon.createStubInstance(ChannelServiceHandler);
                    service.handleGetConversationMembers = sinon.stub().resolves(testResource);

                    let channel = new ChannelServiceRoutes(service);
                    channel.processGetConversationMembers(req, res);
                } catch (error) {
                    done(error);
                } 
            });
        });

        describe('processGetConversationPagedMembers()', () => {
            it('should end successful', (done) => {
                try{
                    let res = new MockResponse({
                        statusCode: 200,
                        body: testResource
                    }, done);

                    let service = sinon.createStubInstance(ChannelServiceHandler);
                    service.handleGetConversationPagedMembers = sinon.stub().resolves(testResource);

                    let channel = new ChannelServiceRoutes(service);
                    channel.processGetConversationPagedMembers(req, res);
                } catch (error) {
                    done(error);
                } 
            });
        });

        describe('processDeleteConversationMember()', () => {
            it('should end successful', (done) => {
                try{
                    let res = new MockResponse({
                        statusCode: 200,
                        body: {}
                    }, done);

                    let service = sinon.createStubInstance(ChannelServiceHandler);
                    service.handleDeleteConversationMember = sinon.stub().resolves(testResource);

                    let channel = new ChannelServiceRoutes(service);
                    channel.processDeleteConversationMember(req, res);
                } catch (error) {
                    done(error);
                } 
            });
        });

        describe('processSendConversationHistory()', () => {
            it('should end successful', (done) => {
                try{
                    let res = new MockResponse({
                        statusCode: 200,
                        body: testResource
                    }, done);

                    let service = sinon.createStubInstance(ChannelServiceHandler);
                    service.handleSendConversationHistory = sinon.stub().resolves(testResource);

                    let channel = new ChannelServiceRoutes(service);
                    channel.processSendConversationHistory(req, res);
                } catch (error) {
                    done(error);
                } 
            });
        });

        describe('processUploadAttachment()', () => {
            it('should end successful', (done) => {
                try{
                    let res = new MockResponse({
                        statusCode: 200,
                        body: testResource
                    }, done);

                    let service = sinon.createStubInstance(ChannelServiceHandler);
                    service.handleUploadAttachment = sinon.stub().resolves(testResource);

                    let channel = new ChannelServiceRoutes(service);
                    channel.processUploadAttachment(req, res);
                } catch (error) {
                    done(error);
                } 
            });
        });

        describe('readActivity()', async () => {
            it('should throw with invalid body', async () => {
                let req = sinon.mock(WebRequest);
                req.body = {};

                ChannelServiceRoutes.readActivity(req).catch(err => {
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

                ChannelServiceRoutes.readActivity(req).then((activity) => {
                    assert.strictEqual(activity.type, 'testactivity');
                });
            });
        });
    });
});
;