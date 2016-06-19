'use strict';

var matrix = Symbol('Matrix');
var length = Symbol('Length');

var xS      = Symbol('x');
var yS      = Symbol('y');
var parentS = Symbol('parent');

class BoundError extends Error {}

class RedDressWalker {

    constructor (x, y, parent) {

        this[xS]      = x;
        this[yS]      = y;
        this[parentS] = parent;

    }

    /**
     * Move the walker to a different cell
     * @param x
     * @param y
     * @returns {*}
     */
    move (x, y) {

        let moveX = this[xS] + x;
        let moveY = this[yS] + y;

        this[parentS].__check_bounds(moveX, moveY);

        this[xS] = moveX;
        this[yS] = moveY;

        return this.value;

    }

    /**
     * Get the value of the cell the walker is on.
     * @returns {*}
     */
    get value () {
        return this[parentS].find(this[xS], this[yS]);
    }

    /**
     * Find a cell from the walkers point.
     * @param x
     * @param y
     * @returns {*}
     */
    find (x, y) {

        let moveX = this[xS] + x;
        let moveY = this[yS] + y;

        return this[parentS].find(moveX, moveY);

    }

    /**
     * Set cell value
     * @param value
     */
    set (value) {

        this[parentS].set(value, this[xS], this[yS]);

    }

    /**
     * Get the current position
     * @returns {*[]}
     */

    getPosition () {
        return [this[xS], this[yS]]
    }

}

class RedDress {

    /**
     * Create a new RedDress matrix.
     *
     * @example
     *
     * let matrix = new RedDress(3, 3); // Creates an empty 3, 3 matrix.
     *
     * @param {int} rows - Rows constraint for the matrix
     * @param {int} columns - Column constraints for the matrix.
     */
    constructor (rows, columns) {

        this.rows    = rows;
        this.columns = columns;

        this[length] = rows * columns;
        this[matrix] = new Array(this[length])

    }

    /**
     * Check wether the specified coordinates are in the matrix.
     * @param {int} x
     * @param {int} y
     * @private
     */
    __check_bounds (x, y) {

        if (isNaN(x) === true) {
            throw new Error('x is not a number');
        }

        if (isNaN(y) === true) {
            throw new Error('y is not a number');
        }

        if (x > this.rows - 1 || x < 0) {
            throw new BoundError('Row is out of bounds');
        }

        if (y > this.columns - 1 || y < 0) {
            throw new BoundError('Column is out of bounds');
        }

    }

    /**
     * Find a value in the matrix at X, Y
     * @param {int} x
     * @param {int} y
     * @returns {*}
     * @private
     */
    __position_in_matrix (x, y) {

        let realRow = x * this.columns;
        return realRow + y;

    }

    /**
     * Populate a matrix
     *
     * @example
     *
     * matrixBulk = new RedDress(3, 3);
     * matrixBulk.bulkAdd([
     *  ['0,0', '0,1', '0,2'],
     *  ['1,0', '1,1', '1,2'],
     *  ['2,0', '2,1', '2,2']
     * ]);
     *
     * @param matrix
     */
    bulkSet (matrix) {

        for (var i = 0, l = matrix.length; i < l; i += 1) {

            var row = matrix[i];

            for (var ii = 0, ll = row.length; ii < ll; ii += 1) {
                this.set(row[ii], i, ii);
            }

        }

    }

    /**
     * Add a new value to the matrix.
     * @param {*} value - Value for the X, Y position
     * @param {int} x - X coordinate in the matrix
     * @param {int} y - Y coordinate in the matrix
     * @param {boolean} withWalker - Returns a RedDressWalker if set to true
     */
    set (value, x, y, withWalker=false) {

        this.__check_bounds(x, y);

        let position = this.__position_in_matrix(x, y);
        this[matrix][position] = value;

        if (withWalker === true) {
            return new RedDressWalker(x, y, this);
        }

    }

    /**
     * Find a value at X, Y
     * @param {int} x
     * @param {int} y
     * @param {boolean} withWalker
     * @returns {*}
     */
    find (x, y, withWalker=false) {

        this.__check_bounds(x, y);

        let position = this.__position_in_matrix(x, y);
        let value = this[matrix][position];

        if (withWalker === true) {
            return new RedDressWalker(value, x, y, this);
        } else {
            return value;
        }

    }

    getWalker (initialX, initialY) {
        return new RedDressWalker(initialX, initialY, this);
    }

}

exports.RedDress   = RedDress;
exports.BoundError = BoundError;

/*
let m = new RedDress(3, 3);
m.add('foo', 0, 0);
m.add('foo', 0, 1);
m.add('foo', 0, 2);

m.add('bar', 1, 0);
m.add('bar', 1, 1);
m.add('bar', 1, 2);

m.add('foo bar', 2, 0);
m.add('foo bar', 2, 1);
m.add('foo bar', 2, 2);


console.log('At 0,0:', m.find(0, 0));
console.log('At 1,0:', m.find(1, 0));
console.log('At 2,0:', m.find(2, 0));

let walker = m.getWalker(0, 0);
console.log('Walker:', walker.move(0, 1));
console.log('Walker:', walker.move(1, 0));
console.log('Walker:', walker.move(1, 0));

let m2 = new RedDress(3, 3);
m2.bulkAdd([
    ['0,0', '0,1', '0,2'],
    ['1,0', '1,1', '1,2'],
    ['2,0', '2,1', '2,2']
]);

let walker2 = m2.getWalker(0, 0);
console.log('Walker 2:', walker2.move(0, 0));
console.log('Walker 2:', walker2.move(1, 0));
console.log('Walker 2:', walker2.move(1, 0));

console.log(m2.find(1, 1));
console.log(m2.find(0, 0));
console.log(m2.find(2, 2));
*/