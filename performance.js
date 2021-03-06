/**
 * Data structures to compare: Linked List, BST, AVL tree, Hash Table, Splay Tree, Working Set
 * Interface/API that must be shared by all structures:
 * insert(value) --> void
 * delete(value) --> false, or void
 * search(value) --> false, or value
 */

/**
 * BST
 * Adapted from: http://www.geeksforgeeks.org/implementation-binary-search-tree-javascript/
 */

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        // root of a binary seach tree
        this.root = null;
    }

    // helper method which creates a new node to 
    // be inserted and calls insertNode
    insert(data) {
        // Creating a node and initailising 
        // with data 
        var newNode = new Node(data);

        // root is null then node will
        // be added to the tree and made root.
        if (this.root === null)
            this.root = newNode;
        else

            // find the correct position in the 
            // tree and add the node
            this.insertNode(this.root, newNode);
    }

    // Method to insert a node in a tree
    // it moves over the tree to find the location
    // to insert a node with a given data 
    insertNode(node, newNode) {
        // if the data is less than the node
        // data move left of the tree 
        if (newNode.data < node.data) {
            // if left is null insert node here
            if (node.left === null)
                node.left = newNode;
            else

                // if left is not null recurr until 
                // null is found
                this.insertNode(node.left, newNode);
        }

        // if the data is more than the node
        // data move right of the tree 
        else {
            // if right is null insert node here
            if (node.right === null)
                node.right = newNode;
            else

                // if right is not null recurr until 
                // null is found
                this.insertNode(node.right, newNode);
        }
    }

    // helper method that calls the 
    // deleteNode with a given data
    delete(data) {
        // root is re-initialized with
        // root of a modified tree.
        this.root = this.deleteNode(this.root, data);
        if (this.root == null) {
            return false;
        }
    }

    // Method to delete node with a 
    // given data
    // it recurrs over the tree to find the
    // data and deletes it
    deleteNode(node, key) {

        // if the root is null then tree is 
        // empty
        if (node === null)
            return null;

        // if data to be delete is less than 
        // roots data then move to left subtree
        else if (key < node.data) {
            node.left = this.deleteNode(node.left, key);
            return node;
        }

        // if data to be delete is greater than 
        // roots data then move to right subtree
        else if (key > node.data) {
            node.right = this.deleteNode(node.right, key);
            return node;
        }

        // if data is similar to the root's data 
        // then delete this node
        else {
            // deleting node with no children
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }

            // deleting node with one children
            if (node.left === null) {
                node = node.right;
                return node;
            }

            else if (node.right === null) {
                node = node.left;
                return node;
            }

            // Deleting node with two children
            // minumum node of the rigt subtree
            // is stored in aux
            var aux = this.findMinNode(node.right);
            node.data = aux.data;

            node.right = this.deleteNode(node.right, aux.data);
            return node;
        }

    }

    // Helper functions
    //  finds the minimum node in tree
    // searching starts from given node
    findMinNode(node) {
        // if left of a node is null
        // then it must be minimum node
        if (node.left === null)
            return node;
        else
            return this.findMinNode(node.left);
    }
    // returns root of the tree
    getRootNode() {
        return this.root;
    }
    // Performs inorder traversal of a tree
    inorder(node) {
        if (node !== null) {
            this.inorder(node.left);
            console.log(node.data);
            this.inorder(node.right);
        }
    }
    // Performs preorder traversal of a tree  
    preorder(node) {
        if (node != null) {
            console.log(node.data);
            this.preorder(node.left);
            this.preorder(node.right);
        }
    }
    // Performs postorder traversal of a tree
    postorder(node) {
        if (node != null) {
            this.postorder(node.left);
            this.postorder(node.right);
            console.log(node.data);
        }
    }
    // search for a node with given data
    search(data) {
        var node = this.root
        // if tree is empty return null
        if (node === null)
            return false;
        // if data is less than node's data
        // move left
        else if (data < node.data)
            return this.search(node.left, data);

        // if data is less than node's data
        // move left
        else if (data > node.data)
            return this.search(node.right, data);

        // if data is equal to the node data 
        // return node
        else
            return node;
    }
}

/**
 * Deque, AVL, Working Set
 * Taken from: working-set.js
 */

class DequeNode {
    constructor(value, prev, next) {
        this.value = value;
        this.prev = prev;
        this.next = next;
    }
}

class Deque {
    constructor() {
        this.first = null;
        this.last = null;

        // If the deque has only 1 element,
        // then this.first = this.last.

        // If the deque has 0 elements,
        // then this.first = this.last = null.
    }

    /**
     * Push the given node to the front of the deque.
     */
    pushToFront(node) {
        if (!this.last) {
            this.last = node;
            this.first = node;
            node.next = null;
            node.prev = null;
        } else if (this.first == this.last) {
            this.first = node;
            this.first.next = this.last;
            this.last.prev = this.first;
        } else {

            this.first.prev = node;

            node.next = this.first;
            node.prev = null;

            this.first = node;
        }
    }

    /**
     * Push the given node to the back of the deque.
     */
    pushToBack(node) {
        if (!this.last) {
            this.last = node;
            this.first = node;
            node.next = null;
            node.prev = null;
        } else if (this.first == this.last) {
            this.last = node;
            this.last.prev = this.first;
            this.first.next = this.last;
        } else {
            this.last.next = node;

            node.next = null;
            node.prev = this.last;

            this.last = node;
        }
    }

    /**
     * Pop the node at the front of the deque,
     *   removing it from the structure.
     * Returns the popped node.
     */
    popFromFront() {
        var nodeToReturn = this.first;
        if (this.first == this.last) {
            this.first = null;
            this.last = null;
        } else {
            this.first = this.first.next;
            this.first.prev = null;
        }

        return nodeToReturn;
    }

    /**
     * Pop the node at the back of the deque,
     *   removing it from the structure.
     * Returns the popped node.
     */
    popFromBack() {
        var nodeToReturn = this.last;
        if (this.first == this.last) {
            this.first = null;
            this.last = null;
        } else {
            this.last = this.last.prev;
            this.last.next = null;
        }
        return nodeToReturn;
    }

    /**
     * Print the deque from front to back.
     */
    showDeque() {
        var currentNode = this.first;
        while (currentNode) {
            console.log(currentNode);
            currentNode = currentNode.next;
        }
    }

    /**
     * Finds value in the deque and removes it.
     * Returns the node with that value, or null
     *   if the value was not in the deque.
     */
    findAndPop(value) {
        var currentNode = this.first;
        while (currentNode) {
            if (currentNode.value == value) {

                if (currentNode.prev) {
                    currentNode.prev.next = currentNode.next;
                } else {
                    this.first = currentNode.next;
                }

                if (currentNode.next) {
                    currentNode.next.prev = currentNode.prev;
                } else {
                    this.last = currentNode.prev;
                }

                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return null;
    }

    toString() {
        var total = '[';
        var currentNode = this.first;
        while (currentNode) {
            total += currentNode.value + ', ';
            currentNode = currentNode.next;
        }
        total += ']';
        return total;
    }

    // Functions just for performance testing purposes (insert, search):
    // Note: We are using implementation of deque for doubly-linked list.

    insert(value) {
        var node = new DequeNode(value);
        this.pushToBack(node);
    }

    search(value) {
        var currentNode = this.first;
        while (currentNode) {
            if (currentNode.value == value) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return null;
    }
}

class AvlNode {
    constructor(value) {
        /** The value that this node stores */
        this.value = value;

        /** The node's parent*/
        this.parent = null;

        /** The node's left child */
        this.leftChild = null;

        /** The node's right child */
        this.rightChild = null;

        /** The node's height */
        this.height = 1;

        /** The size of this node's subtree, including itself */
        this.size = 1;
    }


    ////////////////////////////////////////////////
    // Helper methods
    //

    /**
     * Rebalances this node.
     * If the node is already balanced, does nothing.
     */
    rebalance() {
        // Rebalance only while |balance factor| is not <= 1:
        var factor = this.getBalanceFactor();
        if (!(Math.abs(factor) <= 1)) {
            // R and LR rotations
            if (factor > 1) {
                var heightA = (this.leftChild.leftChild != null) ? this.leftChild.leftChild.height : 0;
                var heightB = (this.leftChild.rightChild != null) ? this.leftChild.rightChild.height : 0;
                var heightC = (this.rightChild != null) ? this.rightChild.height : 0;
                // R:
                if (heightA >= heightB && heightA >= heightC) {
                    this.rotateR();
                    //this.parent = null;
                }
                // LR: 
                else if (heightB >= heightA && heightB >= heightC) {
                    this.rotateLR();
                    //this.parent = null;
                }
            }
            // L and RL rotations
            else if (factor < -1) {
                var heightA = (this.rightChild.rightChild != null) ? this.rightChild.rightChild.height : 0;
                var heightB = (this.rightChild.leftChild != null) ? this.rightChild.leftChild.height : 0;
                var heightC = (this.leftChild != null) ? this.leftChild.height : 0;
                // L:
                if (heightA >= heightB && heightA >= heightC) {
                    this.rotateL();
                    //this.parent = null;
                }
                // RL:
                else if (heightB >= heightA && heightB >= heightC) {
                    this.rotateRL();
                    //this.parent = null;
                }
            }
        }
    }

    /**
     * Helper functions (rotations and updating root) for rebalancing.
     */

    rotateR() {
        // rotation
        var temp = this.copy();
        this.updateRoot(temp.leftChild);
        /*
        if (this.parent != null) {
          this.parent.rightChild = this
        }
        */
        temp.leftChild = this.rightChild;
        if (temp.leftChild != null) {
            temp.leftChild.parent = temp;
        }
        this.rightChild = temp;
        this.rightChild.parent = this;
        // update heights
        var rightHeight = (this.rightChild.rightChild != null) ? this.rightChild.rightChild.height : 0;
        var leftHeight = (this.rightChild.leftChild != null) ? this.rightChild.leftChild.height : 0;
        this.rightChild.height = Math.max(rightHeight, leftHeight) + 1
        rightHeight = (this.rightChild != null) ? this.rightChild.height : 0;
        leftHeight = (this.leftChild != null) ? this.leftChild.height : 0;
        this.height = Math.max(rightHeight, leftHeight) + 1
        // update sizes
        var rightSize = (this.rightChild.rightChild != null) ? this.rightChild.rightChild.size : 0;
        var leftSize = (this.rightChild.leftChild != null) ? this.rightChild.leftChild.size : 0;
        this.rightChild.size = rightSize + leftSize + 1;
        rightSize = (this.rightChild != null) ? this.rightChild.size : 0;
        leftSize = (this.leftChild != null) ? this.leftChild.size : 0;
        this.size = rightSize + leftSize + 1;
        // not sure if the following is necessary...
        /*
        if (this.parent != null) {
          rightHeight = (this.parent.rightChild != null) ? this.parent.rightChild.height : 0;
          leftHeight = (this.parent.leftChild != null) ? this.parent.leftChild.height : 0;
          this.parent.height = Math.max(rightHeight, leftHeight) + 1
        }
        */
    }

    rotateL() {
        // rotation
        var temp = this.copy();
        this.updateRoot(temp.rightChild);
        /*
        if (this.parent != null) {
          this.parent.leftChild = this
        }
        */
        temp.rightChild = this.leftChild;
        if (temp.rightChild != null) {
            temp.rightChild.parent = temp;
        }
        this.leftChild = temp;
        this.leftChild.parent = this;
        // update heights
        var rightHeight = (this.leftChild.rightChild != null) ? this.leftChild.rightChild.height : 0;
        var leftHeight = (this.leftChild.leftChild != null) ? this.leftChild.leftChild.height : 0;
        this.leftChild.height = Math.max(rightHeight, leftHeight) + 1
        rightHeight = (this.rightChild != null) ? this.rightChild.height : 0;
        leftHeight = (this.leftChild != null) ? this.leftChild.height : 0;
        this.height = Math.max(rightHeight, leftHeight) + 1
        // update sizes
        var rightSize = (this.leftChild.rightChild != null) ? this.leftChild.rightChild.size : 0;
        var leftSize = (this.leftChild.leftChild != null) ? this.leftChild.leftChild.size : 0;
        this.leftChild.size = rightSize + leftSize + 1;
        rightSize = (this.rightChild != null) ? this.rightChild.size : 0;
        leftSize = (this.leftChild != null) ? this.leftChild.size : 0;
        this.size = rightSize + leftSize + 1;
        // not sure if the following is necessary...
        /*
        if (this.parent != null) {
          rightHeight = (this.parent.rightChild != null) ? this.parent.rightChild.height : 0;
          leftHeight = (this.parent.leftChild != null) ? this.parent.leftChild.height : 0;
          this.parent.height = Math.max(rightHeight, leftHeight) + 1
        }
        */
    }

    rotateLR() {
        this.leftChild.rotateL();
        this.rotateR();
    }

    rotateRL() {
        this.rightChild.rotateR();
        this.rotateL();
    }

    updateRoot(newRoot) {
        this.value = newRoot.value;
        this.leftChild = newRoot.leftChild;
        if (this.leftChild != null) {
            this.leftChild.parent = this;
        }
        this.rightChild = newRoot.rightChild;
        if (this.rightChild != null) {
            this.rightChild.parent = this;
        }
    }

    ////////////////////////////////////////////////
    // Public methods
    //

    /**
     * Make a copy of node ('this'). Returns copy.
     */
    copy() {
        var newNode = new AvlNode(this.value);
        newNode.leftChild = this.leftChild;
        newNode.rightChild = this.rightChild;
        if (newNode.leftChild != null) {
            newNode.leftChild.parent = newNode;
        }
        if (newNode.rightChild != null) {
            newNode.rightChild.parent = newNode;
        }
        newNode.height = this.height;
        newNode.parent = this.parent;
        return newNode;
    }

    /**
     * Overrides default toString() method. 
     * Returns a pretty-printed tree.
     */
    toString() {
        var s = "\n";
        var q = [[this, 1]];
        var i = 0;
        var max_chars = 2;
        var l = 0;
        while (i < q.length) {
            var node = q[i][0];
            var level = q[i][1];
            i++;
            var value = "_".repeat(max_chars) + " ".repeat((Math.pow(2, this.height - level + 1) - 1) * max_chars);
            if (node != null && node.value != null) {
                // TODO: Don't think this can handle 3-digit numbers like 100
                value = "_".repeat(max_chars - node.value.toString().length) + node.value.toString() + " ".repeat((Math.pow(2, this.height - level + 1) - 1) * max_chars);
            }
            if (l != level) {
                s += "\n";
                if (level < this.height) {
                    s += " ".repeat((Math.pow(2, this.height - level) - 1) * max_chars);
                }
                l = level;
            }
            s += value;
            var rightChild = [null, level + 1];
            var leftChild = [null, level + 1];
            if (node != null) { rightChild = [node.rightChild, level + 1] };
            if (node != null) { leftChild = [node.leftChild, level + 1] };
            if (l < this.height) { q.push(leftChild, rightChild); }
        }
        return s;
    }

    /**
     * Returns the balance factor of this node.
     * AVL invariant requires that the balance
     * factor is -1, 0, or 1.
     */
    getBalanceFactor() {
        var leftHeight = (this.leftChild != null) ? this.leftChild.height : 0;
        var rightHeight = (this.rightChild != null) ? this.rightChild.height : 0;
        return leftHeight - rightHeight;
    }

    /**
     * Insert the given node into this node's subtree.
     */
    insert(val) {
        if (typeof val == 'number') {
            this.insertHelper(val);
            //this.rebalance();
        } else {
            for (var i = 0; i < val.length; i++) {
                this.insert(val[i]);
            }
        }
    }

    /**
     * Helper for insert - inserts the node, except for
     * rebalancing.
     */
    insertHelper(val) {
        if (this.value == val) {
            throw new Error("value " + val + " already exists in tree");
        } else if (this.value < val) {
            if (this.rightChild != null) {
                this.rightChild.insertHelper(val);
            } else {
                this.rightChild = new AvlNode(val);
                this.rightChild.parent = this;
                this.updateToRoot();
                //this.rebalancePath();
            }
        } else if (this.value > val) {
            if (this.leftChild != null) {
                this.leftChild.insertHelper(val);
            } else {
                this.leftChild = new AvlNode(val);
                this.leftChild.parent = this;
                this.updateToRoot();
                //this.rebalancePath();
            }
        }
        //this.rebalance();
    }

    /**
     * Starting at this node, rebalances all nodes
     * on the path to the root. Used after an insert/delete operation
     * to account for those operations modifying the heights of
     * subtrees.
     */
    rebalancePath() {
        return;
        /*    
        var x = this;
        while (x != null) {
          x.rebalance();
          x = x.parent;
        }
        */
    }

    /**
     * Starting at this node, updates the heights and sizes of all nodes
     * on the path to the root. Used after an insert/delete operation
     * to account for those operations modifying the heights of
     * subtrees.
     */
    updateToRoot() {
        var x = this;
        while (x != null) {
            var rightHeight = (x.rightChild != null) ? x.rightChild.height : 0;
            var leftHeight = (x.leftChild != null) ? x.leftChild.height : 0;
            var rightSize = (x.rightChild != null) ? x.rightChild.size : 0;
            var leftSize = (x.leftChild != null) ? x.leftChild.size : 0;
            x.height = Math.max(rightHeight, leftHeight) + 1;
            x.size = rightSize + leftSize + 1;
            x.rebalance();
            x = x.parent;
        }
    }

    /**
       * Delete the given value from this node's subtree.
       * Returns the new root of the tree if the value
       * was in this node's subtree and false otherwise.
       */
    delete(val) {
        var r = this.deleteHelper(val);
        this.rebalance();
        return r;
    }

    /**
     * Helper function for delete - carries out delete
     * operation, besides rebalancing.
     * Returns the new root of the tree, or null if
     * the delete is unsuccessful.
     */
    deleteHelper(val) {
        var node = this.search(val);
        var deletingRoot = false;
        var returnNode;
        if (node == null) {
            return null;
        }
        if (node == this) {
            deletingRoot = true;
        }
        var parent = node.parent;
        if (node.leftChild != null && node.rightChild != null) {
            var succ = node.successor();
            node.value = succ.value;
            succ.deleteHelper(succ.value);
            returnNode = node;
        } else if (node.leftChild != null) {
            returnNode = node.replaceWith(node.leftChild);
        } else if (node.rightChild != null) {
            returnNode = node.replaceWith(node.rightChild);
        } else {
            returnNode = node.replaceWith(null);
        }
        if (parent != null) {
            parent.updateToRoot();
            //parent.rebalancePath();
        }
        if (deletingRoot == true) {
            return returnNode;
        } else {
            return this;
        }
    }

    /**
     * Finds the immediate successor of this node.
     */
    successor() {
        var current = null;
        if (this.rightChild != null) {
            current = this.rightChild;
        }
        while (current.leftChild) {
            current = current.leftChild;
        }
        return current;
    }

    /**
     * Replace this node with a new node (one of its child nodes)
     * or null, effectively erasing it. Used in delete, in the 
     * case of the deleted node having 0 or 1 children.
     */
    replaceWith(newNode) {
        if (newNode != null) {
            newNode.parent = this.parent;
        }
        if (this.parent != null) {
            var left = false
            var right = false
            if (this != null && this.parent.leftChild != null) {
                if (this.value == this.parent.leftChild.value) {
                    left = true
                }
            }
            if (this != null && this.parent.rightChild != null) {
                if (this.value == this.parent.rightChild.value) {
                    right = true
                }
            }
            if (this == this.parent.leftChild || left) {
                this.parent.leftChild = newNode;
                this.parent = null
            } else if (this == this.parent.rightChild || right) {
                this.parent.rightChild = newNode;
                this.parent = null;
            }
        }
        return newNode;
    }

    /**
     * Search for the given value in this node's subtree.
     * Returns the AvlNode that contains that value.
     * Returns null if the value is not in this subtree.
     */
    search(value) {
        if (this.value == value) {
            return this;
        } else if (value < this.value && this.leftChild) {
            return this.leftChild.search(value);
        } else if (value > this.value && this.rightChild) {
            return this.rightChild.search(value);
        } else {
            return null;
        }
    }


    toStringJustMe() {
        var totalString = 'node toStringJustMe;';
        totalString += 'val:' + this.value;
        if (this.parent) {
            totalString += 'parentVal:' + this.parent.value + ';';
        } else {
            totalString += "no parent;";
        }
        if (this.leftChild) {
            totalString += 'leftChildVal:' + this.leftChild.value + ';';
        } else {
            totalString += "no left child;";
        }
        if (this.rightChild) {
            totalString += 'rightChildVal:' + this.rightChild.value + ';';
        } else {
            totalString += "no right child;";
        }
        return totalString;
    }

}

class AvlTree {
    constructor() {
        this.rootNode = null;
    }

    insertSingle(value) {
        if (!this.rootNode) {
            var rootNode = new AvlNode(value);
            this.rootNode = rootNode;
        } else {
            this.rootNode.insert(value);
        }
    }

    insert(value) {
        if (typeof value == 'number') {
            this.insertSingle(value);
        } else {
            for (var i = 0; i < value.length; i++) {
                this.insertSingle(value[i]);
            }
        }
    }

    delete(value) {
        if (!this.rootNode) {
            return false;
        } else {
            var newRoot = this.rootNode.delete(value);
            this.rootNode = newRoot;
        }
    }

    search(value) {
        if (!this.rootNode) {
            return false;
        } else {
            return this.rootNode.search(value);
        }
    }

    size() {
        if (!this.rootNode) {
            return 0;
        } else {
            return this.rootNode.size;
        }
    }

}

class WorkingSetStructure {
    constructor() {
        /**
          A list of AVL trees to store the elements.
          this.trees[i] has size 2^(2^i)
          (except the last one, which might be smaller).
          */
        this.trees = [];

        var firstTree = new AvlTree();
        this.trees.push(firstTree);

        /**
          A list of deques to store the elements.
          this.deques[i] has size 2^(2^i)
          (except the last one, which might be smaller).
          */
        this.deques = [];

        var firstDeque = new Deque();
        this.deques.push(firstDeque);

        // For all i, all elements in this.trees[i]
        //   are in all elemetns in this.deques[i] and
        //   vice versa.
        // Each element is in exactly one tree and
        //   and exactly one deque.
    }

    ////////////////////////////////////////////////
    // Helper methods
    //

    /**
     * Shift from h to j.
     * Both h and j are indices of some tree/deque in
     *   our structure.
     * The shift will decrease the size of trees[h] and deques[h]
     *   by 1 and increase the size of trees[j] and deques[j]
     *   by 1, maintaining the working set invariant.
     */
    shift(h, j) {
        if (h < j) {
            for (var i = h; i < j; i++) {
                // deque and item from Q_i, and enqueue the item into Q_i+1
                var item = this.deques[i].popFromBack();
                this.deques[i + 1].pushToFront(new DequeNode(item.value));
                // delete the item from T_i and insert into T_i+1
                this.trees[i].delete(item.value);
                this.trees[i + 1].insert(item.value);
            }
        } else if (j < h) {
            for (var i = h; i > j; i--) {
                // deque and item from Q_i, and enqueue the item into Q_i-1
                var item = this.deques[i].popFromFront();
                if (!item) {
                    // This deque is empty, so just go to the previous deque
                    continue;
                }

                this.deques[i - 1].pushToBack(new DequeNode(item.value));
                // delete the item from T_i and insert into T_i-1
                this.trees[i].delete(item.value);
                this.trees[i - 1].insert(item.value);
            }
        }
    }

    ////////////////////////////////////////////////
    // Public methods
    //

    /**
     * Insert each value in the values array into the structure.
     * The first item in the array will be the earliest-accessed
     * item, and the last item will be the most recently
     * accessed item.
     */
    insertAll(values) {
        var that = this;
        values.forEach(function (value) {
            that.insert(value);
        })
    }

    /**
     * Insert value into the structure. Does not insert
     *   the value if it's already in the structure.
     */
    insert(value) {
        // Don't allow insertion of duplicate values.
        for (var i = 0; i < this.trees.length; i++) {
            var foundNode = this.trees[i].search(value);
            if (foundNode) {
                return;
            }
        }

        var k = this.trees.length;
        if (k == 0 || this.trees[k - 1].size() >= Math.pow(2, Math.pow(2, k))) {
            // Need to add a new tree to the end to fit this element
            this.trees.push(new AvlTree());
            this.deques.push(new Deque());
            k += 1;
        }

        this.trees[0].insert(value);
        this.deques[0].pushToFront(new DequeNode(value));

        this.shift(0, k - 1);
    }

    /**
     * Delete value from the structure.
     */
    delete(value) {
        var foundIndex = null;
        for (var i = 0; i < this.trees.length; i++) {
            var tree = this.trees[i];
            var exists = tree.search(value);
            if (exists != null) {
                tree.delete(value);
                foundIndex = i;
                this.deques[i].findAndPop(value);
                break;
            }
        }
        if (foundIndex != null) {
            this.shift(this.deques.length - 1, foundIndex);

            if (this.trees[this.trees.length - 1].size() == 0) {
                // We emptied the last one, so remove it
                this.trees.pop();
                this.deques.pop();
            }

            return true;
        } else {
            return false;
        }
    }

    /**
     * Search for value in the structure and returns that value.
     * Returns null if the value isn't in the structure.
     */
    search(value) {

        // Go through trees and search for value
        var j = null;
        var node = null;
        for (var i = 0; i < this.trees.length; i++) {
            var foundNode = this.trees[i].search(value);
            if (foundNode) {
                j = i;
                node = foundNode;
                break;
            }
        }

        if (j == null) { // if j = 0, j will evaluate to false
            // value is not in the tree
            return null;
        }

        if (j != 0) {
            this.trees[j].delete(value);
            this.trees[0].insert(value);
        }

        // Delete value from T_j
        this.deques[j].findAndPop(value);

        // Insert value into T_1
        this.deques[0].pushToFront(new DequeNode(value));

        // Shift 1 -> j
        this.shift(0, j);

        return node.value;
    }
}

/**
 * Hashtable
 * Adapted from: https://gist.github.com/alexhawkins/f6329420f40e5cafa0a4
 * For our use case, key = value (key is always equal to value).
 */

var HashTable = function () {
    this._storage = [];
    this._count = 0;
    this._limit = 8;
}

HashTable.prototype.insert = function (key) {
    var value = key
    //create an index for our storage location by passing it through our hashing function
    var index = this.hashFunc(key, this._limit);
    //retrieve the bucket at this particular index in our storage, if one exists
    //[[ [k,v], [k,v], [k,v] ] , [ [k,v], [k,v] ]  [ [k,v] ] ]
    var bucket = this._storage[index]
    //does a bucket exist or do we get undefined when trying to retrieve said index?
    if (!bucket) {
        //create the bucket
        var bucket = [];
        //insert the bucket into our hashTable
        this._storage[index] = bucket;
    }

    var override = false;
    //now iterate through our bucket to see if there are any conflicting
    //key value pairs within our bucket. If there are any, override them.
    for (var i = 0; i < bucket.length; i++) {
        var tuple = bucket[i];
        if (tuple[0] === key) {
            //overide value stored at this key
            tuple[1] = value;
            override = true;
        }
    }

    if (!override) {
        //create a new tuple in our bucket
        //note that this could either be the new empty bucket we created above
        //or a bucket with other tupules with keys that are different than 
        //the key of the tuple we are inserting. These tupules are in the same
        //bucket because their keys all equate to the same numeric index when
        //passing through our hash function.
        bucket.push([key, value]);
        this._count++
        //now that we've added our new key/val pair to our storage
        //let's check to see if we need to resize our storage
        if (this._count > this._limit * 0.75) {
            this.resize(this._limit * 2);
        }
    }
    return this;
};

HashTable.prototype.delete = function (key) {
    var index = this.hashFunc(key, this._limit);
    var bucket = this._storage[index];
    if (!bucket) {
        return false;
    }
    //iterate over the bucket
    for (var i = 0; i < bucket.length; i++) {
        var tuple = bucket[i];
        //check to see if key is inside bucket
        if (tuple[0] === key) {
            //if it is, get rid of this tuple
            bucket.splice(i, 1);
            this._count--;
            if (this._count < this._limit * 0.25) {
                this._resize(this._limit / 2);
            }
            return tuple[1];
        }
    }
};

HashTable.prototype.search = function (key) {
    var index = this.hashFunc(key, this._limit);
    var bucket = this._storage[index];

    if (!bucket) {
        return false;
    }

    for (var i = 0; i < bucket.length; i++) {
        var tuple = bucket[i];
        if (tuple[0] === key) {
            return tuple[1];
        }
    }

    return false;
};

HashTable.prototype.hashFunc = function (str, max) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        var letter = str[i];
        hash = (hash << 5) + letter.charCodeAt(0);
        hash = (hash & hash) % max;
    }
    return hash;
};

HashTable.prototype.resize = function (newLimit) {
    var oldStorage = this._storage;

    this._limit = newLimit;
    this._count = 0;
    this._storage = [];

    oldStorage.forEach(function (bucket) {
        if (!bucket) {
            return;
        }
        for (var i = 0; i < bucket.length; i++) {
            var tuple = bucket[i];
            this.insert(tuple[0]);
        }
    }.bind(this));
};

HashTable.prototype.retrieveAll = function () {
    console.log(this._storage);
    //console.log(this._limit);
};

/**
 * Splay Tree
 * Adapted from: https://github.com/slmoore/js-splay-tree/blob/master/splay-tree-clean.js
 * For our use case, key = value (key is always equal to value).
 */

function SplayNode(key, val) {
    this.key = key;
    this.val = val;
    this.left = null;
    this.right = null;
}

function SplayBst() {
    this.root = null;
}

SplayBst.prototype.search = function (k) {
    if (this.root === null || (!(Number(k) || k === 0) && typeof k !== "string"))
        return false;

    this.splay(k);
    return this.root.key === k ? this.root : false;
};

SplayBst.prototype.insert = function (k) {
    var v = k;
    var n;
    if ((!(Number(k) || k === 0) && typeof k !== "string")
        || (!(Number(v) || v === 0) && typeof v !== "string")) {
        throw new Error("Invalid insert");
        return;
    }

    if (this.root === null) {
        this.root = new SplayNode(k, v);
        return;
    }

    this.splay(k);

    if (this.root.key > k) {
        n = new SplayNode(k, v);
        n.left = this.root.left;
        n.right = this.root;
        this.root.left = null;
        this.root = n;

    } else if (this.root.key < k) {
        n = new SplayNode(k, v);
        n.right = this.root.right;
        n.left = this.root;
        this.root.right = null;
        this.root = n;

    } else {
        this.root.val = v;
    }

};

SplayBst.prototype.delete = function (k) {
    var temp;
    if (this.root === null || (!(Number(k) || k === 0) && typeof k !== "string"))
        return;

    this.splay(k);

    if (this.root.key === k) {

        if (this.root.left === null && this.root.right === null) {
            this.root = null;

        } else if (this.root.left === null) {
            this.root = this.root.right;

        } else {

            temp = this.root.right;

            this.root = this.root.left;

            this.splay(k);

            this.root.right = temp;
        }
    }

};

SplayBst.prototype.min = function (n) {
    var current;
    var minRecursive = function (cNode) {
        if (cNode.left) {
            return minRecursive(cNode.left);
        }
        return cNode;
    };

    if (this.root === null)
        return null;

    if (n instanceof SplayNode)
        current = n;
    else
        current = this.root;

    return minRecursive(current);
};

SplayBst.prototype.max = function (n) {
    var current;
    var maxRecursive = function (cNode) {
        if (cNode.right) {
            return maxRecursive(cNode.right);
        }
        return cNode;
    };

    if (this.root === null)
        return null;

    if (n instanceof SplayNode)
        current = n;
    else
        current = this.root;

    return maxRecursive(current);
};

SplayBst.prototype.inOrder = function (n, fun) {
    if (n instanceof SplayNode) {
        this.inOrder(n.left, fun);
        if (fun) { fun(n); }
        this.inOrder(n.right, fun);
    }
};

SplayBst.prototype.contains = function (k) {
    var containsRecursive = function (n) {
        if (n instanceof SplayNode) {
            if (n.key === k) {
                return true;
            }
            containsRecursive(n.left);
            containsRecursive(n.right);
        }
    };

    if (this.root === null || (!(Number(k) || k === 0) && typeof k !== "string"))
        return false;

    return containsRecursive(this.root) ? true : false;
};

SplayBst.prototype.rotateRight = function (n) {
    var temp;
    if (n instanceof SplayNode) {
        temp = n.left;
        n.left = temp.right;
        temp.right = n;
    }
    return temp;
};

SplayBst.prototype.rotateLeft = function (n) {
    var temp;
    if (n instanceof SplayNode) {
        temp = n.right;
        n.right = temp.left;
        temp.left = n;
    }
    return temp;
};

SplayBst.prototype.splay = function (k) {
    var splayRecursive = function (n, key) {

        if (n === null)
            return null;

        if (key < n.key) {

            if (n.left === null)
                return n;

            if (key < n.left.key) {
                n.left.left = splayRecursive(n.left.left, key);
                n = this.rotateRight(n);

            } else if (key > n.left.key) {
                n.left.right = splayRecursive(n.left.right, key);
                if (n.left.right !== null)
                    n.left = this.rotateLeft(n.left);
            }

            if (n.left === null)
                return n;
            else
                return this.rotateRight(n);

        } else if (key > n.key) {
            if (n.right === null)
                return n;

            if (key > n.right.key) {
                n.right.right = splayRecursive(n.right.right, key);
                n = this.rotateLeft(n);

            } else if (key < n.right.key) {
                n.right.left = splayRecursive(n.right.left, key);
                if (n.right.left !== null)
                    n.right = this.rotateRight(n.right);
            }

            if (n.right === null)
                return n;
            else
                return this.rotateLeft(n);

        } else {
            return n;
        }

    }.bind(this);

    if (this.root === null || (!(Number(k) || k === 0) && typeof k !== "string")) {
        throw new Error("Invalid splay");
        return;
    }

    this.root = splayRecursive(this.root, k);
    return;
};

/**
* Performance comparisons
*/

// The data structures we want to compare performances of:
var test_structures = ["LinkedList", "BST", "AVL", "HashTable", "Splay", "WorkingSet"];

// measures is a dictionary where key is data structure and values are op times
// example entry: "BST" : [[50ms, 80ms], [20ms, 30ms], ...]
var measures1 = { "LinkedList": [], "BST": [], "AVL": [], "HashTable": [], "Splay": [], "WorkingSet": [] };
var measures2 = { "LinkedList": [], "BST": [], "AVL": [], "HashTable": [], "Splay": [], "WorkingSet": [] };
var measures3 = { "LinkedList": [], "BST": [], "AVL": [], "HashTable": [], "Splay": [], "WorkingSet": [] };
var measures4 = { "LinkedList": [], "BST": [], "AVL": [], "HashTable": [], "Splay": [], "WorkingSet": [] };

// using npm package for timing
var now = require("performance-now")

function runTests(n) {
    // TEST 1:
    for (var i = 0; i < test_structures.length; i++) {
        test1(test_structures[i], n);
    }
    console.log("insert 1...", n, "and search 1...", n)
    console.log(measures1);
    // TEST 2:
    for (var i = 0; i < test_structures.length; i++) {
        test2(test_structures[i], n);
    }
    console.log("insert 1...", n, "and search ", n, "...1")
    console.log(measures2);
    // TEST 3:
    for (var i = 0; i < test_structures.length; i++) {
        test3(test_structures[i], n);
    }
    console.log("insert 1...", n, "and search 1 (", n, "times)")
    console.log(measures3);
    // TEST 4:
    for (var i = 0; i < test_structures.length; i++) {
        test4(test_structures[i], n);
    }
    console.log("insert 1...", n, "and search ", n, "(", n, "times)")
    console.log(measures4);
}

// insert 1...n and then search 1...n, no repeats:
function test1(structure, n) {
    if (structure == "LinkedList") {
        // Using our implementation of deque as LL (only push to back when inserting)
        var struct = new Deque();
    } else if (structure == "BST") {
        var struct = new BinarySearchTree();
    } else if (structure == "AVL") {
        var struct = new AvlTree();
    } else if (structure == "HashTable") {
        var struct = new HashTable();
    } else if (structure == "Splay") {
        var struct = new SplayBst();
    } else if (structure == "WorkingSet") {
        var struct = new WorkingSetStructure();
    }
    // INSERT 1...N
    // insert into data structure
    var t0 = now();
    for (var i = 1; i <= n; i++) {
        struct.insert(i);
    }
    var t1 = now();
    var structTime = (t1 - t0).toFixed(3)
    measures1[structure].push(["insert 1..." + n + " " + structure + ": " + structTime]);

    // SEARCH 1...N
    // search data structure
    var t0 = now();
    for (var i = 1; i <= n; i++) {
        struct.search(i);
    }
    var t1 = now();
    var structTime = (t1 - t0).toFixed(3)
    measures1[structure].push(["search 1..." + n + " " + structure + ": " + structTime]);
}

// insert 1...n and then search n...1, no repeats:
function test2(structure, n) {
    var workingSet = new WorkingSetStructure();
    if (structure == "LinkedList") {
        // Using our implementation of deque as LL (only push to back when inserting)
        var struct = new Deque();
    } else if (structure == "BST") {
        var struct = new BinarySearchTree();
    } else if (structure == "AVL") {
        var struct = new AvlTree();
    } else if (structure == "HashTable") {
        var struct = new HashTable();
    } else if (structure == "Splay") {
        var struct = new SplayBst();
    } else if (structure == "WorkingSet") {
        var struct = new WorkingSetStructure();
    }
    // INSERT 1...N
    // insert into data structure
    var t0 = now();
    for (var i = 1; i <= n; i++) {
        struct.insert(i);
    }
    var t1 = now();
    var structTime = (t1 - t0).toFixed(3)
    measures2[structure].push(["insert 1..." + n + " " + structure + ": " + structTime]);

    // SEARCH N...1
    // search data structure
    var t0 = now();
    for (var i = n; i > 0; i--) {
        struct.search(i);
    }
    var t1 = now();
    var structTime = (t1 - t0).toFixed(3)
    measures2[structure].push(["search " + n + "...1 " + structure + ": " + structTime]);
}

// insert 1...n and then search 1 (n times):
function test3(structure, n) {
    var workingSet = new WorkingSetStructure();
    if (structure == "LinkedList") {
        // Using our implementation of deque as LL (only push to back when inserting)
        var struct = new Deque();
    } else if (structure == "BST") {
        var struct = new BinarySearchTree();
    } else if (structure == "AVL") {
        var struct = new AvlTree();
    } else if (structure == "HashTable") {
        var struct = new HashTable();
    } else if (structure == "Splay") {
        var struct = new SplayBst();
    }  else if (structure == "WorkingSet") {
        var struct = new WorkingSetStructure();
    }
    // INSERT 1...N
    // insert into data structure
    var t0 = now();
    for (var i = 1; i <= n; i++) {
        struct.insert(i);
    }
    var t1 = now();
    var structTime = (t1 - t0).toFixed(3)
    measures3[structure].push(["insert 1..." + n + " " + structure + ": " + structTime]);

    // SEARCH 1
    // search data structure
    var t0 = now();
    for (var i = 1; i <= n; i++) {
        struct.search(1);
    }
    var t1 = now();
    var structTime = (t1 - t0).toFixed(3)
    measures3[structure].push(["search 1 (" + n + " times) " + structure + ": " + structTime]);
}

// insert 1...n and then search n (n times):
function test4(structure, n) {
    var workingSet = new WorkingSetStructure();
    if (structure == "LinkedList") {
        // Using our implementation of deque as LL (only push to back when inserting)
        var struct = new Deque();
    } else if (structure == "BST") {
        var struct = new BinarySearchTree();
    } else if (structure == "AVL") {
        var struct = new AvlTree();
    } else if (structure == "HashTable") {
        var struct = new HashTable();
    } else if (structure == "Splay") {
        var struct = new SplayBst();
    }  else if (structure == "WorkingSet") {
        var struct = new WorkingSetStructure();
    }
    // INSERT 1...N
    // insert into data structure
    var t0 = now();
    for (var i = 1; i <= n; i++) {
        struct.insert(i);
    }
    var t1 = now();
    var structTime = (t1 - t0).toFixed(3)
    measures4[structure].push(["insert 1..." + n + " " + structure + ": " + structTime]);

    // SEARCH N
    // search data structure
    var t0 = now();
    for (var i = 1; i <= n; i++) {
        struct.search(n);
    }
    var t1 = now();
    var structTime = (t1 - t0).toFixed(3)
    measures4[structure].push(["search " + n + " (" + n + " times) " + structure + ": " + structTime]);
}

runTests(10000);