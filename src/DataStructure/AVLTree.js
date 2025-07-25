var defaultCmp = (a, b) => {
    if (a < b) {
        return -1;
    }
    else if (a > b) {
        return 1;
    }
    return 0;
}


function getHeight(node) {
    if (!node) return 0;
    return node.height;
}

function getBalance(node) {
    if (!node) return 0;
    var leftHeight = getHeight(node.left);
    var rightHeight = getHeight(node.right);
    return leftHeight - rightHeight;
}


function rightRotate(y) {
    var x = y.left;
    var T2 = x.right;
    x.right = y;
    y.left = T2;

    // Update heights
    y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
    x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;

    return x;
}

function leftRotate(x) {
    var y = x.right;
    var T2 = y.left;
    y.left = x;
    x.right = T2;

    x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
    y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;

    return y;
}

function insert(node, data, cmp) {
    if (!node) {
        return new AVLNode(data);
    }

    if (cmp(data, node.data) < 0) {
        node.left = insert(node.left, data, cmp);
    }
    else if (cmp(data, node.data) > 0) {
        node.right = insert(node.right, data, cmp);
    }
    else {
        // Duplicate data is not allowed in the AVL tree
        return node;
    }

    // Update height of this ancestor node
    node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;

    // Get the balance factor
    var balance = getBalance(node);

    // If the node becomes unbalanced, then there are 4 cases

    // Left Left Case
    if (balance > 1 && cmp(data, node.left.data) < 0) {
        return rightRotate(node);
    }

    // Right Right Case
    if (balance < -1 && cmp(data, node.right.data) > 0) {
        return leftRotate(node);
    }

    // Left Right Case
    if (balance > 1 && cmp(data, node.left.data) > 0) {
        node.left = leftRotate(node.left);
        return rightRotate(node);
    }

    // Right Left Case
    if (balance < -1 && cmp(data, node.right.data) < 0) {
        node.right = rightRotate(node.right);
        return leftRotate(node);
    }

    return node;
}

function minValueNode(node) {
    var current = node;
    while (current.left) {
        current = current.left;
    }
    return current;
}

function avlDelete(node, data, cmp) {
    var temp;
    if (!node) {
        return node;
    }

    if (cmp(data, node.data) < 0) {
        node.left = avlDelete(node.left, data, cmp);
    }
    else if (cmp(data, node.data) > 0) {
        node.right = avlDelete(node.right, data, cmp);
    }
    else {
        // Node with only one child or no child
        if (!node.left || !node.right) {
            temp = node.left ? node.left : node.right;

            // No child case
            if (!temp) {
                return null;
            }
            else {
                // One child case
                return temp;
            }
        }
        else {
            // Node with two children: Get the inorder successor (smallest in the right subtree)
            temp = minValueNode(node.right);

            // Copy the inorder successor's content to this node
            node.data = temp.data;

            // Delete the inorder successor
            node.right = avlDelete(node.right, temp.data, cmp);
        }
    }

    // If the tree had only one node then return
    if (!node) {
        return node;
    }

    // Update height of the current node
    node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;

    // Get the balance factor of this ancestor node to check whether this node became unbalanced
    var balance = getBalance(node);

    // If this node becomes unbalanced, then there are 4 cases

    // Left Left Case
    if (balance > 1 && getBalance(node.left) >= 0) {
        return rightRotate(node);
    }

    // Left Right Case
    if (balance > 1 && getBalance(node.left) < 0) {
        node.left = leftRotate(node.left);
        return rightRotate(node);
    }

    // Right Right Case
    if (balance < -1 && getBalance(node.right) <= 0) {
        return leftRotate(node);
    }

    // Right Left Case
    if (balance < -1 && getBalance(node.right) > 0) {
        node.right = rightRotate(node.right);
        return leftRotate(node);
    }

    return node;
}


function find(node, cp, thisArg) {
    if (!node) {
        return undefined;
    }
    var delta = cp.call(thisArg,cp);
    if (delta < 0) {
        return find(node.left, cp, thisArg);
    }
    else if (delta > 0) {
        return find(node.right, cp, thisArg);
    }
    else {
        return node.data;
    }
}


/**
 *
 * @param node
 * @param {function} onNode
 */
function inOrderTraversal(node, onNode) {
    if (node) {
        inOrderTraversal(node.left, onNode);
        onNode(node.data);
        inOrderTraversal(node.right, onNode);
    }
}


/**
 * AVL Tree Node.
 * @template T
 * @param {T} data
 * @constructor
 */
function AVLNode(data) {
    /** @type {T} */
    this.data = data;
    this.height = 1;
    /** @type {AVLNode<T>|null} */
    this.left = null;
    /** @type {AVLNode<T>|null} */
    this.right = null;
}


/**
 * @template T
 * @param {function(a:T, b:T): number} [cmp]
 * @param cmp
 * @constructor
 */
function AVLTree(cmp) {
    this.cmp = cmp || defaultCmp;
    /** @type {AVLNode<T>|null} */
    this.root = null;
}

/**
 *
 * @param {T} data
 */
AVLTree.prototype.insert = function (data) {
    this.root = insert(this.root, data, this.cmp);
};

/**
 *
 * @param {T} data
 */
AVLTree.prototype.delete = function (data) {
    this.root = avlDelete(this.root, data, this.cmp);
};

/**

 * In-order traversal of the AVL tree.
 * @param {function(data:T)} onNode
 */
AVLTree.prototype.inOrderTraversal = function (onNode) {
    inOrderTraversal(this.root, onNode);
};

/**

 * In-order traversal of the AVL tree.
 * @param {function(data:T):number} cp
 * @param {any=} thisArg
 */
AVLTree.prototype.find = function (cp, thisArg) {
    return find(this.root, cp, thisArg);
};

/**
 *
 * @returns {*[]}
 */
AVLTree.prototype.toArray = function () {
    var arr = [];
    this.inOrderTraversal(function (data) {
        arr.push(data);
    });
    return arr;
};


/**
 *
 * @param {any[]}arr
 * @param {function=} cmp
 * @return {AVLTree}
 */
AVLTree.fromArray = function (arr, cmp) {
    var tree = new AVLTree(cmp);
    for (var i = 0; i < arr.length; i++) {
        tree.insert(arr[i]);
    }
    return tree;
};

export default AVLTree;


var arr = Array(100).fill(0).map((_, i) => i );

var tree = AVLTree.fromArray(arr);
// console.log(tree, tree.toArray());
// console.log(tree.find(x=> x -10));