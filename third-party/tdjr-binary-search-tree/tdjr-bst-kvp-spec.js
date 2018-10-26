'use strict;'

const {
    createNodeDataKVP,
    compareNodeDataKVP,
    createTdjrBSTKVP
} = require('./tdjr-bst-kvp')

var logObj = (msg, obj) => console.log(msg, obj)
var logMsg = (msg = ' ') => logObj(msg, ' ')

var binarySearchTree = createTdjrBSTKVP();

/* */
binarySearchTree.add(createNodeDataKVP(555000111.01, 2));
binarySearchTree.add(createNodeDataKVP(555000902.01, 1));
binarySearchTree.add(createNodeDataKVP(555000912.03, 1));
binarySearchTree.add(createNodeDataKVP(555000913.01, 1));

binarySearchTree.add(createNodeDataKVP(555000931.01, 2));
binarySearchTree.add(createNodeDataKVP(555000934.01, 1));
binarySearchTree.add(createNodeDataKVP(555000935.01, 4));

binarySearchTree.add(createNodeDataKVP(555000958.01, 1))
binarySearchTree.add(createNodeDataKVP(555000982.01, 1))
binarySearchTree.add(createNodeDataKVP(555000995.01, 2))
binarySearchTree.add(createNodeDataKVP(555001005.01, 4))
binarySearchTree.add(createNodeDataKVP(555001024.01, 2))
binarySearchTree.add(createNodeDataKVP(555001102.01, 4))
binarySearchTree.add(createNodeDataKVP(555001103.01, 2))
binarySearchTree.add(createNodeDataKVP(555001104.03, 2))
binarySearchTree.add(createNodeDataKVP(555001148.01, 1))
binarySearchTree.add(createNodeDataKVP(555001156.01, 2))
binarySearchTree.add(createNodeDataKVP(555001158.01, 0))
binarySearchTree.add(createNodeDataKVP(555001178.01, 3))

/*
binarySearchTree.add(createNodeDataKVP(555000931.01, 2));  // 5
binarySearchTree.add(createNodeDataKVP(555000912.03, 1)); // 3
binarySearchTree.add(createNodeDataKVP(555000935.01, 4)); // 7
binarySearchTree.add(createNodeDataKVP(555000902.01, 1)); // 2
binarySearchTree.add(createNodeDataKVP(555000913.01, 1)); // 4
binarySearchTree.add(createNodeDataKVP(555000913.01, 1)); // 4
binarySearchTree.add(createNodeDataKVP(555000934.01, 1)); // 6
binarySearchTree.add(createNodeDataKVP(555000958.01, 1)); // 8
*/

binarySearchTree.printByLevel()
console.log('height: ', binarySearchTree.getHeight())
console.log('isBalanced: ', binarySearchTree.isBalanced())

/*
1 Key: 555000111.01, Value: 2 
2 Key: 555000902.01, Value: 1 
3 Key: 555000912.03, Value: 1 
4 Key: 555000913.01, Value: 1 
5 Key: 555000931.01, Value: 2 
6 Key: 555000934.01, Value: 1 
7 Key: 555000935.01, Value: 4 
8 Key: 555000958.01, Value: 1 
Key: 555000982.01, Value: 1 
Key: 555000995.01, Value: 2 
Key: 555001005.01, Value: 4 
Key: 555001024.01, Value: 2 
Key: 555001102.01, Value: 4 
Key: 555001103.01, Value: 2 
Key: 555001104.03, Value: 2 
Key: 555001148.01, Value: 1 
Key: 555001156.01, Value: 2 
Key: 555001158.01, Value: 0 
Key: 555001178.01, Value: 3
*/

logMsg('--- Print')
binarySearchTree.print(); // => 5 | 3 7 | 2 4 6 8


logMsg()
logMsg('Print by level')
binarySearchTree.printByLevel(); // => 5 \n 3 7 \n 2 4 6 8

logMsg()
logMsg('--- DFS inOrder');
binarySearchTree.traverseDFS(function (node) {
    logMsg(node.data.toString());
}, 'inOrder'); // => 2 3 4 5 6 7 8

logMsg()
logMsg('--- DFS preOrder');
binarySearchTree.traverseDFS(function (node) {
    logMsg(node.data.toString());
}, 'preOrder'); // => 5 3 2 4 7 6 8

logMsg()
logMsg('--- DFS postOrder');
binarySearchTree.traverseDFS(function (node) {
    logMsg(node.data.toString());
}, 'postOrder'); // => 2 4 3 6 8 7 5

logMsg()
logMsg('--- BFS');
binarySearchTree.traverseBFS(function (node) {
    logMsg(node.data.toString());
}); // => 5 3 7 2 4 6 8

logMsg()
logMsg('--- Tree statistics')
logObj('min is 2:', binarySearchTree.getMin().toString()); // => 2
logObj('max is 8:', binarySearchTree.getMax().toString()); // => 8
logObj('tree contains 3 is true:', binarySearchTree.contains(3)); // => true
logObj('tree contains 9 is false:', binarySearchTree.contains(9)); // => false
logObj('tree height is 2:', binarySearchTree.getHeight()); // => 2
logObj('tree is balanced is true:', binarySearchTree.isBalanced()); // => true

logObj('tree is balanced optimized is false:', binarySearchTree.isBalancedOptimized()); // => false

logMsg()
logMsg('--- node removals')
binarySearchTree.remove(11); // remove non existing node
binarySearchTree.print(); // => 5 | 3 7 | 2 4 6 8
binarySearchTree.remove(5); // remove 5, 6 goes up
binarySearchTree.print(); // => 6 | 3 7 | 2 4 8
binarySearchTree.remove(7); // remove 7, 8 goes up
binarySearchTree.print(); // => 6 | 3 8 | 2 4
binarySearchTree.remove(8); // remove 8, the tree becomes unbalanced
binarySearchTree.print(); // => 6 | 3 | 2 4
logObj('tree is balanced is false:', binarySearchTree.isBalanced()); // => true

logMsg()
logMsg('--- remove remaining nodes')
binarySearchTree.remove(4);
binarySearchTree.remove(2);
binarySearchTree.remove(3);
binarySearchTree.remove(6);
binarySearchTree.print(); // => 'No root node found'
binarySearchTree.printByLevel(); // => 'No root node found'
logObj('tree height is -1:', binarySearchTree.getHeight()); // => -1
logObj('tree is balanced is true:', binarySearchTree.isBalanced()); // => true

logMsg()
logMsg('--- add a root node')
binarySearchTree.add(createNodeDataKVP(10, 'I'));
logObj('tree height is 0:', binarySearchTree.getHeight()); // => 0
logObj('tree is balanced is true:', binarySearchTree.isBalanced()); // => true