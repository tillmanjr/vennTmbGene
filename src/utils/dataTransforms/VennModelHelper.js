'use strict;'


const {
    readFileAsync
} = require('../async-files')
const {vennGeneTmbModel} = require('./VennGeneTmbModel')

const pathSpecimenGene = 'data/subsets/specimen-gene-1-19.txt'
const pathSpecimenTmb = 'data/subsets/specimen-tmb-1-19.txt'

const pathFullSpecimenGene = 'data/rawImport/Export_SpecimenGene.txt'
const pathFullSpecimenTmb = 'data/rawImport/Export_SpecimenTmb.txt'

const useCompleteFiles = true

async function getSpecimenGene() {
    const path = useCompleteFiles ? pathFullSpecimenGene : pathSpecimenGene
    const result = await readFileAsync(path)
    return result
}

async function getSpecimenTmb() {
    const path = useCompleteFiles ? pathFullSpecimenTmb : pathSpecimenTmb
    const result = await readFileAsync(path)
    return result
}

const parseSpecimenTmbLine = (line) => {
    const pair = line.split('\t')
    const specimenId = pair[0] ? pair[0].trim() : ''
    const tmbScore = pair[1] ? parseInt(pair[1].trim()) : -1
    return {
        specimenId,
        tmbScore,
        valid: Boolean(specimenId && tmbScore >= 0)
    }
}

const parseSpecimenGeneLine = (line) => {
    const pair = line.split('\t')
    const specimenId = pair[0] ? pair[0].trim() : ''
    const geneName = pair[1] ? pair[1].trim() : ''
    return {
        specimenId,
        geneName,
        valid: Boolean(specimenId && geneName )
    }
}
// slower but prepping for async stream reads
async function getSpecimenTmbData() {
    const fileST = await getSpecimenTmb()
    const stLines = fileST.split('\n')
    const result = stLines.map( (line) => parseSpecimenTmbLine(line))

    return result
}

async function getSpecimenGeneData() {
    const fileSG = await getSpecimenGene()
    const sgLines = fileSG.split('\n')
    const result = sgLines.map( (line) => parseSpecimenGeneLine(line) )

    return result
}

async function createModel (genes, tmbThresholds){   
    try {
        const specTmbData = await getSpecimenTmbData()
        const specGeneData = await getSpecimenGeneData()

        const tStart = new Date().getTime()
        var result = vennGeneTmbModel(
            genes,
            tmbThresholds,
            specTmbData,
            specGeneData
        )
        const tEnd = new Date().getTime()
        const time = tEnd - tStart
        console.log(`total time to transform: ${time}ms`)
        return result
    } catch (err) {console.log(err)}
}


module.exports = {
    createModel
}



let model
const genes = ['KRAS', 'BRAF', 'PTEN', 'STK11', 'EGFR']
const tmbThresholds = [ 6, 20 ]
createModel(genes, tmbThresholds).then((result) => { 
    model = result

    const emitToConsole = true
    if (emitToConsole) {
        console.log('returned from createModel')

        const availableGenes = model.availableGenes
        console.log('availableGenes: ', availableGenes)

        const availableTmbThresholds = model.availableTmbThresholds
        console.log('availableTmbThresholds: ', availableTmbThresholds)

        const tmbRangeCount = model.tmbRangeCount
        console.log('tmbRangeCount: ', tmbRangeCount)
        
        const tmbRangeLabels = model.tmbRangeLabels
        console.log('tmbRangeLabels', tmbRangeLabels)

        const modelTmbRangeSpecimenCounts = model.tmbRangeSpecimenCounts
        console.log('modelTmbRangeSpecimenCounts', modelTmbRangeSpecimenCounts)

        const geneTmbRangeCount = model.geneTmbRangeCounts
        console.log('geneTmbRangeCount', geneTmbRangeCount)
        
        console.log('--- complete  ----')
    }

})