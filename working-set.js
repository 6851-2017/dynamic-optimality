/**
 * A class that represents a node in an AVL tree.
 *
 * Reference: https://en.wikipedia.org/wiki/AVL_tree
 */
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
          this.parent = null;
        }
        // LR: 
        else if (heightB >= heightA && heightB >= heightC) {
          this.rotateLR();
          this.parent = null;}
      }
      // L and RL rotations
      else if (factor < -1) {
        var heightA = (this.rightChild.rightChild != null) ? this.rightChild.rightChild.height : 0;
        var heightB = (this.rightChild.leftChild != null) ? this.rightChild.leftChild.height : 0;
        var heightC = (this.leftChild != null) ? this.leftChild.height : 0;
        // L:
        if (heightA >= heightB && heightA >= heightC) {
          this.rotateL();
          this.parent = null;}
        // RL:
        else if (heightB >= heightA && heightB >= heightC) {
          this.rotateRL();
          this.parent = null;}
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
    if (this.parent != null) {
      this.parent.rightChild = this
    }
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
    leftSize = (this.rightChild != null) ? this.leftChild.size : 0;
    this.size = rightSize + leftSize + 1;
    // not sure if the following is necessary...
    if (this.parent != null) {
      rightHeight = (this.parent.rightChild != null) ? this.parent.rightChild.height : 0;
      leftHeight = (this.parent.leftChild != null) ? this.parent.leftChild.height : 0;
      this.parent.height = Math.max(rightHeight, leftHeight) + 1
    }
  }

  rotateL() {
    // rotation
    var temp = this.copy();
    this.updateRoot(temp.rightChild);
    if (this.parent != null) {
      this.parent.leftChild = this
    }
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
    if (this.parent != null) {
      rightHeight = (this.parent.rightChild != null) ? this.parent.rightChild.height : 0;
      leftHeight = (this.parent.leftChild != null) ? this.parent.leftChild.height : 0;
      this.parent.height = Math.max(rightHeight, leftHeight) + 1
    }
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
      var value = "_".repeat(max_chars)+" ".repeat((Math.pow(2, this.height-level+1)-1)*max_chars);
      if (node != null && node.value != null) {
        value = "_".repeat(max_chars - node.value.toString().length)+node.value.toString()+" ".repeat((Math.pow(2, this.height-level+1)-1)*max_chars);
      }
      if (l != level) {
        s += "\n";
        if (level < this.height){
          s += " ".repeat((Math.pow(2, this.height-level)-1)*max_chars);
        }
        l = level;
      }
      s += value;
      var rightChild = [null, level+1];
      var leftChild = [null, level+1];
      if (node != null) {rightChild = [node.rightChild, level+1]};
      if (node != null) {leftChild = [node.leftChild, level+1]};
      if (l < this.height) {q.push(leftChild, rightChild);}
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
      this.rebalance();
    } else {
      for (var i = 0; i < val.length; i ++) {
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
      throw new Error("value already exists in tree");
    } else if (this.value < val) {
      if (this.rightChild != null) {
        this.rightChild.insertHelper(val);
      } else {
        this.rightChild = new AvlNode(val);
        this.rightChild.parent = this;
        this.updateHeightsAndSizes();
      }
    } else if (this.value > val) {
      if (this.leftChild != null) {
        this.leftChild.insertHelper(val);
      } else {
        this.leftChild = new AvlNode(val);
        this.leftChild.parent = this;
        this.updateHeightsAndSizes();
      }
    }
  }

  /**
   * Starting at this node, updates the heights and sizes of all nodes
   * on the path to the root. Used after an insert/delete operation
   * to account for those operations modifying the heights of
   * subtrees.
   */
  updateHeightsAndSizes() {
    var x = this;
    while (x != null) {
      var rightHeight = (x.rightChild != null) ? x.rightChild.height : 0;
      var leftHeight = (x.leftChild != null) ? x.leftChild.height : 0;
      var rightSize = (x.rightChild != null) ? x.rightChild.size : 0;
      var leftSize = (x.leftChild != null) ? x.leftChild.size : 0;
      x.height = Math.max(rightHeight, leftHeight) + 1;
      x.size = rightSize + leftSize + 1;
      x = x.parent;
    }
  }

/**
   * Delete the given value from this node's subtree.
   * Returns true if the value was in this node's
   * subtree and false otherwise.
   */  
  delete(val) {
    var r = this.deleteHelper(val);
    this.rebalance();
    return r;
  }

  /**
   * Helper function for delete - carries out delete
   * operation, besides rebalancing.
   */
  deleteHelper(val) {
    var node = this.search(val);
    if (node == null) {
      return false;
    }
    var parent = node.parent;
    if (node.leftChild != null && node.rightChild != null) {
      var succ = node.successor();
      node.value = succ.value;
      succ.deleteHelper(succ.value);
    } else if (node.leftChild != null) {
      node.replaceWith(node.leftChild);
    } else if (node.rightChild != null) {
      node.replaceWith(node.rightChild);
    } else {
      node.replaceWith(null);
    }
    if (parent != null) { parent.updateHeightsAndSizes(); }
    return true;
  }

  /**
   * Finds the immediate successor of this node.
   */
  successor() {
    var current = null;
    if (this.rightChild != null) {
      current = this.rightChild;
    }
    while (current.leftChild){
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

}

class AvlTree {
  constructor() {
    this.rootNode = null;
  }

  insertSingle(value) {
    if (!this.rootNode) {
      console.log("no root node");
      var rootNode = new AvlNode(value);
      this.rootNode = rootNode;
    } else {
      console.log("root node");
      this.rootNode.insert(value);
    }
  }

  insert(value) {
    if (typeof value == 'number') {
      this.insertSingle(value);
    } else {
      for (var i = 0; i < value.length; i ++) {
        this.insertSingle(value[i]);
      }
    } 
  }

  delete(value) {
    if (!this.rootNode) {
      return false;
    } else {
      return this.rootNode.delete(value);
    }
  }

}

// Demonstrate basic functions

var tree = new AvlTree();
var toInsert = [5, 3, 2, 6, 9, 15, 12, 13, 14/*, 20, 25, 30, 28, 31, 29*/]; 
tree.insert(toInsert);
console.log("did the insert");
console.log(tree.rootNode.size);
console.log(tree.rootNode.toString());
// TODO: Doesn't look balanced here
tree.delete(2);
tree.delete(5);
console.log(tree.rootNode.size);
console.log(tree.rootNode.toString());
tree.delete(15);
tree.delete(13);
tree.delete(14);
console.log(tree.rootNode.size);
console.log(tree.rootNode.toString());
tree.delete(30);
tree.delete(25);
console.log(tree.rootNode.toString());
tree.delete(31);
tree.delete(28);
console.log(tree.rootNode.toString());

// Demonstrate search
/**
console.log(rootNode.search(5));
console.log(rootNode.search(3));
console.log(rootNode.search(25));
console.log(rootNode.search(40));
console.log(rootNode.search(-2));
*/

//////////////////////////////////////

/**
 * A class for a structure that maintains the working set invariant.
 * 
 * The working set invariant:
 *   (2) Every element in deque i has a smaller working
 *       set than every element in deque i+1.
 *   (1) Element x lies after y in some deque i iff 
 *       x has a smaller working set than y.
 * 
 * Reference: https://en.wikipedia.org/wiki/Iacono%27s_working_set_structure
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
    if (h < j) {
      for (var i = h; i < j; i++) {
        // deque and item from Q_i, and enqueue the item into Q_i+1
        var item = this.deques[i].dequeue();
        this.deques[i + 1].enqueue(item);
        // delete the item from T_i and insert into T_i+1
        this.trees[i].delete(item);
        this.trees[i + 1].insert(item);
      }
    } else if (j < h) {
      for (var i = h; i > j; i--) {
        // deque and item from Q_i, and enqueue the item into Q_i-1
        var item = this.deques[i].dequeue();
        this.deques[i - 1].enqueue(item);
        // delete the item from T_i and insert into T_i-1
        this.trees[i].delete(item);
        this.trees[i - 1].insert(item);
      }
    }
  }

  ////////////////////////////////////////////////
  // Public methods
  //

  /**
   * Insert value into the structure.
   */
  insert(value) {
    if (this.trees && this.deques) {
      var k = this.trees.length;
      if (this.trees[k-1].size > Math.pow(2, Math.pow(2, k))) {
        // TODO need support for empty constructors
        this.trees.push(AvlNode());
        this.deques.push(deque());
      } else {
        this.trees[0].insert(value);
        this.deques[0].enqueue(value);
      }
    } else {
      this.trees.push(AvlNode(value));
      this.deques.push(deque(value));
    }
    this.shift(0, this.deques.length -1);
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
        this.deques[i].remove(value);
        break;
      }
    }
    if (foundIndex != null) {
      this.shift(this.deques.length - 1, foundIndex);
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

    if (!j) {
      // value is not in the tree
      return null;
    }

    // Delete value from T_j
    this.trees[j].delete(node);
    // TODO: Delete it from deque j

    // Insert value into T_1
    this.trees[j].insert(node);
    this.deques[j].enqueue(value);

    // Shift 1 -> j
    this.shift(1, j);

    return value;
  }
}

/*
var workingSet = new WorkingSetStructure();

workingSet.insert(5);
console.log(workingSet.trees);
console.log(workingSet.deques);
*/