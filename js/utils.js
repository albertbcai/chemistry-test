/**
 * Utility functions for the oligonucleotide calculator
 */

/**
 * Validates and normalizes a DNA sequence
 * @param {string} sequence - Raw sequence input
 * @returns {string} - Normalized uppercase sequence or null if invalid
 */
export function validateSequence(sequence) {
    if (!sequence || typeof sequence !== 'string') {
        return null;
    }

    // Remove whitespace and convert to uppercase
    const normalized = sequence.replace(/\s+/g, '').toUpperCase();

    // Check for invalid characters (only A, C, G, T allowed)
    if (!/^[ACGT]+$/.test(normalized)) {
        return null;
    }

    return normalized;
}

/**
 * Gets building blocks from the DOM inputs
 * @returns {Object} - Building blocks object with base as key
 */
export function getBuildingBlocks() {
    return {
        'A': {
            name: 'A',
            mw: parseFloat(document.getElementById('block-A').value) || 0,
            fullName: 'Adenine'
        },
        'C': {
            name: 'C',
            mw: parseFloat(document.getElementById('block-C').value) || 0,
            fullName: 'Cytosine'
        },
        'G': {
            name: 'G',
            mw: parseFloat(document.getElementById('block-G').value) || 0,
            fullName: 'Guanine'
        },
        'T': {
            name: 'T',
            mw: parseFloat(document.getElementById('block-T').value) || 0,
            fullName: 'Thymine'
        }
    };
}

/**
 * Formats a number to specified decimal places
 * @param {number} num - Number to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} - Formatted number string
 */
export function formatNumber(num, decimals = 2) {
    if (isNaN(num) || !isFinite(num)) {
        return '-';
    }
    return num.toFixed(decimals);
}

/**
 * Formats a percentage value
 * @param {number} value - Value between 0 and 1
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} - Formatted percentage string
 */
export function formatPercentage(value, decimals = 2) {
    if (isNaN(value) || !isFinite(value)) {
        return '-';
    }
    return (value * 100).toFixed(decimals) + '%';
}

