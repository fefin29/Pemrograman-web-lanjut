// Traditional Function
function x1(a, b) {
    return a + b + 100;
}

console.log('x1 =', x1(10, 20));

// Arrow Function
const x2 = (a, b) => a + b + 100;

console.log('x2 =', x2(10, 20));

const materials = [
    'Hydrogen',
    'Helium',
    'Lithium',
    'Beryllium'
];

console.log('char len = ', materials.map(material => material.length));
console.log('char + "s" = ', materials.map(material => `${material}s`));

var arr = [1, 2, 3];
console.log('arr: ', arr);

var squares = arr.map(function (x) {
    return x * x
});

console.log('squares: ', squares);

squares = arr.map(x => x * x);

console.log('squares: ', squares);

function charLengths() {
    return materials.map(material => material.length);
}

function pluralize() {
    return materials.map(material => `${material}s`);
}

function computeSquares() {
    return arr.map(x => x * x);
}

if (typeof require !== 'undefined' && require.main === module) {
    // original runtime logs
    console.log('x1 =', x1(10, 20));
    console.log('x2 =', x2(10, 20));
    console.log('char len = ', charLengths());
    console.log('char + "s" = ', pluralize());
    console.log('arr: ', arr);
    console.log('squares: ', computeSquares());
}

module.exports = { x1, x2, materials, arr, charLengths, pluralize, computeSquares };