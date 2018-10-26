const {
    createBoundComparisonRule,
    createBound,
    createRange} = require('./range')

const { 
    createRangeHelper } = require('./range-helpers')

const testMessage = (value, expectedValue) => {
    const details = `value: ${value}, expected: ${expectedValue}`
    const passFail = value === expectedValue ? 'PASS' : 'FAIL'
    return `${passFail}\t${details}`
}

const ltEqRule = createBoundComparisonRule( 'lessThanBound', true )
const ltNotEqRule = createBoundComparisonRule( 'lessThanBound', false )

const gtEqRule = createBoundComparisonRule( 'greaterThanBound', true )
const gtNotEqRule = createBoundComparisonRule( 'greaterThanBound', false )

const lowerBoundInclude_6 = createBound(6, gtEqRule)
const lowerBoundInclude_6_check_5 = lowerBoundInclude_6.checkValue(5)
const lowerBoundInclude_6_check_6 = lowerBoundInclude_6.checkValue(6)
const lowerBoundInclude_6_check_7 = lowerBoundInclude_6.checkValue(7)

const lowerBoundExclude_6 = createBound(6, gtNotEqRule)
const lowerBoundExclude_6_check_5 = lowerBoundExclude_6.checkValue(5)
const lowerBoundExclude_6_check_6 = lowerBoundExclude_6.checkValue(6)
const lowerBoundExclude_6_check_7 = lowerBoundExclude_6.checkValue(7)

const upperBoundInclude_18 = createBound(18, ltEqRule)
const upperBoundInclude_18_check_17 = upperBoundInclude_18.checkValue(17)
const upperBoundInclude_18_check_18 = upperBoundInclude_18.checkValue(18)
const upperBoundInclude_18_check_19 = upperBoundInclude_18.checkValue(19)

const upperBoundExclude_18 = createBound(18, ltNotEqRule)
const upperBoundExclude_18_check_17 = upperBoundExclude_18.checkValue(17)
const upperBoundExclude_18_check_18 = upperBoundExclude_18.checkValue(18)
const upperBoundExclude_18_check_19 = upperBoundExclude_18.checkValue(19)

const rangeIncludeLower_6_18 = createRange(lowerBoundInclude_6, upperBoundExclude_18)
const rangeIncludeLower_6_18_check_5 = rangeIncludeLower_6_18.isInRange(5)
const rangeIncludeLower_6_18_check_6 = rangeIncludeLower_6_18.isInRange(6)
const rangeIncludeLower_6_18_check_7 = rangeIncludeLower_6_18.isInRange(7)
const rangeIncludeLower_6_18_check_18 = rangeIncludeLower_6_18.isInRange(18)
const rangeIncludeLower_6_18_check_19 = rangeIncludeLower_6_18.isInRange(19)

const rangeIncludeUpper_6_18 = createRange(lowerBoundExclude_6, upperBoundInclude_18)
const rangeIncludeUpper_6_18_check_5 = rangeIncludeUpper_6_18.isInRange(5)
const rangeIncludeUpper_6_18_check_6 = rangeIncludeUpper_6_18.isInRange(6)
const rangeIncludeUpper_6_18_check_7 = rangeIncludeUpper_6_18.isInRange(7)
const rangeIncludeUpper_6_18_check_18 = rangeIncludeUpper_6_18.isInRange(18)
const rangeIncludeUpper_6_18_check_19 = rangeIncludeUpper_6_18.isInRange(19)

const lowerBoundExact_12 = createBound(12, gtEqRule)
const upperBoundExact_12 = createBound(12, ltEqRule)
const rangeExact_12 = createRange(lowerBoundExact_12, upperBoundExact_12)
const rangeExact_12_check_11 = rangeExact_12.isInRange(11)
const rangeExact_12_check_12 = rangeExact_12.isInRange(12)
const rangeExact_12_check_13 = rangeExact_12.isInRange(13)

const rangeHelperIncludeLower_20_30 = createRangeHelper(20, true, 30, false)
const rangeHelperIncludeLower_20_30_check_19 = rangeHelperIncludeLower_20_30.isInRange(19)
const rangeHelperIncludeLower_20_30_check_20 = rangeHelperIncludeLower_20_30.isInRange(20)
const rangeHelperIncludeLower_20_30_check_21 = rangeHelperIncludeLower_20_30.isInRange(21)
const rangeHelperIncludeLower_20_30_check_30 = rangeHelperIncludeLower_20_30.isInRange(30)
const rangeHelperIncludeLower_20_30_check_31 = rangeHelperIncludeLower_20_30.isInRange(31)


console.log('========= check lower bounds ===============')
console.log('lowerBoundInclude_6_check_5', testMessage(lowerBoundInclude_6_check_5, false))
console.log('lowerBoundInclude_6_check_6', testMessage(lowerBoundInclude_6_check_6, true) )
console.log('lowerBoundInclude_6_check_7', testMessage(lowerBoundInclude_6_check_7, true) )

console.log('lowerBoundExclude_6_check_5', testMessage(lowerBoundExclude_6_check_5, false))
console.log('lowerBoundExclude_6_check_6', testMessage(lowerBoundExclude_6_check_6, false))
console.log('lowerBoundExclude_6_check_7', testMessage(lowerBoundExclude_6_check_7, true) )

console.log('')
console.log('========= check upper bounds ===============')
console.log('upperBoundInclude_18_check_17', testMessage(upperBoundInclude_18_check_17, true) )
console.log('upperBoundInclude_18_check_18', testMessage(upperBoundInclude_18_check_18, true) )
console.log('upperBoundInclude_18_check_19', testMessage(upperBoundInclude_18_check_19, false))

console.log('upperBoundExclude_18_check_17', testMessage(upperBoundExclude_18_check_17, true) )
console.log('upperBoundExclude_18_check_18', testMessage(upperBoundExclude_18_check_18, false))
console.log('upperBoundExclude_18_check_19', testMessage(upperBoundExclude_18_check_19, false))

console.log('')
console.log('========= check range lower inclusion, upper exclusion ===============')
console.log('rangeIncludeLower_6_18_check_5', testMessage(rangeIncludeLower_6_18_check_5,   false))
console.log('rangeIncludeLower_6_18_check_6', testMessage(rangeIncludeLower_6_18_check_6,   true) )
console.log('rangeIncludeLower_6_18_check_7', testMessage(rangeIncludeLower_6_18_check_7,   true) )
console.log('rangeIncludeLower_6_18_check_18', testMessage(rangeIncludeLower_6_18_check_18, false))
console.log('rangeIncludeLower_6_18_check_19', testMessage(rangeIncludeLower_6_18_check_19, false))


console.log('')
console.log('========= check range lower exclusion, upper inclusive ===============')
console.log('rangeIncludeUpper_6_18_check_5', testMessage(rangeIncludeUpper_6_18_check_5,   false))
console.log('rangeIncludeUpper_6_18_check_6', testMessage(rangeIncludeUpper_6_18_check_6,   false))
console.log('rangeIncludeUpper_6_18_check_7', testMessage(rangeIncludeUpper_6_18_check_7,   true))
console.log('rangeIncludeUpper_6_18_check_18', testMessage(rangeIncludeUpper_6_18_check_18,   true))
console.log('rangeIncludeUpper_6_18_check_19', testMessage(rangeIncludeUpper_6_18_check_19,   false))

console.log('')
console.log('========= check range exact match - single value range ===============')
console.log('rangeExact_12_check_11', testMessage(rangeExact_12_check_11, false))
console.log('rangeExact_12_check_12', testMessage(rangeExact_12_check_12, true))
console.log('rangeExact_12_check_13', testMessage(rangeExact_12_check_13, false))

console.log('')
console.log('========= check range helper ===============')
console.log('rangeHelperIncludeLower_20_30_check_19', testMessage(rangeHelperIncludeLower_20_30_check_19, false))
console.log('rangeHelperIncludeLower_20_30_check_20', testMessage(rangeHelperIncludeLower_20_30_check_20, true))
console.log('rangeHelperIncludeLower_20_30_check_21', testMessage(rangeHelperIncludeLower_20_30_check_21, true))
console.log('rangeHelperIncludeLower_20_30_check_30', testMessage(rangeHelperIncludeLower_20_30_check_30, false))
console.log('rangeHelperIncludeLower_20_30_check_31', testMessage(rangeHelperIncludeLower_20_30_check_31, false))