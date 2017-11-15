console.log("avl tree");

/**
 * A class that represents a node in an AVL tree.
 *
 * Reference: https://en.wikipedia.org/wiki/AVL_tree
 */
var AvlNode = function(value) {
  /** The value that this node stores */
  this.value = value;

  /** The node's left child */
  this.leftChild = null;

  /** The node's right child */
  this.rightChild = null;

  /** The node's height */
  this.height = 1

  ////////////////////////////////////////////////
  // Private methods
  //

  /**
   * Rebalances this node.
   * If the node is already balanced, does nothing.
   */ 
  this.rebalance = function() {
    // TODO
  }

  ////////////////////////////////////////////////
  // Public methods
  //

/************ insert and delete should replace these *************
  this.setLeftChild = function(child) {
    this.leftChild = child;
    this.height = Math.max(this.leftChild.height, this.rightChild.height)
  }

  this.setRightChild = function(child) {
    this.rightChild = child;
    this.height = Math.max(this.leftChild.height, this.rightChild.height)
  }
******************************************************************/
  
  /**
   * Returns the balance factor of this node.
   * AVL invariant requires that the balance
   * factor is -1, 0, or 1.
   */
  this.getBalanceFactor = function() {
    var leftHeight, rightHeight;
    if (this.leftChild) {
      leftHeight = this.leftChild.height;
    } else {
      leftHeight = 0;
    }
    if (this.rightChild) {
      rightHeight = this.rightChild.height;
    } else {
      rightHeight = 0;
    }
    return leftHeight - rightHeight;
  }

  /**
   * Insert the given node into this node's subtree.
   */
  this.insert = function(/* AvlNode */ node) {
    // TODO

    this.rebalance();
  }

  /**
   * Delete the given node from this node's subtree.
   * Returns true if the node was in this node's
   *   subtree and false otherwise.
   */
  this.delete = function(/* AvlNode */ node) {
    // TODO

    this.rebalance();
  }
}

// Demonstrate basic functions
var rootNode = new AvlNode(7);
var left = new AvlNode(5);
var leftLeft = new AvlNode(3);

rootNode.setLeftChild(left);
left.setLeftChild(leftLeft);

console.log(rootNode.getHeight()); // 3
console.log(rootNode.getBalanceFactor()); // 2

right = new AvlNode(25);
rootNode.setRightChild(right);
console.log(rootNode.getHeight()); // 3
console.log(rootNode.getBalanceFactor()); // 1
