'use strict;'

/** 
 * @fileOverview Implements basic nemeric Range functionality
 * A Range consists of the numeric values bounded by two limiting values, referred to as Bounds. 
 * The two ranges are generally referred to the Lower Bound and the Upper Bound.
 * A Bound's value can be participate in the Range in two way:
 *  Inclusionary - in this case the Bound's value is included within the range
 *  Exclusionary - in this case the Bound's value sets the Limit to the range but is not included
 *  e.g.
 *      Assume a Range with a Lower Bound 5 and an Upper Bound of 10, often expressed [5..10] or [5:10]
 *          If the Lower Bound is Exclusionary and the Upper Bound is Inclusionary 
 *              then any number greater than 5 AND less than or equal to 10 is within the Range
 *          If the Lower Bound is Inclusionary and the Upper Bound is Exclusionary
 *              then any number equal to or greater than 5 AND less than 10 is within the Range
 *          If the Lower Bound is Exclusionary and the Upper Bound is Exclusionary
 *              then any number greater than 5 AND less than 10 is within the Range
 *          If the Lower Bound is Inclusionary and the Upper Bound is Inclusionary
 *              then any number equal to or greater than 5 AND equal to or less than 10 is within the Range
 * 
 * To use:
 *  Require/Import range-helper
 *      const rangeHelper = require('<relativePath'/range-helper) 
 *  Use a range-helper function to create a range
 *      const rangeFrom6To100 = createRangeHelper(6, true, 100, false)
 *  Check if your value is within the range
 *      const myValue = 100
 *      const isInRange = rangeFrom6To100.isInRange(myValue)
 *   
 * 
*/

/**
 * Supported comparisons to indicate a value in relation to a given bound's value.
 * @enum {string}
 */
const BoundComparisonType = {
    LESS_THAN_BOUND: 'lessThanBound',
    GREATER_THAN_BOUND: 'greaterThanBound'
}

/**
 * A rule object for determining a given value's relationship to a given RangeBound
 * @typedef {object} BoundComparisonRuleType
 * @property {BoundComparisonType} comparisonType
 * @property {boolean} includeBound
 */

/**
 * Creates a BoundComparisonRuleType 
 * @param {BoundComparisonType} comparisonType 
 * @param {boolean} includeBound
 * @returns {BoundComparisonRuleType}
 */
const createBoundComparisonRule = (
    comparisonType,
    includeBound
) => {
    return {
        'comparisonType': comparisonType,
        'includeBound': includeBound
    }
}


/**
 * @typedef {Number} RangeBoundValue
 */

/**
 * Function using a BoundComparisonRuleType to compare a value against a RangeBoundValue 
 * @param {Number} value 
 * @param {RangeBoundValue} boundValue 
 * @param {BoundComparisonRuleType} comparisonRule
 * @returns {boolean}
 */
const compareToBound = (
    value,
    boundValue,
    comparisonRule
) => {
    const gtltComparison = comparisonRule.comparisonType === BoundComparisonType.LESS_THAN_BOUND ?
        Boolean( value < boundValue ) :
        Boolean( value > boundValue )

    // boundValue is excluded so return the gt/lt comparison
    if (!comparisonRule.includeBound) {
        return gtltComparison 
    }

    // gt/lt comparison failed but boundValue is included so check it
    if (!gtltComparison) {
        return Boolean( value === boundValue )
    }

    return true
}

/**
 * @typedef {object} RangeBoundType
 * @property {RangeBoundValue} boundValue
 * @property {BoundComparisonRuleType} comparisonRule
 * @property {function(Number):boolean} checkValue
 */

/**
 * @param {RangeBoundValue} boundValue 
 * @param {BoundComparisonRuleType} comparisonRule
 * @returns {RangeBoundType}
 */
const createBound = (
    boundValue,
    comparisonRule
) => {
    return {
            'boundValue': boundValue,
            'comparisonRule': comparisonRule,
            'checkValue': (value) => compareToBound(value, boundValue, comparisonRule)
        }
}

/**
 * @typedef {object} RangeType
 * @property {RangeBoundType} lowerBound
 * @property {RangeBoundType} upperBound
 * @property {function(Number):boolean} isInRange
 */

/**
 * Creates a new RangeType from 2 RangeBoundTypes 
 * @param {RangeBoundType} lowerBound 
 * @param {RangeBoundType} upperBound
 * @returns {RangeType}
 */
const createRange = (
    lowerBound,
    upperBound
) => {
    return {
        'lowerBound': lowerBound,
        'upperBound': upperBound,
        'isInRange': (value) => {
                return Boolean( lowerBound.checkValue(value) && upperBound.checkValue(value) )
            }
    }
}



module.exports = {
    BoundComparisonType,
    createBoundComparisonRule,
    compareToBound,
    createBound,
    createRange
}