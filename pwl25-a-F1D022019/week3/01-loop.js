var arr = ['a', 'b', 'c'];
for (var i = 0; i < arr.length; i++) {
    var elem = arr[i];
    console.log(elem);
}

arr.forEach(function (elem) {
    console.log(elem);
});

// es6
for (const elem of arr) {
    console.log(elem);
}

function getVarLoop() {
    var out = [];
    for (var i = 0; i < arr.length; i++) {
        out.push(arr[i]);
    }
    return out;
}

function getForEach() {
    var out = [];
    arr.forEach(function (elem) {
        out.push(elem);
    });
    return out;
}

function getForOf() {
    var out = [];
    for (const elem of arr) {
        out.push(elem);
    }
    return out;
}

if (typeof require !== 'undefined' && require.main === module) {
    // original runtime behavior
    for (var i = 0; i < arr.length; i++) {
        var elem = arr[i];
        console.log(elem);
    }

    arr.forEach(function (elem) {
        console.log(elem);
    });

    for (const elem of arr) {
        console.log(elem);
    }
}

module.exports = { arr, getVarLoop, getForEach, getForOf };