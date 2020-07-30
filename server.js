const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

app.use('/asset', express.static(path.join(__dirname, 'asset')))
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

app.listen(port, () => console.log(`The party @ http://localhost:${port}`))