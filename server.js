/**
 * Simple Express server to serve the static oligonucleotide calculator
 * For Railway deployment
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Log environment info for debugging
console.log('Starting server...');
console.log('PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('__dirname:', __dirname);

// Health check endpoint (before static files)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', port: PORT });
});

// Serve static files from the root directory (CSS, JS, etc.)
// This must come before the catch-all route
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve index.html for all other routes (SPA behavior)
// This must be last to catch all unmatched routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✓ Oligonucleotide Calculator server running on port ${PORT}`);
    console.log(`✓ Serving files from: ${__dirname}`);
    console.log(`✓ Health check available at: http://0.0.0.0:${PORT}/health`);
});

// Handle server errors
server.on('error', (err) => {
    console.error('Server error:', err);
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
    }
    process.exit(1);
});

// Handle process errors
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

