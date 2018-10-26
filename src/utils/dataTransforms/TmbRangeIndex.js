'use strict;'

const {
    createRangeHelper,
    createExactMatchRangeHelper,
    createLowerBoundedRangeHelper,
    createUpperBoundedRangeHelper
} = require('../../../third-party/tdjr-range-utils/src/range-helpers')

const tmbRangeIndex = (tmbThresholds) => {
    this.tmbThresholds = tmbThresholds.sort(function(lhs, rhs){return lhs - rhs})
    
    this.generateIndex = (thresholds) => {
        let curValue = -1;
        let isFirst = true;
        const result = thresholds.map( (value, index) => {
            const prevValue = curValue
            curValue = value
            if (isFirst) {
                return createUpperBoundedRangeHelper(value, true)
            }
            return createRangeHelper(prevValue, false, value, false)
        })
        result.push( createLowerBoundedRangeHelper(curValue, true))
        return result

    }
    this.tmbRanges = this.generateIndex(this.tmbThresholds)
    this.getIndex = (tmbScore) => {
        let found = false
        let currRangeIdx = -1
        const rangeCount = this.getLength()
        do {
            currRangeIdx++
            if (currRangeIdx < rangeCount) {
                const currRange = this.tmbRanges[currRangeIdx]
                if (currRange) {
                    if (currRange.isInRange(tmbScore) ) {
                        found=true
                    }
                }
            } else {
                found = true
                currRangeIdx = -1
            }
        }
        while ( !found )

        return currRangeIdx
    }

    this.getLength = () => { return this.tmbRanges.length }

    this.export = () => {
        const arr = new Array(this.getLength())
        for(var i=0; i< arr.length; i++) {
            range = this.tmbRanges[i]
            rangeAsString = range.toString()
            arr[i] = [i, rangeAsString]
        }
        return arr
    }

    return {
        tmbRanges: this.tmbRanges,
        getIndex: (tmbScore) => this.getIndex(tmbScore),
        rangeCount: () => this.getLength(),
        export: () => this.export()
    }

}

module.exports = {
    tmbRangeIndex
}

/*
// simple tests if wanted
const threshes = [0, 6, 12, 18]
const rangeIndex = tmbRangeIndex(threshes)

console.log('0: ', rangeIndex.getIndex(0))     // 0: 0
console.log('3: ', rangeIndex.getIndex(3))     // 3: 1
console.log('6: ', rangeIndex.getIndex(6))     // 6: 1
console.log('12: ', rangeIndex.getIndex(12))   // 12: 2
console.log('18: ', rangeIndex.getIndex(18))   // 18: 3
console.log('25: ', rangeIndex.getIndex(25))   // 25: 4
*/