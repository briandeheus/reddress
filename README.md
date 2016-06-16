# reddress
Tiny ES6 Matrix Library

## How to use

Create a new 3x3 matrix:
```
matrix = new RedDress(3, 3);
matrix.bulkSet([
    ['🐱', '😦', '😂'],
    ['😎', '😍', '😇'],
    ['😩', '😱', '💩']
]);
```

Get some values:
```
matrix.find(0, 0) //🐱
matrix.find(2, 2) //💩
```

Walk around like you own the place:
```
let walker = matrix.getWalker(1, 1);
walker.value; //😍
walker.walk(1, 1);
walker.value; //💩
walker.walk(-2, -2);
walker.value; //🐱
```

Look from relative positions:
```
let walker = matrix.getWalker(1, 1);

walker.find(1, 1); //💩
walker.find(-1, 0); //😎
```

Update cells with a walker or directly:
```
let walker  = matrix.getWalker(0, 0);
let walker2 = matrix.getWalker(0, 0);

walker.set('foo');
walker2.value // 🐱 <== stale

matrix.find(0, 0); //foo
matrix.set('bar', 0, 0);

walker.value // Is now stale. :-(
matrix.find(0, 0); //bar
```

Never leave the matrix
```
let walker = matrix.getWalker(2, 2);

walker.walk(1, 0) // throws BoundError
walker.find(1, 0) // throws BoundError
```

Never get lost again:
```
let walker = matrix.getWalker(2, 2);
const [x, y] = walker.getPosition(); //2, 2
```

## Caveats
Walkers are not aware of any changes in the matrix, yet.