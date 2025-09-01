import {helloWorld, add, fetchRandomJoke, fetch5RandomJokes} from '../js/main.js';
// Import the sinon library to allow us to create a spy on the console.log function
import sinon from 'sinon';

QUnit.module('main.js tests', function() {

    QUnit.test('helloWorld should print Hello World to the console', function(assert) {
        //Arrange
        const consoleSpy = sinon.spy(console, 'log');
        //Act
        helloWorld();
        //Assert
        assert.ok(consoleSpy.calledWith('Hello World'), 'console.log should be called with Hello World');
        consoleSpy.restore();
    });

    QUnit.test('add should return the sum of two numbers', function(assert) {
        //Arrange
        const num1 = 2;
        const num2 = 3;
        const expected = 5;
        //Act
        const result = add(num1, num2);
        //Assert
        assert.equal(result, expected, 'add(2, 3) should return 5');
    });

    QUnit.test('add should return the sum of negative numbers', function(assert) {
        //Arrange
        const num1 = -2;
        const num2 = -3;
        const expected = -5;
        //Act
        const result = add(num1, num2);
        //Assert
        assert.equal(result, expected, 'add(-2, -3) should return -5');
    });

    QUnit.test('add should return the sum of a positive and a negative number', function(assert) {
        //Arrange
        const num1 = 2;
        const num2 = -3;
        const expected = -1;
        //Act
        const result = add(num1, num2);
        //Assert
        assert.equal(result, expected, 'add(2, -3) should return -1');
    });

    QUnit.test('get a random joke should return a random joke', async function(assert) {
        // Arrange: stub global fetch
        const fakeJoke = { setup: "Why did the chicken cross the road?", punchline: "To get to the other side." };
        const fetchStub = sinon.stub(global, "fetch").resolves({
            ok: true,
            json: async () => fakeJoke
        });
    
        // Act
        const result = await fetchRandomJoke();
    
        // Assert
        assert.strictEqual(
            result,
            "Why did the chicken cross the road? - To get to the other side.",
            "fetchRandomJoke should return the formatted joke"
        );
    
        // Cleanup
        fetchStub.restore();
    });
    
    QUnit.test('get a random joke should return a random joke', async function(assert) {
        // Arrange: stub global fetch
        const fakeJoke = { setup: "Why did the chicken cross the road?", punchline: "To get to the other side." };
        const fetchStub = sinon.stub(global, "fetch").resolves({
            ok: true,
            json: async () => fakeJoke
        });
    
        // Act
        const result = await fetchRandomJoke();
    
        // Assert
        assert.strictEqual(
            result,
            "Why did the chicken cross the road? - To get to the other side.",
            "fetchRandomJoke should return the formatted joke"
        );
    
        // Cleanup
        fetchStub.restore();
    });

    QUnit.test('get 5 jokes should return a list of 5 jokes', async function(assert) {
        // Arrange: stub global fetch (works in Node)
        const fakeJokes = [
            { setup: "Why did the chicken cross the road?", punchline: "To get to the other side." },
            { setup: "What do you call a fake noodle?", punchline: "An impasta." },
            { setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything." },
            { setup: "Why did the scarecrow win an award?", punchline: "Because he was outstanding in his field." },
            { setup: "Why don't skeletons fight each other?", punchline: "They don't have the guts." }
        ];
        const fetchStub = sinon.stub(global, "fetch").resolves({
            ok: true,
            json: async () => fakeJokes
        });
    
        // Act
        const result = await fetch5RandomJokes();
    
        // Assert
        assert.strictEqual(result.length, 5, 'fetch5RandomJokes should return 5 jokes');
        assert.strictEqual(result[0], "Why did the chicken cross the road? - To get to the other side.", 'First joke should match');
        assert.strictEqual(result[1], "What do you call a fake noodle? - An impasta.", 'Second joke should match');
        assert.strictEqual(result[2], "Why don't scientists trust atoms? - Because they make up everything.", 'Third joke should match');
        assert.strictEqual(result[3], "Why did the scarecrow win an award? - Because he was outstanding in his field.", 'Fourth joke should match');
        assert.strictEqual(result[4], "Why don't skeletons fight each other? - They don't have the guts.", 'Fifth joke should match');
    
        // Cleanup
        fetchStub.restore();
    });


});
