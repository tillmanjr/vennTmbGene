'use strict;'
/**
 * @fileoverview Takes two arrays of data and performs the required transformation to use in our Venn Diagrams
 *      Inputs
 *          specimenTmbData -   Array containing 2 element Arrays of SpecimenId and TmbScore
 *                                  there is a one to one relationship from SpecimenId to TmbStore
 *          specimenGeneData -  Array containing 2 element Arrays of SpecimenId and Gene Name
 *                                  there is a many to many relationship between SpecimenIds and Gene Names
 *          availableGenes -    Aray of string containing ~5 Gene Games - need to be a small subset of 
 *                                  gene names from specimenGeneData**
 *          availableThresholds Array of int which will be converted in TMB Ranges
 * 
 *          ** it is not uncommon for a single specimen to have dozens of related genes and good sized cohort to 
 *                      have tens of thousands of different genes related among its specimens
 *                      e.g. the current SCLC cohort has 
 *                              27589  specimens 
 *                              4639   differnt genes represented among the specimens
 *                              740828 unique pairings of speciment and gene
 *                      SO, for the sake of Sanity and Practicality limit the model to only a few genes - rec 5
 * 
 *      Overview
 *          Process
 *              1 the available thresholds are converted into TMB Ranges, essentially buckets to group TMBScore
 *                  e.g. available thresholds = [6, 20]
 *                      converts to the following three ranges:
 *                                  TmbScore <= 6
 *                                  TmbScore > 6 and < 20
 *                                  TmbScore >= 20
 *              2 each specimen from specimenTmbData is 
 *                          sorted into a TMB Range - specimenTmbMap - 
 *                          total specimenId count per Range is accumumalated during range sorting
 *              3 each specimen / gene pair in specimenGeneData is processed to generate:
 *                          specimenId count per gene
 *                          specimenId count per gene per TMB Range 
 * 
 *          Model Properties
 *              tmbRangeCount           number - count of Tmb Ranges
 *              availableGenes          array  - element = array[2] (geneId, geneName)
 *              availableTmbThresholds  array  - element = array[2] (thresholdId, thresholdValue)
 *              tmbRangeLabels          array  - element = array[2] (tmbRangeId, rangeExpression*)
 *              geneTmbRangeCounts      array  - element = array[3] (geneId, tmbRangeId, specimenCount)
 *              tmbRangeSpecimenCounts  array  - element = array[2] (tmbRangeId, specimentCount)
 * 
 *              *rangeExpression is a textual expression of the range, e.g. '6 >= n < 20'
 * 
 */

const {
    tmbRangeIndex
} = require('./TmbRangeIndex')
const {
    specimenTmbRangeMap
} = require('./SpecimenTmbRangeMap')
const {
    tmbRangesSpecimenCount
} = require('./TmbRangesSpecimenCount')
const {
    geneTmbRangeMatrix
} = require('./GeneTmbRangeMatrix')

function vennGeneTmbModel (
    availableGenes,
    availableTmbThresholds, 
    specimenTmbData,
    specimenGeneData
) {
    const model = {}

    const genes = availableGenes
    const geneCount = genes.length
    const tmbThresholds = availableTmbThresholds
    // from the input tmbThresholds generate a set of TMB ranges
    const ranges = tmbRangeIndex(tmbThresholds)  
    const rangeCount = ranges.rangeCount()

    // data structure for specimen count per tmb range
    const tmbRangesSpecimensCnt = tmbRangesSpecimenCount(rangeCount)

    // fast lookup data structure 
    const specimenTmbMap = specimenTmbRangeMap()
    
    specimenTmbData.forEach( (specTmbPair) => {
        if (specTmbPair.valid) {
            const specimenID = specTmbPair.specimenId
            const tmbScore = specTmbPair.tmbScore

            const rangeIndex = ranges.getIndex(tmbScore)

            if (rangeIndex >= 0) {
                specimenTmbMap.addSpecimenTmbRange(specimenID, rangeIndex)
                tmbRangesSpecimensCnt.incrementRange(rangeIndex)
            } else {
                console.log(`range lookup failed ${specimenID}, ${tmbScore}`)
            }
        }
    })

    const geneTmbRangeCounts = geneTmbRangeMatrix(geneCount, rangeCount)

    specimenGeneData.forEach( (specGenePair) => {
        if (specGenePair.valid) {
            const specimenId = specGenePair.specimenId
            const geneName = specGenePair.geneName

            const geneIndex = genes.indexOf(geneName)
            if (geneIndex >= 0) {
                const rangeIndex = specimenTmbMap.getTmbRange(specimenId)
            
                if (rangeIndex >= 0) {
                    geneTmbRangeCounts.incrementGeneRangeCount(geneIndex, rangeIndex)
                }
            }
        }
    })

    model.data = {}
    model.data.availableGenes = genes.map((gene, index) => { return [index, gene]})
    model.data.availableTmbThresholds = tmbThresholds.map((threshold, index) => {return [index, threshold]})
    model.data.tmbRangeCount = rangeCount
    model.data.tmbRangeLabels = ranges.export()
    model.data.geneTmbRangeCounts = geneTmbRangeCounts.flatten()
    model.data.tmbRangeSpecimenCounts = tmbRangesSpecimensCnt.flatten()

    return model.data
}

module.exports = {
    vennGeneTmbModel
}
