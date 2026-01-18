// 01-var.js
var x = 3;

function func(randomize) {
    if (randomize) {
        var x = Math.random();
        return x;
    }
    return x;
}

// Hanya log jika dijalankan langsung
if (require.main === module) {
    console.log('inside: ', func(true));
    console.log('outside: ', func(false));
}

module.exports = { func }; // untuk testing