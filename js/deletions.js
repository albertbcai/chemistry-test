/**
 * Deletion variant generation and analysis
 */

import { calculateFullSequenceMW } from './calculator.js';

/**
 * Generates all n-1 deletion variants for a sequence
 * For each position i: creates sequence[0:i] + sequence[i+1:]
 * 
 * @param {string} sequence - Original DNA sequence
 * @param {Object} buildingBlocks - Building blocks object with MW values
 * @returns {Array} - Array of deletion variant objects
 */
export function generateDeletionVariants(sequence, buildingBlocks) {
    if (!sequence || sequence.length === 0) {
        return [];
    }

    const n = sequence.length;
    const variants = [];
    const probability = 1 / n; // Uniform distribution

    // Generate variant for each position (1-indexed)
    for (let i = 0; i < n; i++) {
        const deletedBase = sequence[i];
        const position = i + 1; // 1-indexed position
        
        // Create deletion variant: sequence before + sequence after
        const variantSequence = sequence.slice(0, i) + sequence.slice(i + 1);
        
        // Calculate molecular weight for the variant
        const mw = calculateFullSequenceMW(variantSequence, buildingBlocks);

        variants.push({
            position: position,
            deletedBase: deletedBase,
            sequence: variantSequence,
            mw: mw,
            probability: probability
        });
    }

    return variants;
}

