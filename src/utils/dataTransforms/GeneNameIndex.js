'use strict;'

const geneNameIndex = (geneNames) => {
    this.geneNames = geneNames.sort()

    this.getIndex = (geneName) => geneNames.indexOf(geneName)

    return {
        'geneNames': this.geneNames,
        'getIndex': (geneName) => this.getIndex(geneName)
    }
}

module.exports = {
    geneNameIndex
}

/*
// some simple tests
const someGenes = ['aGene', 'bGene', 'zGene', 'cGene']
const index = geneNameIndex(someGenes)
console.log('geneName ', index.geneNames)       // geneName  [ 'aGene', 'bGene', 'cGene', 'zGene' ]
console.log('aGene', index.getIndex('aGene'))   // aGene 0
console.log('zGene', index.getIndex('zGene'))   // zGene 3
console.log('bGene', index.getIndex('bGene'))   // bGene 1
console.log('cGene', index.getIndex('cGene'))   // cGene 2
*/