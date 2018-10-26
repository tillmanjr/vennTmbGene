'use strict;'

const {
    createTdjrBST,
    ComparisonResult
} = require('./tdjr-bst')

/**
 * An alternate node.data which allows storing data (value) separate from the 
 * value (key) used to sort it.
 * Note: ensure the BinarySearchTree is created with a compareNodeData function
 *       which uses the key for comparison purposes, e.g. compareNodeDataKVP
 * @param {*} key 
 * @param {*} value 
 */
const createNodeDataKVP = (
    key,
    value
) => {
    return {
        'key': key,
        'value': value,
        'toString': () => `${key},${value}`
    }
}

/**
 * Comparison function for data objects having a key property
 *   Comparison is performed using the key property of each object
 * @param {*} lhs 
 * @param {*} rhs 
 */
const compareNodeDataKVP = (lhs, rhs) => {
    console.log(`kvp  cmp - lhs: ${lhs.key}, rhs: ${rhs.key}, diff: ${lhs.key - rhs.key}`)
    if (lhs.key < rhs.key) {
        return ComparisonResult.LESS_THAN
    }
    if (lhs.key > rhs.key) {
        return ComparisonResult.GREATER_THAN
    }
    return ComparisonResult.EQUAL_TO
}

const createTdjrBSTKVP = (compareNodeDataFn = compareNodeDataKVP) => {
    return createTdjrBST(compareNodeDataFn)
}

module.exports = {
    createNodeDataKVP,
    compareNodeDataKVP,
    createTdjrBSTKVP
}