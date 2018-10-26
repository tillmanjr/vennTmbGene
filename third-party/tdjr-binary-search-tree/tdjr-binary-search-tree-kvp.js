const {
    ComparisonResult,
    BinarySearchTree,
    createBinarySearchTree,
} = require('./tdjr-binary-search-tree')


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
        'toString': () => `Key: ${key}, Value: ${value}`
    }
}

/**
 * Comparison function for data objects having a key property
 *   Comparison is performed using the key property of each object
 * @param {*} lhs 
 * @param {*} rhs 
 */
const compareNodeDataKVP = (lhs, rhs) => {
    if (lhs.key < rhs.key) {
        return ComparisonResult.LESS_THAN
    }
    if (lhs.key > rhs.key) {
        return ComparisonResult.GREATER_THAN
    }
    return ComparisonResult.EQUAL_TO
}

const createBinarySearchTreeKvp = (compareNodeDataFn = compareNodeDataKVP) => {
    return createBinarySearchTree(compareNodeDataFn)
}

module.exports = {
    createNodeDataKVP,
    compareNodeDataKVP,
    createBinarySearchTreeKvp
}
