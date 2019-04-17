const assert = require('assert');
const { TestAdapter, TurnContext } = require('botbuilder-core');
const { QnAMaker } = require('../');
const nock = require('nock');
const fs = require('fs');

// Save test keys
const knowledgeBaseId = process.env.QNAKNOWLEDGEBASEID;
const endpointKey = process.env.QNAENDPOINTKEY;
const hostname = process.env.QNAHOSTNAME || 'botbuilder-test-app';
const forceMockQnA = false;
const mockQnA = forceMockQnA || !(knowledgeBaseId && endpointKey);

class TestContext extends TurnContext {
    constructor(request) {
        super(new TestAdapter(), request);
        this.sent = [];
        this.onSendActivities((context, activities, next) => {
            this.sent = this.sent.concat(activities);
            context.responded = true;
        });
    }
}

describe('QnAMaker', function () {
    const testFiles = fs.readdirSync(`${ __dirname }/TestData/${ this.title }/`);

    if (!knowledgeBaseId) {
        console.warn('WARNING: QnAMaker test suite QNAKNOWLEDGEBASEID environment variable is not defined');
    }
    if (!endpointKey) {
        console.warn('WARNING: QnAMaker test suite QNAENDPOINTKEY environment variable is not defined');
    }
    if (mockQnA) {
        console.info('INFO: QnAMaker test suite will execute using mocked responses');
    }

    // Generate endpoints
    const endpoint = {
        knowledgeBaseId: knowledgeBaseId,
        endpointKey: endpointKey,
        host: `https://${ hostname }.azurewebsites.net/qnamaker`
    }

    beforeEach(function(done){
        nock.cleanAll();
        if (mockQnA) {
            var fileName = replaceCharacters(this.currentTest.title);
            var filePath = `${ __dirname }/TestData/${ this.test.parent.title }/`;
            var arr = testFiles.filter(function(file) { return file.startsWith(fileName + '.')} );

            arr.forEach(file => {
                nock(`https://${ hostname }.azurewebsites.net`)
                    .matchHeader('User-Agent', /botbuilder-ai\/4.*/)
                    .post(/qnamaker/)
                    .replyWithFile(200, filePath + file);
            });
        }
        done();
    })

    afterEach(function(done){
        nock.cleanAll();
        done();
    });

    function replaceCharacters (testName, testDesc) {
        return testName
        .replace(/"/g, '')
        .replace(/ /g, '_');
    }

    describe('Instantiation', function() {
        it('should instantiate a QnAMaker class successfully with QnAMakerEndpoint, but without options specified', function() {
            new QnAMaker(endpoint);
        });

        it('should instantiate a QnAMaker class successfully with both QnAMakerEndpoint and QnAMakerOptions args', function() {
            const options = { top: 7 };
            const qnaWithOptions = new QnAMaker(endpoint, options);

            assert.strictEqual(qnaWithOptions._options.top, options.top);
        });

        it('should throw an error instantiating without QnAMakerEndpoint', function() {
            assert.throws(() => new QnAMaker(), new TypeError('QnAMaker requires valid QnAMakerEndpoint.'));
        });

        it('should throw TypeError if QnAMakerOptions.scoreThreshold is not a number during QnAMaker instantiation', function() {
            const context = new TestContext({ text: 'what happens when you hug a porcupine?' });
            const stringScoreThreshold_options = { scoreThreshold: "I should be a number, but I'm not." };
            const nonNumberError = new TypeError(`"${stringScoreThreshold_options.scoreThreshold}" is an invalid scoreThreshold. QnAMakerOptions.scoreThreshold must have a value between 0 and 1.`)
            
            function createQnAWithInvalidThreshold() {
                new QnAMaker(context, stringScoreThreshold_options);
            }

            assert.throws(() => createQnAWithInvalidThreshold(), nonNumberError);
        });

        it('should throw error if QnAMakerOptions.scoreThreshold is not a number between 0 and 1 during QnAMaker instantiation.', function () {
            const context = new TestContext({ text: 'do woodpeckers get concussions?' });
            const outOfRangeScoreThreshold_options = { scoreThreshold: 9000 };
            const error = new TypeError(`"${outOfRangeScoreThreshold_options.scoreThreshold}" is an invalid scoreThreshold. QnAMakerOptions.scoreThreshold must have a value between 0 and 1.`)

            function createQnaWithOutOfRangeThreshold() {
                new QnAMaker(context, outOfRangeScoreThreshold_options);
            }

            assert.throws(() => createQnaWithOutOfRangeThreshold(), error);
        });

        it('should throw RangeError if QnAMakerOptions.top is not an integer during instantiation', function() {
            const context = new TestContext({ text: 'what if ostriches could fly?' });
            const decimalNumberTopOptions = { top: 2.5 };
            const notAnIntegerError = new RangeError(`"${decimalNumberTopOptions.top}" is an invalid top value. QnAMakerOptions.top must be an integer greater than 0.`);

            function createQnaWithDecimalTopOption() {
                new QnAMaker(context, decimalNumberTopOptions);
            }

            assert.throws(() => createQnaWithDecimalTopOption(), notAnIntegerError);
        });

        it('should throw error if QnAMaker.top is not a number during instantiation', function() {
            const context = new TestContext({ text: 'why were there sloths at the post office?' });
            const objectTopOptions = { top: { 'key': 'value' } };
            const nonNumberError = new RangeError(`"${objectTopOptions.top}" is an invalid top value. QnAMakerOptions.top must be an integer greater than 0.`);

            function createQnaWithObjectTopOption() {
                new QnAMaker(context, objectTopOptions);
            }

            assert.throws(() => createQnaWithObjectTopOption(), nonNumberError);
        });

        it('should throw RangeError if QnAMaker.top is not an integer greater than 1', function() {
           const context = new TestContext({ text: 'why did my son think the wasabi was guacamole?' });
           const smallerThanOneTopOptions = { top: -1 };
           const notGreaterThanOneError = new RangeError(`"${smallerThanOneTopOptions.top}" is an invalid top value. QnAMakerOptions.top must be an integer greater than 0.`);

            function createQnaWithNegativeTopOption() {
                new QnAMaker(context, smallerThanOneTopOptions);
            }

            assert.throws(() => createQnaWithNegativeTopOption(), notGreaterThanOneError);
        });
    });

    describe('getAnswers()', function() {

        it('should return answer without any options specified', async function() {
            const noOptionsQnA = new QnAMaker(endpoint);
            const noOptionsContext = new TestContext({ text: 'where are the unicorns?' })
            const defaultNumberOfAnswers = 1;

            const resultsWithoutOptions = await noOptionsQnA.getAnswers(noOptionsContext);
            const numberOfResults = resultsWithoutOptions.length;

            assert.strictEqual(numberOfResults, defaultNumberOfAnswers, 'Should return only 1 answer with default settings (i.e. no options specified) for question with answer.');

        });

        it('should sort the answers in the qna results from highest to lowest score', async function() {
            const qna = new QnAMaker(endpoint);
            const context = new TestContext({ text: "what's your favorite animal?" });
            const numberOfAnswersToReturn = { top: 5 };
            
            const qnaResults = await qna.getAnswers(context, numberOfAnswersToReturn);
            const descendingQnaResults = qnaResults.sort((a, b) => b.score - a.score);
            
            assert.strictEqual(qnaResults, descendingQnaResults, 'answers should be sorted from greatest to least score');
        });
        
        it('should convert legacy response property "qnaId" to "id"', async function() {
            const legacyEndpoint = {
                knowledgeBaseId: 'testKbId',
                endpointKey: 'testEndpointKey',
                host: 'https://westus.api.cognitive.microsoft.com/qnamaker/v3.0'
            };
            const qna = new QnAMaker(legacyEndpoint);

            const context = new TestContext({ text: 'How do I be the best?'});
            
            const legacyQnaResponse = {
                "answers": [
                    {
                        "score": 30.500827898,
                        "qnaId": 18,
                        "answer": "To be the very best, you gotta catch 'em all",
                        "source": "Custom Editorial",
                        "questions": [
                            "How do I be the best?"
                        ]
                    }
                ]
            }

            nock('https://westus.api.cognitive.microsoft.com')
                .post('/qnamaker/v3.0/knowledgebases/testKbId/generateanswer')
                .reply(200, legacyQnaResponse);

            const expectedQnaResultFormat = [{
                "answer": "To be the very best, you gotta catch 'em all",
                "id": 18,
                "metadata": [],
                "questions": ["How do I be the best?"],
                "score": .30500827898,
                "source": "Editorial"
            }];

            const formattedQnaResult = await qna.getAnswers(context);
            const hasIdInResponse = (response) => response["id"] && !response["qnaId"] ? true : false;

            assert.strictEqual(hasIdInResponse(formattedQnaResult), hasIdInResponse(expectedQnaResultFormat), 'Legacy QnA responses should have property "qnaId" converted to "id".');
        });

        it('should return 0 answers for an empty or undefined utterance', async function () {
            const qna = new QnAMaker(endpoint, { top: 1 });
            const emptyUtteranceContext = new TestContext({ text: '' });
            const undefinedUtteranceContext = new TestContext({ text: undefined });

            const emptyQuestionResults = await qna.getAnswers(emptyUtteranceContext);
            assert.notStrictEqual(emptyQuestionResults, true, 'Empty utterance should return an empty array, short circuiting call to QnA service.');
            assert.strictEqual(emptyQuestionResults.length, 0, 'Should have not received answers for an empty utterance.');
            
            const undefinedQuestionResults = await qna.getAnswers(undefinedUtteranceContext);
            assert.strictEqual(undefinedQuestionResults.length, 0, 'Should have not received answers for an undefined utterance.');
        });

        it('should return 0 answers for questions without an answer.', async function () {
            const qna = new QnAMaker(endpoint, { top: 1 });
            const questionWithoutAns_Context = new TestContext({ text: 'foo' });
    
            const resultsWithoutAns = await qna.getAnswers(questionWithoutAns_Context);
            assert.notStrictEqual(resultsWithoutAns, true, 'Result without an answer should return an empty array.');
            assert.strictEqual(resultsWithoutAns.length, 0, `Should have not received answers for a question with no answer, it returned ${JSON.stringify(resultsWithoutAns)}.`);
        });

        it('should throw TypeError if QnAMakerOptions.scoreThreshold is not a number in service call', function() {
            const context = new TestContext({ text: "what's the number for 911?" });
            const qna = new QnAMaker(context);
            const stringScoreThreshold_options = { scoreThreshold: 'I should be a number' };
            const nonNumberError = new TypeError(`"${stringScoreThreshold_options.scoreThreshold}" is an invalid scoreThreshold. QnAMakerOptions.scoreThreshold must have a value between 0 and 1.`);

            assert.rejects(async () => await qna.getAnswers(context, stringScoreThreshold_options), nonNumberError );
        });
    });

    
    describe('emitTraceInfo()', function() {
        it('method should throw error if context is undefined', async function() {
            const qna = new QnAMaker(endpoint);

            assert.rejects(async () => await qna.getAnswers(undefined), new TypeError('QnAMaker.getAnswers() requires a TurnContext.'));
        });
    });

    describe('Deprecated QnA Methods', function() {
        it('should work free standing', async function () {
            const qna = new QnAMaker(endpoint, { top: 1 });
            const answer = 'BaseCamp: You can use a damp rag to clean around the Power Pack';
    
            const firstCallQnaResults = await qna.generateAnswer(`how do I clean the stove?`);
            assert.notStrictEqual(firstCallQnaResults, true, `The response was returned as 'undefined'.`);
            assert.strictEqual(firstCallQnaResults.length, 1, 'Should have received just one answer on the first call.');
            assert.strictEqual(firstCallQnaResults[0].answer.startsWith(answer), true, `The answer should have started with '${answer}' for the first call.`);
    
            const secondCallQnaResults = await qna.generateAnswer("is the stove hard to clean?");
            assert.notStrictEqual(secondCallQnaResults, true, `The response was returned as 'undefined'.`);
            assert.strictEqual(secondCallQnaResults.length, 1, 'Should have received just one answer on the second call.');
            assert.strictEqual(secondCallQnaResults[0].answer.startsWith(answer), true, `The answer should have started with '${answer}' for the second call.`);
        });

        it('should return 0 answers for a question with no answer after a succesful call', async function () {
            const qna = new QnAMaker(endpoint, { top: 1 });
            let answer = 'BaseCamp: You can use a damp rag to clean around the Power Pack';
    
            const resultsWithAns = await qna.generateAnswer(`how do I clean the stove?`);
            assert.notStrictEqual(resultsWithAns, true, `The response was returned as 'undefined'.`);
            assert.strictEqual(resultsWithAns.length, 1, 'Should have received just one answer on the first call.');
            assert.strictEqual(resultsWithAns[0].answer.startsWith(answer), true, `The answer should have started with '${answer}' for the first call.`);
    
            const resultsWithoutAns = await qna.generateAnswer('how is the weather?');
            assert.notStrictEqual(resultsWithoutAns, true, `The response was returned as 'undefined'.`);
            assert.strictEqual(resultsWithoutAns.length, 0, 'Should have not received answers for a question with no answers.');
        });

        it('should return 0 answers for an empty or undefined utterance', async function () {
            const qna = new QnAMaker(endpoint, { top: 1 });
            
            const emptyQuestionResults = await qna.generateAnswer(``);
            assert.notStrictEqual(emptyQuestionResults, true, `The response was returned as 'undefined'.`);
            assert.strictEqual(emptyQuestionResults.length, 0, 'Should have not received answers for an empty utterance.');
    
            const undefinedQuestionResults = await qna.generateAnswer(undefined);
            assert.strictEqual(undefinedQuestionResults.length, 0, 'Should have not received answers for an undefined utterance.');
        });

        it('should return 0 answers for questions without an answer.', async function () {
            const qna = new QnAMaker(endpoint, { top: 1 });
    
            const resultsWithoutAns = await qna.generateAnswer(`foo`);
            assert.notStrictEqual(resultsWithoutAns, true, `The response was returned as 'undefined'.`);
            assert.strictEqual(resultsWithoutAns.length, 0, `Should have not received answers for a question with no answer, it returned ${JSON.stringify(resultsWithoutAns)}.`);
    
            const undefinedQuestionResults = await qna.generateAnswer(undefined);
            assert.strictEqual(undefinedQuestionResults.length, 0, 'Should have not received answers for an undefined question.');
        });

        it('should emit trace info once per call to Answer', function (done) {
            const context = new TestContext({ text: `how do I clean the stove?`, type: 'message'});
            const qna = new QnAMaker(endpoint, { top: 1 });
    
            qna.answer(context)
                .then((found) => {
                    assert.strictEqual(found, true, `Found answer should have returned 'true'.`);
                    let qnaMakerTraceActivies = context.sent.filter(s => s.type === 'trace' && s.name === 'QnAMaker');
                    assert.strictEqual(qnaMakerTraceActivies.length, 1, 'Should have returned just one answer');
                    traceActivity = qnaMakerTraceActivies[0];
                    assert.strictEqual(traceActivity.type, 'trace', `Should have returned 'trace'.`);
                    assert.strictEqual(traceActivity.name, 'QnAMaker', `Should have returned 'QnAMaker'.`);
                    assert.strictEqual(traceActivity.label, 'QnAMaker Trace', `Should have returned 'QnAMaker Trace'.`);
                    assert.strictEqual(traceActivity.valueType, 'https://www.qnamaker.ai/schemas/trace', `Should have returned 'https://www.qnamaker.ai/schemas/trace\'.`);
                    assert.strictEqual(traceActivity.hasOwnProperty('value'), true, `'traceActivity' should have 'value' property.`);
                    assert.strictEqual(traceActivity.value.hasOwnProperty('message'), true, `'traceActivity.value' should have 'message' property.`);
                    assert.strictEqual(traceActivity.value.hasOwnProperty('queryResults'), true, `'traceActivity.value' should have 'queryResults' property.'`);
                    assert.strictEqual(traceActivity.value.knowledgeBaseId, knowledgeBaseId, `Should have returned '${ knowledgeBaseId }'`);
                    assert.strictEqual(traceActivity.value.hasOwnProperty('scoreThreshold'), true, `'traceActivity.value' should have 'scoreThreshold' property.'`);
                    done();
                });
        });

        it('should return "false" from answer() if no good answers found', function (done) {
            const context = new TestContext({ text: `foo`, type: 'message' });
            const qna = new QnAMaker(endpoint, { top: 1 });
    
            qna.answer(context).then((found) => {
                assert.strictEqual(found, false, `Should have returned 'false' for questions with no good answers`);
                done();
            });
        });

        it('should throw TypeError from answer() if no context', function(){
            const qna = new QnAMaker(endpoint);
            const context = undefined;
            const contextMissingError = new TypeError('QnAMaker.answer() requires a TurnContext.');
            
            assert.rejects(async () => await qna.answer(context), contextMissingError);
        });

        it('should sort results from generateAnswers in descending order', async function() {
            const qna = new QnAMaker(endpoint);
            const question = "what's your favorite animal?";
            const numberOfAnswersToReturn = 5;

            const qnaResults = await qna.generateAnswer(question, numberOfAnswersToReturn);
            const descendingQnaResults = qnaResults.sort((a, b) => b.score - a.score);

            assert.strictEqual(qnaResults, descendingQnaResults, 'answers should be sorted from greatest to least score');
        });
    });
});