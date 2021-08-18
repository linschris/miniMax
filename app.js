const express = require("express")
const path = require("path");
const app = express()
const http = require('http').Server(app)

app.use(express.static(path.join(__dirname, 'public')))
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get('/game', (req, res) => {
    res.sendFile(__dirname + "/public/game.html")
})

http.listen(port, function() {
    console.log(`Server is listening on port: ${port}`)
})