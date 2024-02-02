// PORT konfigurācija
const PORT = 5000

// izmantotās pakotnes
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// izmantotās datnes projekta kontekstā
const corsOptions = require('./config/corsOptions')
const logger = require('./middleware/logger')
const search = require('./routes/api/search')

// konstruktors
const app = express()


// middleware
app.use(bodyParser.json())
app.use(logger)
app.use(cors(corsOptions))



// API route
app.use('/api/search', search)


app.listen(PORT, () => console.log(`Server running on ${PORT}`))