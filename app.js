// izmantotās pakotnes
const express = require('express');
const bodyParser = require('body-parser');
const bodyParserXml = require('body-parser-xml');
const cors = require('cors');
const multer = require('multer');

// izmantotās datnes projekta kontekstā
const corsOptions = require('./config/corsOptions');
const logger = require('./middleware/logger');
const outputFormatter = require('./middleware/outputFormatter');
const search = require('./routes/api/search');

// konstruktors
const app = express();

// middleware
// konfigurē bodyParser ar Xml atbalstu
bodyParserXml(bodyParser);

// papildus options objektā norādītas izmaiņas, lai parser
// neveidotu array struktūru un neglabātu root elementu
app.use(bodyParser.xml({ xmlParseOptions: { explicitArray: false, explicitRoot: false } }));
app.use(bodyParser.json());
app.use(multer().none());
app.use(cors(corsOptions));
app.use(outputFormatter);
app.use(logger);

// static
const path = `${__dirname}/views/`;
app.use(express.static(path));
app.get('/', (req, res) => {
  res.sendFile(`${path}index.html`);
});

// API route
app.use('/api/search', search);

module.exports = app;
