const WebSocket = require('ws')
const connection = new WebSocket('ws://localhost:8081')

connection.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}

connection.onmessage = (e) => {
    console.log(e.data)
}
