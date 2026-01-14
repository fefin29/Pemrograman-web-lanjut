var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

function concatConcat() {
    return arr1.concat(arr2, arr3);
}

function concatSpread() {
    return [...arr1, ...arr2, ...arr3];
}

if (typeof require !== 'undefined' && require.main === module) {
    console.log(arr1.concat(arr2, arr3));
    console.log([...arr1, ...arr2, ...arr3]);
}

module.exports = { arr1, arr2, arr3, concatConcat, concatSpread };