let x = 3;

function func(randomize) {
    if (randomize) {
        x = Math.random();
        return x;
    }
    return x;
}

if (typeof require !== 'undefined' && require.main === module) {
    console.log('no random: ', func(false));
    console.log('random: ', func(true));
}

module.exports = { func };