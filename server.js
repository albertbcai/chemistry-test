/**
 * Simple Express server to serve the static oligonucleotide calculator
 * For Railway deployment
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Serve index.html for all routes (SPA behavior)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Oligonucleotide Calculator server running on port ${PORT}`);
});

