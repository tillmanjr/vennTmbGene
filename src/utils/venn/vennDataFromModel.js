'use strict;'

function vennDataFromModel(model) {
    const genePrefix = 'gene_'
    const tmbPrefix = 'tmb_'

    const setData = {tmbData: [], geneData: [], geneTmbData: []}
    const tmbRangePrefixMap = []
    const genePrefixMap = []
    const geneSpecimenCountAccum = []
    // const geneAreaGentNameMap = []
    // const tmbAreaTmbLabelMap = []
    const tmbLabels = [
        'TMB Low',
        'TMB Mid',
        'TMB High'
    ]

    model.modelTmbRangeSpecimenCounts.forEach(item => {
        const index = item[0]
        const lhs = `${tmbPrefix}${index}`
        const set = [lhs]
        const value = item[1]
        const label = tmbLabels[index]
        setData.tmbData.push({set, value, label})
        tmbRangePrefixMap.push({index, prefix: lhs})
    });

    model.availableGenes.forEach(item => {
        const index = item[0]
        const prefix = `${genePrefix}${item[0]}`
        const geneName = item[1]
        genePrefixMap.push({index, prefix, geneName})
        
        const value = 0
        geneSpecimenCountAccum.push({index, value, geneName})
    })

    model.geneTmbRangeCount.forEach(item => {
        const lhs = `${genePrefix}${item[0]}`
        const rhs = `${tmbPrefix}${item[1]}`
        const set = [lhs, rhs]
        const value = item[2]
        label = ''
        setData.geneTmbData.push({set, value, label})

        const geneAccum = geneSpecimenCountAccum[item[0]].value
        geneSpecimenCountAccum[item[0]].value = geneAccum + value 
    })

    geneSpecimenCountAccum.forEach(item => {
        const lhs = `${genePrefix}${item.index}`
        const set = [lhs]
        const value = item.value
        const label = item.geneName
        setData.geneData.push({set, value, label})
    })

    

    const tmbRangeLabels = []
    model.tmbRangeLabels.forEach(item => {
        const index = item[0]
        const label = item[1]
        tmbRangeLabels.push({index, label})
    })

    return {
        setData,
        genePrefixMap,
        tmbRangePrefixMap,
        tmbRangeLabels
    }
}