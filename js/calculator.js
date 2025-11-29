/**
 * Core molecular weight calculation engine
 */

const WATER_MW = 18.015; // Molecular weight of water (g/mol)

/**
 * Calculates the molecular weight of a full sequence
 * Formula: MW = Σ(base_count × base_MW) - (n-1) × 18.015
 * 
 * @param {string} sequence - Validated DNA sequence
 * @param {Object} buildingBlocks - Building blocks object with MW values
 * @returns {number} - Molecular weight in g/mol
 */
export function calculateFullSequenceMW(sequence, buildingBlocks) {
    if (!sequence || sequence.length === 0) {
        return 0;
    }

    let totalMW = 0;
    const n = sequence.length;

    // Sum up molecular weights of all bases
    for (let i = 0; i < n; i++) {
        const base = sequence[i];
        if (buildingBlocks[base]) {
            totalMW += buildingBlocks[base].mw;
        }
    }

    // Subtract (n-1) water molecules lost during synthesis
    totalMW -= (n - 1) * WATER_MW;

    return totalMW;
}

/**
 * Calculates base composition counts
 * @param {string} sequence - DNA sequence
 * @returns {Object} - Object with counts for each base
 */
export function calculateComposition(sequence) {
    const composition = {
        'A': 0,
        'C': 0,
        'G': 0,
        'T': 0
    };

    for (let i = 0; i < sequence.length; i++) {
        const base = sequence[i];
        if (composition.hasOwnProperty(base)) {
            composition[base]++;
        }
    }

    return composition;
}

