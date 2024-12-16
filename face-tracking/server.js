const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serveer statische bestanden vanuit de "public" map
app.use(express.static(path.join(__dirname, 'public')));

// Start de server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
