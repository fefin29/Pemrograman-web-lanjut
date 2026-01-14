function foo(x, y) {
    x = x || 0;
    y = y || 0;
    console.log(x, y);
}

foo();
foo(5, 6);

// es6
function bar(x = 0, y = 0) {
    console.log(x, y);
}

bar();
bar(5, 6);

function selectEntries(options) {
    var start = options.start || 0;
    var end = options.end || -1;
    var step = options.step || 1;
    console.log(start, end, step);
}

selectEntries({step: 10});

function selectEntries2({start = 0, end = -1, step = 1}) {
    console.log(start, end, step);
}

selectEntries2({step: 10});

function fooReturn(x, y) {
    x = x || 0;
    y = y || 0;
    return [x, y];
}

function barReturn(x = 0, y = 0) {
    return [x, y];
}

function selectEntriesReturn(options) {
    var start = options.start || 0;
    var end = options.end || -1;
    var step = options.step || 1;
    return { start, end, step };
}

function selectEntries2Return({start = 0, end = -1, step = 1}) {
    return { start, end, step };
}

if (typeof require !== 'undefined' && require.main === module) {
    // keep original example calls
    foo();
    foo(5,6);
    bar();
    bar(5,6);
    selectEntries({step:10});
    selectEntries2({step:10});
}

module.exports = { fooReturn, barReturn, selectEntriesReturn, selectEntries2Return };