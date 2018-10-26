'use strict;'

/**
 * A readable enum representing the results of a compare function
 * @enum
 */
const ComparisonResult = {
    LESS_THAN: -1,
    EQUAL_TO: 0,
    GREATER_THAN: 1
}

/**
 * Default compare function for comparing node.data
 * @param {*} lhs 
 * @param {*} rhs 
 */
const compareNodeData = (lhs, rhs) => {
    console.log(`data cmp - lhs: ${lhs}, rhs: ${rhs}`)
    if (lhs < rhs) {
        return ComparisonResult.LESS_THAN
    }
    if (lhs > rhs) {
        return ComparisonResult.GREATER_THAN
    }
    return ComparisonResult.EQUAL_TO
}

function Node(data) {
    this.data = data;
    this.left = null;
    this.right = null;
}

const printToConsoleFn = (msg) => console.log(msg)

const createNode = (data) => new Node(data)

const tdjrBST = (compareNodeDataFn = compareNodeData) => {
    this.root = null;
    this.compareNodeDataFn = compareNodeDataFn

    this.isLessThanNodeData = (lhsNodeData, rhsNodeData) => {
        return Boolean(this.compareNodeDataFn(lhsNodeData, rhsNodeData) === ComparisonResult.LESS_THAN)
    }
    
    this.isGreaterThanNodeData = (lhsNodeData, rhsNodeData) => {
        return Boolean(this.compareNodeDataFn(lhsNodeData, rhsNodeData) === ComparisonResult.GREATER_THAN)
    }
    
    this.isEqualToNodeData = (lhsNodeData, rhsNodeData) => {
        return Boolean(this.compareNodeDataFn(lhsNodeData, rhsNodeData) === ComparisonResult.EQUAL_TO)
    }
    
    this.isLessThanNode = (lhsNode, rhsNode) => {
        return this.isLessThanNodeData(lhsNode.data, rhsNode.data)
    }
    
    this.isGreaterThanNode = (lhsNode, rhsNode) => {
        return this.isGreaterThanNodeData(lhsNode.data, rhsNode.data)
    }
    
    this.isEqualToNode = (lhsNode, rhsNode) => {
        return this.isEqualToNodeData(lhsNode.data, rhsNode.data)
    }

    this.add = (data) => {
        var node = new Node(data)
        if (!this.root) {
            this.root = node
        } else {
            var current = this.root
            while (current) {
                if (this.isLessThanNodeData(node.data, current.data)) {
                    if (!current.left) {
                        current.left = node
                        break
                    }
                    current = current.left
                } else if (this.isGreaterThanNodeData(node.data, current.data)) {
                    if (!current.right) {
                        current.right = node
                        break
                    }
                    current = current.right
                } else {
                    break
                }
            }
        }
    }

    this.remove = (data) => {
        var that = this
        var removeNode = function (node, data) {
            if (!node) {
                return null
            }
            if (that.isEqualToNodeData(data, node.data)) {
                if (!node.left && !node.right) {
                    return null
                }
                if (!node.left) {
                    return node.right
                }
                if (!node.right) {
                    return node.left
                }
                // 2 children
                var temp = that.getMin(node.right)
                node.data = temp
                node.right = removeNode(node.right, temp)
                return node
            } else if (that.isLessThanNodeData(data, node.data)) {
                node.left = removeNode(node.left, data)
                return node
            } else {
                node.right = removeNode(node.right, data)
                return node
            }
        };
        this.root = removeNode(this.root, data)
    }

    this.contains = (data) => {
        var current = this.root
        while (current) {
            if (this.isEqualToNodeData(data, current.data)) {
                return true
            }
            if (this.isLessThanNodeData(data, current.data)) {
                current = current.left
            } else {
                current = current.right
            }
        }
        return false
    }

    this.findNode = (data) => {
        var current = this.root
        while (current) {
            if (this.isEqualToNodeData(data, current.data)) {
                return current
            }
            if (this.isLessThanNodeData(data, current.data)) {
                current = current.left
            } else {
                current = current.right
            }
        }
        return null
    }

    this._preOrder = (node, fn) => {
        if (node) {
            if (fn) {
                fn(node)
            }
            this._preOrder(node.left, fn)
            this._preOrder(node.right, fn)
        }
    }

    this._inOrder = (node, fn) => {
        if (node) {
            this._inOrder(node.left, fn)
            if (fn) {
                fn(node);
            }
            this._inOrder(node.right, fn)
        }
    }

    this._postOrder = (node, fn) => {
        if (node) {
            this._postOrder(node.left, fn)
            this._postOrder(node.right, fn)
            if (fn) {
                fn(node)
            }
        }
    }

    this.traverseDFS = (fn, method) => {
        var current = this.root
        if (method) {
            this['_' + method](current, fn)
        } else {
            this._preOrder(current, fn)
        }
    };

    this.traverseBFS = (fn) => {
        this.queue = []
        this.queue.push(this.root)
        while (this.queue.length) {
            var node = this.queue.shift()
            if (fn) {
                fn(node)
            }
            if (node.left) {
                this.queue.push(node.left)
            }
            if (node.right) {
                this.queue.push(node.right)
            }
        }
    }

    this.print = (printToFn = printToConsoleFn) => {
        if (!this.root) {
            return printToFn('No root node found')
        }
        var newline = new Node('|')
        var queue = [this.root, newline]
        var string = ''
        while (queue.length) {
            var node = queue.shift()
            string += node.data.toString() + ' '
            if (node === newline && queue.length) {
                queue.push(newline)
            }
            if (node.left) {
                queue.push(node.left)
            }
            if (node.right) {
                queue.push(node.right)
            }
        }
        printToFn(string.slice(0, -2).trim())
    }

    this.printByLevel = (printToFn = printToConsoleFn) => {
        if (!this.root) {
            return console.log('No root node found');
        }
        var newline = new Node('\n');
        var queue = [this.root, newline];
        var string = '';
        while (queue.length) {
            var node = queue.shift();
            string += node.data.toString() + (node.data !== '\n' ? ' ' : '');
            if (node === newline && queue.length) {
                queue.push(newline);
            }
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        console.log(string);
    }

    this.getMin = (node) => {
        if (!node) {
            node = this.root
        }
        while (node.left) {
            node = node.left
        }
        return node.data
    }

    this.getMax = (node) => {
        if (!node) {
            node = this.root
        }
        while (node.right) {
            node = node.right
        }
        return node.data
    }
    
    this._getHeight = (node) => {
        if (!node) {
            return -1
        }
        var left = this._getHeight(node.left)
        var right = this._getHeight(node.right)
        return Math.max(left, right) + 1
    };
    
    this.getHeight = (node) => {
        if (!node) {
            node = this.root
        }
        return this._getHeight(node)
    };

    this._isBalanced = (node) => {
        if (!node) {
            return true
        }
        var heigthLeft = this._getHeight(node.left)
        var heigthRight = this._getHeight(node.right)
        var diff = Math.abs(heigthLeft - heigthRight)
        if (diff > 1) {
            return false
        } else {
            return this._isBalanced(node.left) && this._isBalanced(node.right)
        }
    }
    this.isBalanced = (node) => {
        if (!node) {
            node = this.root
        }
        return this._isBalanced(node)
    }

    this._checkHeight = (node) => {
        if (!node) {
            return 0
        }
        var left = this._checkHeight(node.left)
        if (left === -1) {
            return -1
        }
        var right = this._checkHeight(node.right)
        if (right === -1) {
            return -1
        }
        var diff = Math.abs(left - right)
        if (diff > 1) {
            return -1
        } else {
            return Math.max(left, right) + 1
        }
    }
    this.isBalancedOptimized = (node) => {
        if (!node) {
            node = this.root
        }
        if (!node) {
            return true
        }
        if (this._checkHeight(node) === -1) {
            return false
        } else {
            return true
        }
    }

    return {
        'add': (data) => this.add(data),
        'remove': (data) => this.remove(data),
        'contains': (data) => this.contains(data),
        'traverseDFS': (fn, method) => this.traverseDFS(fn, method),
        'traverseBFS': (fn) => this.traverseBFS(fn),
        'print': (printToFn) => this.print(printToFn),
        'printByLevel': (printToFn) => this.printByLevel(printToFn),
        'getMin': (node) => this.getMin(node),
        'getMax': (node) => this.getMax(node),
        'getHeight': (node) => this.getHeight(node),
        'isBalanced': (node) => this.isBalanced(node),
        'isBalancedOptimized': (node) => this.isBalancedOptimized(node)
    }
}

const createTdjrBST = (compareNodeDataFn) => {
    return tdjrBST(compareNodeDataFn)
}

module.exports = {
    createNode,
    createTdjrBST,
    compareNodeData,
    ComparisonResult
}
