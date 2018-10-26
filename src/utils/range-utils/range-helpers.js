'use strict;'

const {
    createBoundComparisonRule,
    createBound,
    createRange,
    BoundComparisonType
} = require('./range')

/**
 * @fileOverview Helper methods for creating ranges.
 *  Use these whenever possible instead of the lower level Range functions
 */
/* 


/**
 * Creates a Range with upper and lower bounds
 * @param {Number} lowerBoundValue 
 * @param {boolean} includeLowerBound 
 * @param {Number} upperBoundValue 
 * @param {boolean} includeUpperBound 
 */
const createRangeHelper = (
    lowerBoundValue,
    includeLowerBound,
    upperBoundValue,
    includeUpperBound
) => {
    const lowerBoundRule = createBoundComparisonRule(BoundComparisonType.GREATER_THAN_BOUND, includeLowerBound)
    const lowerBound = createBound( lowerBoundValue, lowerBoundRule )

    const upperBoundRule = createBoundComparisonRule(BoundComparisonType.LESS_THAN_BOUND, includeUpperBound)
    const upperBound = createBound(upperBoundValue, upperBoundRule)

    return createRange(lowerBound, upperBound)
}

/**
 * Creates a range where the upper and lower bounds are the same
 * @param {Number} rangeValue 
 */
const createExactMatchRangeHelper = (
    rangeValue
) => {
    return createRangeHelper(rangeValue, true, rangeValue, true)
}

/**
 * Creates a range of all numbers greater than a value. Optionally greater than or equal to
 * @param {Number} lowerBoundValue 
 * @param {boolean} includeLowerBound 
 */
const createLowerBoundedRangeHelper = (
    lowerBoundValue,
    includeLowerBound
) => {
    return createRangeHelper(lowerBoundValue, includeLowerBound, Number.MAX_SAFE_INTEGER, true )
}

/**
 * Creates a range of all numbers less than a value. Optionally less than or equal to
 * @param {Number} upperBoundValue 
 * @param {boolean} includeUpperBound 
 */
const createUpperBoundedRangeHelper = (
    upperBoundValue,
    includeUpperBound
) => {
    return createRangeHelper(Number.MIN_SAFE_INTEGER, true, upperBoundValue, includeUpperBound )
}

module.exports = {
    createRangeHelper,
    createExactMatchRangeHelper,
    createLowerBoundedRangeHelper,
    createUpperBoundedRangeHelper
}