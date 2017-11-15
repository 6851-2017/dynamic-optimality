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
  // Helper methods
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



//////////////////////////////////////

/**
 * A structure that maintains the working set invariant.
 * The working set invariant:
 *   (2) Every element in deque i has a smaller working
 *       set than every element in deque i+1.
 *   (1) Element x lies after y in some deque i iff 
 *       x has a smaller working set than y.
 */
class WorkingSetStructure {
  constructor() {
    /**
      A list of AVL trees to store the elements.
      this.trees[i] has size 2^(2^i)
      (except the last one, which might be smaller).
      */
    this.trees = [];

    /**
      A list of deques to store the elements.
      this.deques[i] has size 2^(2^i)
      (except the last one, which might be smaller).
      */
    this.deques = [];

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

  }

  ////////////////////////////////////////////////
  // Public methods
  //

  /**
   * Insert value into the structure.
   */
  insert(value) {

  }

  /**
   * Delete value from the structure.
   */
  delete(value) {

  }

  /**
   * Search for value in the structure.
   * Returns null if the value isn't in the structure.
   */ 
  search(value) {

  }
}

var workingSet = new WorkingSetStructure();
console.log(workingSet.trees);
console.log(workingSet.deques);