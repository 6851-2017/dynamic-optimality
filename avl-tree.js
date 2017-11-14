console.log("avl tree");

/**
 * A class that represents a node in an AVL tree.
 *
 * Reference: https://en.wikipedia.org/wiki/AVL_tree
 */
class AvlNode {
  constructor(value) {
    /** The value that this node stores */
    this.value = value;

    /** The node's left child */
    this.leftChild = null;

    /** The node's right child */
    this.rightChild = null;
  }
  

  ////////////////////////////////////////////////
  // Private methods
  //

  /**
   * Rebalances this node.
   * If the node is already balanced, does nothing.
   */ 
  rebalance() {
    // TODO
  }

  /**
   * Get the height of this node's left child.
   * If this node has no left child, returns 0.
   */
  getLeftChildHeight() {
    if (!this.leftChild) {
      return 0;
    }
    return this.leftChild.getHeight();
  }

  /**
   * Get the height of this node's right child.
   * If this node has no right child, returns 0.
   */
  getRightChildHeight() {
    if (!this.rightChild) {
      return 0;
    }
    return this.rightChild.getHeight();
  }

  ////////////////////////////////////////////////
  // Public methods
  //

  /**
   * Set this node's right child.
   */
  setLeftChild(/* AvlNode */ child) {
    this.leftChild = child;
  }

  /**
   * Set this node's right child.
   */
  setRightChild(/* AvlNode */ child) {
    this.rightChild = child;
  }

  // TODO: Need to store height as an attribute,
  //   otherwise will take O(n) time to get height

  /**
   * Returns the height of the subtree rooted at
   *   this node.
   */
  getHeight() {
    return Math.max(this.getLeftChildHeight(),
                    this.getRightChildHeight())
           + 1;
  }

  /**
   * Returns the balance factor of this node.
   * AVL invariant requires that the balance
   * factor is -1, 0, or 1.
   */
  getBalanceFactor() {
    return this.getLeftChildHeight() - this.getRightChildHeight();
  }

  /**
   * Insert the given node into this node's subtree.
   */
  insert(/* AvlNode */ node) {
    // TODO

    this.rebalance();
  }

  /**
   * Delete the given node from this node's subtree.
   * Returns true if the node was in this node's
   *   subtree and false otherwise.
   */
  delete(/* AvlNode */ node) {
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
