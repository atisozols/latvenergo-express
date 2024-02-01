const PORT = 5000

// izmantotās pakotnes
const express = require('express')
const bodyParser = require('body-parser')
const bodyParserXML = require('body-parser-xml')
const cors = require('cors');

// izmantotās datnes projekta kontekstā
const corsOptions = require('./config/corsOptions');

// konstruktors
const app = express()


// middleware
app.use(bodyParser.json())
app.use(cors(corsOptions))


// API route
app.use('/api/search', require('./routes/api/search'))


app.listen(PORT, () => console.log(`Server running on ${PORT}`))