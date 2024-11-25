const path = require('path');
const fs = require("fs")
const express = require("express")

const app = express()

app.use(express.static("public"))
const port = 6969

let client;
let messageId = 0

app.get('/events', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    // Set retry interval to 10 seconds
    res.write('retry: 10000\n\n');

    client = res

    req.on('close', () => {
        client = null;
        messageId = 0;
    });
})

app.get("/list-clips", (req, res) => {
    const files = fs.readdirSync("./public/clips");
    res.json(files)
})

app.get("/trigger/:clipName", (req, res) => {
    messageId++
    client.write(`id: ${messageId}\ndata: ${JSON.stringify({ clipSrc: `/clips/${req.params.clipName}` })}\n\n`)

    res.json({})
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on port: ${port} `)
})