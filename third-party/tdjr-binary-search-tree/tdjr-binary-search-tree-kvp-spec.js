const {
    BinarySearchTree
} = require('./tdjr-binary-search-tree')
const {
    createNodeDataKVP,
    compareNodeDataKVP,
    createBinarySearchTreeKvp
} = require('./tdjr-binary-search-tree-kvp')

var logObj = (msg, obj) => console.log(msg, obj)
var logMsg = (msg = ' ') => logObj(msg, ' ')

var binarySearchTree = createBinarySearchTreeKvp();
binarySearchTree.add(createNodeDataKVP(5, 'A'));
binarySearchTree.add(createNodeDataKVP(3, 'B'));
binarySearchTree.add(createNodeDataKVP(7, 'C'));
binarySearchTree.add(createNodeDataKVP(2, 'D'));
binarySearchTree.add(createNodeDataKVP(4, 'E'));
binarySearchTree.add(createNodeDataKVP(4, 'F'));
binarySearchTree.add(createNodeDataKVP(6, 'G'));
binarySearchTree.add(createNodeDataKVP(8, 'H'));

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