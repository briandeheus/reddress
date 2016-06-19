let assert     = require('assert');
let redDress   = require('../index');
let RedDress   = redDress.RedDress;
let BoundError = redDress.BoundError;

describe('Red Dress', () => {

    let matrix;
    let matrixBulk;

    let walker;


    it('Creates a new matrix', () =>{
        matrix = new RedDress(3, 3);
    });

    it('Sets cells in the matrix', () => {

        matrix.set('0,0', 0, 0);
        matrix.set('1,0', 1, 0);
        matrix.set('2,0', 2, 0);
        matrix.set('0,1', 0, 1);
        matrix.set('1,1', 1, 1);
        matrix.set('2,1', 2, 1);
        matrix.set('0,2', 0, 2);
        matrix.set('1,2', 1, 2);
        matrix.set('2,2', 2, 2);

    });

    it('Finds values in the matrix', () => {

        assert.equal(matrix.find(0, 0), '0,0');
        assert.equal(matrix.find(1, 0), '1,0');
        assert.equal(matrix.find(2, 0), '2,0');
        assert.equal(matrix.find(0, 1), '0,1');
        assert.equal(matrix.find(1, 1), '1,1');
        assert.equal(matrix.find(2, 1), '2,1');
        assert.equal(matrix.find(0, 2), '0,2');
        assert.equal(matrix.find(1, 2), '1,2');
        assert.equal(matrix.find(2, 2), '2,2');

    });

    it('Looks up value relative to it\'s own position in the matrix using a walker', () => {

        walker = matrix.getWalker(0, 0);
        assert.equal(walker.value, '0,0');
        assert.equal(walker.find(1, 1), '1,1');
        assert.equal(walker.find(2, 2), '2,2');

    });

    it('Moves around the matrix using a walker', () => {

        assert.equal(walker.move(1, 1), '1,1');
        assert.equal(walker.move(1, 1), '2,2');
        assert.equal(walker.move(0, -1), '2,1');
        assert.equal(walker.move(-1, 0), '1,1');
        assert.equal(walker.move(-1, -1), '0,0');

    });

    it('Will not set cells that are out of bounds ', () => {

        assert.throws(() => {
            matrix.set('nope', 3, 3);
        }, BoundError);

        assert.throws(() => {
            matrix.set('nope', -1, -1);
        }, BoundError);

        assert.throws(() => {
            matrix.set('nope', 0, -1);
        }, BoundError);

        assert.throws(() => {
            matrix.set('nope', -1, 0);
        }, BoundError);

    });

    it('Will not walk outside the matrix', () => {

        assert.throws(() => {
            walker.move(-1, -1)
        }, BoundError);

        assert.throws(() => {
            walker.move(3, 3)
        }, BoundError);

        assert.throws(() => {
            walker.move(0, 3)
        }, BoundError);

        assert.throws(() => {
            walker.move(3, 0)
        }, BoundError);

        assert.equal(walker.value, '0,0');

    });

    it('Bulk creates a matrix', () => {

        matrixBulk = new RedDress(3, 3);
        matrixBulk.bulkSet([
            ['0,0', '0,1', '0,2'],
            ['1,0', '1,1', '1,2'],
            ['2,0', '2,1', '2,2']
        ]);

    });

    it('Has set all values in the bulk matrix', () => {

        assert.equal(matrixBulk.find(0, 0), '0,0');
        assert.equal(matrixBulk.find(1, 0), '1,0');
        assert.equal(matrixBulk.find(2, 0), '2,0');
        assert.equal(matrixBulk.find(0, 1), '0,1');
        assert.equal(matrixBulk.find(1, 1), '1,1');
        assert.equal(matrixBulk.find(2, 1), '2,1');
        assert.equal(matrixBulk.find(0, 2), '0,2');
        assert.equal(matrixBulk.find(1, 2), '1,2');
        assert.equal(matrixBulk.find(2, 2), '2,2');

    });

    it('Updates values using a walker', () => {

        const [x, y] = walker.getPosition();
        let walker2  = matrix.getWalker(x, y);

        assert.equal(x, 0);
        assert.equal(y, 0);

        assert.equal(walker2.find(x, y), x + ',' + y);
        assert.equal(walker.value, x + ',' + y);

        walker.set('foo');

        assert.equal(matrix.find(x, y), 'foo');
        assert.equal(walker.find(0, 0), 'foo');
        assert.equal(walker2.find(x, y), 'foo');

        assert.equal(walker.value, 'foo');
        assert.equal(walker2.value, 'foo');


    });

});
