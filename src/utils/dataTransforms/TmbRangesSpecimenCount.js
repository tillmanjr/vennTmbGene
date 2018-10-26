'use strict;'

 const tmbRangesSpecimenCount = (tmbRangesCount) => {
    this.tmbRangesArr = []
    for (var i=0; i < tmbRangesCount; i++ ) {
        this.tmbRangesArr[i] = 0
    }
    
    this.incrementRange = (rangeIndex) => {
        if (rangeIndex >= this.tmbRangesArr.length) {
            console.log(`tried to increment out of bounds. array length" ${this.tmbRangesArr.length} index: ${rangeIndex}`)
            return -1
        }
        const currSpecimenCnt = this.tmbRangesArr[rangeIndex]
        if (currSpecimenCnt) {
            this.tmbRangesArr[rangeIndex] = currSpecimenCnt + 1
            return currSpecimenCnt + 1
        }

        this.tmbRangesArr[rangeIndex] = 1
        return 1
    }

    this.getSpecimenCount = (rangeIndex) => {
        const result = this.tmbRangesArr[rangeIndex]
        return result ? result : 0
    }

    this.flatten = () => {
        const result = []
        const arrLen = this.tmbRangesArr.length
        for (var i = 0; i < arrLen; i++) {
            const specimenCount = this.getSpecimenCount(i)
            result.push([i, specimenCount])
        }
        return result
    } 

    return {
        tmbRangesArr: this.tmbRangesArr,
        incrementRange: (rangeIndex) => this.incrementRange(rangeIndex),
        getSpecimenCount: (rangeIndex) => this.getSpecimenCount(rangeIndex),
        flatten: () => this.flatten()
    }
}

module.exports = {
     tmbRangesSpecimenCount
}