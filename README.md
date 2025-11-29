# Oligonucleotide Calculator

A simple, scalable web application for calculating oligonucleotide molecular weights and analyzing deletion variants.

## Features

- **Sequence Input**: Accepts DNA sequences (A, C, G, T) with automatic validation and normalization
- **Customizable Building Blocks**: Editable molecular weight values for each base (A, C, G, T)
- **Full Sequence Calculation**: Calculates molecular weight using the formula: `MW = Σ(base_count × base_MW) - (n-1) × 18.015`
- **Deletion Variants Analysis**: Generates all n-1 deletion variants with:
  - Position number (1-indexed)
  - Visual pattern showing deleted base
  - Resulting sequence
  - Molecular weight for each variant
  - Probability percentage (uniform distribution: 1/n)

## Default Molecular Weights

The app comes with standard phosphoramidite DNA molecular weights:
- **Adenine (A)**: 313.21 g/mol
- **Cytosine (C)**: 289.18 g/mol
- **Guanine (G)**: 329.21 g/mol
- **Thymine (T)**: 304.20 g/mol

All values are fully customizable through the UI.

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser to `http://localhost:3000`

## Deployment to Railway

1. **Install Railway CLI** (optional, or use web interface):
```bash
npm i -g @railway/cli
```

2. **Login to Railway**:
```bash
railway login
```

3. **Initialize and deploy**:
```bash
railway init
railway up
```

Or use the Railway web interface:
1. Go to [railway.app](https://railway.app)
2. Create a new project
3. Connect your GitHub repository or deploy directly
4. Railway will automatically detect the Node.js app and deploy it

The app will be available at a Railway-provided URL.

## Project Structure

```
/oligonucleotide-calculator
├── index.html          # Main HTML file
├── server.js           # Express server for Railway
├── package.json        # Node.js dependencies
├── railway.json        # Railway deployment config
├── /css
│   └── styles.css      # Application styles
└── /js
    ├── main.js         # Application entry point
    ├── calculator.js   # Core MW calculations
    ├── deletions.js    # Deletion variant logic
    ├── ui.js           # DOM manipulation
    └── utils.js        # Helper functions
```

## Technology Stack

- **Frontend**: Pure HTML, CSS, and JavaScript (ES6 modules)
- **Backend**: Express.js (for static file serving on Railway)
- **Deployment**: Railway

## Future Enhancements

- Export results to CSV/PDF
- Save custom building block presets to localStorage
- Multiple sequence batch processing
- Copy individual results to clipboard
- Dark mode toggle
- Multiple deletion analysis (n-2, n-3)
- Insertion and substitution variant analysis
- GC content calculator
- Tm (melting temperature) calculator

## License

MIT

