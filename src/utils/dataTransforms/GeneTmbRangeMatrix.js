'use strict;'

const mathjs = require('mathjs')

var geneTmbRangeMatrix = (geneCount, rangeCount) => {
    this.gtMatrix = mathjs.zeros(geneCount, rangeCount)
    this.geneCount = geneCount
    this.rangeCount = rangeCount

    this.getGeneRangeCount = (geneIndex, tmbRangeIndex) => {
        return this.gtMatrix.subset(mathjs.index(geneIndex, tmbRangeIndex))
    }

    this.incrementGeneRangeCount = (geneIndex, tmbRangeIndex) => {
        const currVal = this.getGeneRangeCount(geneIndex, tmbRangeIndex)
        const newVal = currVal + 1
        this.gtMatrix.subset(mathjs.index(geneIndex, tmbRangeIndex), newVal)
        return newVal
    }

    this.getGeneSum = (geneIndex) => {
        let accum = 0
        for (var i=0; i < this.rangeCount; i++) {
            accum += this.getGeneRangeCount(geneIndex, i)
        }
        return accum
    }

    this.getRangeSum = (rangeIndex) => {
        let accum = 0
        for (var i=0; i < this.geneCount; i++) {
            accum += this.getGeneRangeCount(i, rangeIndex)
        }
        return accum
    }

    this.print = () => console.log('geneTmbRangeMatrix', this.gtMatrix)

    this.flatten = () => {
        result = []
        for (var g = 0; g < this.geneCount; g++) {
            for (var r = 0; r < this.rangeCount; r++) {
                var cnt = this.gtMatrix.subset(mathjs.index(g, r))
                result.push([g, r, cnt])
            }
        }
        return result
    }

    return {
        matrix: this.gtMatrix,
        getGeneRangeCount: (geneIndex, tmbRangeIndex) => 
                            this.getGeneRangeCount(geneIndex, tmbRangeIndex),
        incrementGeneRangeCount: (geneIndex, tmbRangeIndex) => 
                            this.incrementGeneRangeCount(geneIndex, tmbRangeIndex),
        getGeneSum: (geneIndex) => this.getGeneSum(geneIndex),
        getRangeSum: (rangeIndex) => this.getRangeSum(rangeIndex),

        print: () => this.print(),
        flatten: () => this.flatten()
    }
}

module.exports = {
    geneTmbRangeMatrix
}