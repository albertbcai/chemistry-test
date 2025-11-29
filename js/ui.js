/**
 * UI manipulation and display functions
 */

import { formatNumber, formatPercentage } from './utils.js';

/**
 * Displays primary results (full sequence MW, length, composition)
 * @param {Object} results - Results object with mw, length, and composition
 */
export function displayPrimaryResults(results) {
    const { mw, length, composition } = results;

    // Display molecular weight
    document.getElementById('full-mw').textContent = formatNumber(mw);

    // Display sequence length
    document.getElementById('sequence-length').textContent = length;

    // Display base composition
    const compositionEl = document.getElementById('base-composition');
    compositionEl.innerHTML = '';
    
    Object.entries(composition).forEach(([base, count]) => {
        if (count > 0) {
            const item = document.createElement('div');
            item.className = 'composition-item';
            item.innerHTML = `<span class="base">${base}</span>: ${count}`;
            compositionEl.appendChild(item);
        }
    });
}

/**
 * Displays deletion variants in a table
 * @param {Array} variants - Array of deletion variant objects
 * @param {string} originalSequence - Original sequence for visual display
 */
export function displayDeletionVariants(variants, originalSequence) {
    const tbody = document.getElementById('deletions-tbody');
    tbody.innerHTML = '';

    variants.forEach(variant => {
        const row = document.createElement('tr');
        
        // Position
        const posCell = document.createElement('td');
        posCell.textContent = variant.position;
        row.appendChild(posCell);

        // Deleted base (visual pattern)
        const deletedCell = document.createElement('td');
        deletedCell.className = 'sequence-display';
        // Show original sequence with deleted base highlighted
        let displaySequence = '';
        for (let i = 0; i < originalSequence.length; i++) {
            if (i === variant.position - 1) {
                displaySequence += `<span class="deleted-base">${originalSequence[i]}</span>`;
            } else {
                displaySequence += originalSequence[i];
            }
        }
        deletedCell.innerHTML = displaySequence;
        row.appendChild(deletedCell);

        // Resulting sequence
        const seqCell = document.createElement('td');
        seqCell.className = 'sequence-display';
        seqCell.textContent = variant.sequence;
        row.appendChild(seqCell);

        // Molecular weight
        const mwCell = document.createElement('td');
        mwCell.textContent = formatNumber(variant.mw);
        row.appendChild(mwCell);

        // Probability
        const probCell = document.createElement('td');
        probCell.className = 'probability';
        probCell.textContent = formatPercentage(variant.probability);
        row.appendChild(probCell);

        tbody.appendChild(row);
    });
}

/**
 * Shows the results section
 */
export function showResults() {
    document.getElementById('results-section').style.display = 'block';
    document.getElementById('error-section').style.display = 'none';
}

/**
 * Hides the results section
 */
export function hideResults() {
    document.getElementById('results-section').style.display = 'none';
}

/**
 * Shows an error message
 * @param {string} message - Error message to display
 */
export function showError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('error-section').style.display = 'block';
    document.getElementById('results-section').style.display = 'none';
}

/**
 * Hides the error section
 */
export function hideError() {
    document.getElementById('error-section').style.display = 'none';
}

