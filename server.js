/**
 * Simple Express server to serve the static oligonucleotide calculator
 * For Railway deployment
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the root directory (CSS, JS, etc.)
app.use(express.static(path.join(__dirname), {
    index: false, // Don't serve index.html automatically
    extensions: ['html', 'css', 'js', 'json']
}));

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve index.html for all other routes (SPA behavior)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Oligonucleotide Calculator server running on port ${PORT}`);
    console.log(`Serving files from: ${__dirname}`);
});

