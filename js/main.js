/**
 * Main application entry point
 * Handles event listeners and orchestrates calculations
 */

import { validateSequence, getBuildingBlocks } from './utils.js';
import { calculateFullSequenceMW, calculateComposition } from './calculator.js';
import { generateDeletionVariants } from './deletions.js';
import { displayPrimaryResults, displayDeletionVariants, showResults, hideResults, showError, hideError } from './ui.js';

/**
 * Performs calculation and updates UI
 */
function performCalculation() {
    const sequenceInput = document.getElementById('sequence-input');
    const rawSequence = sequenceInput.value;

    // Validate sequence
    const sequence = validateSequence(rawSequence);
    
    if (!sequence) {
        showError('Invalid sequence. Please enter only A, C, G, T characters (case-insensitive).');
        return;
    }

    // Hide any previous errors
    hideError();

    // Get building blocks
    const buildingBlocks = getBuildingBlocks();

    // Validate building blocks
    const invalidBlocks = Object.entries(buildingBlocks).filter(([_, block]) => 
        isNaN(block.mw) || block.mw <= 0
    );

    if (invalidBlocks.length > 0) {
        showError(`Invalid molecular weight values for: ${invalidBlocks.map(([base]) => base).join(', ')}`);
        return;
    }

    // Calculate full sequence MW
    const mw = calculateFullSequenceMW(sequence, buildingBlocks);
    const length = sequence.length;
    const composition = calculateComposition(sequence);

    // Display primary results
    displayPrimaryResults({ mw, length, composition });

    // Generate and display deletion variants
    const variants = generateDeletionVariants(sequence, buildingBlocks);
    displayDeletionVariants(variants, sequence);

    // Show results section
    showResults();
}

/**
 * Initialize event listeners
 */
function initialize() {
    const sequenceInput = document.getElementById('sequence-input');
    const buildingBlockInputs = [
        document.getElementById('block-A'),
        document.getElementById('block-C'),
        document.getElementById('block-G'),
        document.getElementById('block-T')
    ];

    // Auto-uppercase and strip whitespace on input
    sequenceInput.addEventListener('input', (e) => {
        const value = e.target.value;
        const normalized = value.replace(/\s+/g, '').toUpperCase();
        if (value !== normalized) {
            e.target.value = normalized;
        }
    });

    // Calculate on sequence input change
    sequenceInput.addEventListener('input', () => {
        if (sequenceInput.value.trim()) {
            performCalculation();
        } else {
            hideResults();
            hideError();
        }
    });

    // Calculate on building block changes
    buildingBlockInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (sequenceInput.value.trim()) {
                performCalculation();
            }
        });
    });

    // Initial calculation if there's a sequence in the input
    if (sequenceInput.value.trim()) {
        performCalculation();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

