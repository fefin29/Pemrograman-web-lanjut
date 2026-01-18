function printCoord1(x, y) {
    console.log('(' + x + ', ' + y + ')');
}

function printCoord2(x, y) {
    console.log(`(${x}, ${y})`);
}

var HTML5_SKELETON = `
<!doctype html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
</body>
</html>`;

if (typeof require !== 'undefined' && require.main === module) {
    printCoord1(10, 50);
    printCoord2(10, 50);
    console.log();
    console.log(HTML5_SKELETON);
}

module.exports = { printCoord1, printCoord2, HTML5_SKELETON };