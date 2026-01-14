const WebSocket = require('ws')
const fs = require('fs')

const dataRaw = fs.readFileSync(__dirname + '/data.json');
const data = JSON.parse(dataRaw);
let dataSend;

const wss = new WebSocket.Server({port: 8081})

wss.on('connection', ws => {
    ws.on('message', message => {
        console.log(`Received message => ${message}`)
    });

    setInterval(function () {
        dataSend = data.results[parseInt(Math.random() * data.results.length)]
        ws.send(JSON.stringify(dataSend))
    }, 5000)
})
