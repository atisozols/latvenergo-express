const app = require('./app.js')

// PORT konfigurācija
const PORT = 5001;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));