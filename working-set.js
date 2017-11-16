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

    /** The node's height */
    this.height = 1;
  
    /** The node's parent*/
    this.parent = null;
    
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
      console.log("rebalancing bc factor", factor);
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
    console.log("rotate right");
    // rotation
    var temp = this.copy();
    console.log(temp);
    this.updateRoot(temp.leftChild);
    temp.leftChild = this.rightChild;
    this.rightChild = temp;
    // update parents
    this.rightChild.parent = this;
    if (this.rightChild.leftChild != null) {
      this.rightChild.leftChild.parent = this.rightChild;
    }
    // update heights
    var rightHeight = (this.rightChild.rightChild != null) ? this.rightChild.rightChild.height : 0;
    var leftHeight = (this.rightChild.leftChild != null) ? this.rightChild.leftChild.height : 0;
    this.rightChild.height = Math.max(rightHeight, leftHeight) + 1
    rightHeight = (this.rightChild != null) ? this.rightChild.height : 0;
    leftHeight = (this.leftChild != null) ? this.leftChild.height : 0;
    this.height = Math.max(rightHeight, leftHeight) + 1
  }

  rotateL() {
    console.log("rotate left");
    // rotation
    var temp = this.copy();
    console.log(temp);
    this.updateRoot(temp.rightChild);
    temp.rightChild = this.leftChild;
    this.leftChild = temp;
    // update parents
    this.leftChild.parent = this;
    if (this.leftChild.rightChild != null) {
      this.leftChild.rightChild.parent = this.leftChild;
    }
    // update heights
    var rightHeight = (this.leftChild.rightChild != null) ? this.leftChild.rightChild.height : 0;
    var leftHeight = (this.leftChild.leftChild != null) ? this.leftChild.leftChild.height : 0;
    this.leftChild.height = Math.max(rightHeight, leftHeight) + 1
    rightHeight = (this.rightChild != null) ? this.rightChild.height : 0;
    leftHeight = (this.leftChild != null) ? this.leftChild.height : 0;
    this.height = Math.max(rightHeight, leftHeight) + 1
  }

  rotateLR() {
    console.log("rotate left-right");
    this.leftChild.rotateL();
    console.log(this.toString());
    if (this.leftChild != null) {
      this.leftChild.parent = this;
    }
    this.rotateR();
    console.log(this.toString());
  }

  rotateRL() {
    console.log("rotate right-left");
    this.rightChild.rotateR();
    console.log(this.toString());
    if (this.rightChild != null) {
      this.rightChild.parent = this;
      //console.log(this.rightChild);
      //console.log(this.rightChild.value, "has parent", this.value, "=", this.rightChild.parent.value);
      //console.log(this.rightChild.rightChild.parent.value, "has parent", this.rightChild.rightChild.parent.parent);
      //console.log(this.rightChild.rightChild.value, "has parent", this.rightChild.rightChild.parent);
    }
    this.rotateL();
    console.log(this.toString());
  }

  updateRoot(newRoot) {
    this.value = newRoot.value;
    this.leftChild = newRoot.leftChild;
    this.rightChild = newRoot.rightChild;
    this.height = newRoot.height;
    this.parent = newRoot.parent;
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
      if (node != null) {
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
    var childHeights = this.getChildHeights();
    return childHeights[0] - childHeights[1];
  }

  /**
   * Insert the given node into this node's subtree.
   */
  insert(val) {
    if (this.value == val) {
      throw new Error("value already exists in tree");
    } else if (this.value < val) {
      if (this.rightChild != null) {
        this.rightChild.insert(val);
      } else {
        this.rightChild = new AvlNode(val);
        this.rightChild.parent = this;
        this.updateHeights();
      }
    } else if (this.value > val) {
      if (this.leftChild != null) {
        this.leftChild.insert(val);
      } else {
        this.leftChild = new AvlNode(val);
        this.leftChild.parent = this;
        this.updateHeights();
      }
    }
  }

  /**
   * Starting at this node, updates the heights of all nodes
   * on the path to the root. Used after an insert/delete operation
   * to account for those operations modifying the heights of
   * subtrees.
   */
  updateHeights() {
    var x = this;
    while (x != null) {
      x.height = Math.max.apply(null, x.getChildHeights()) + 1;
      x = x.parent;
    }
  }

  /**
   * Return an array [leftChildHeight, rightChildHeight]
   * for this node, where each height is 0 if the child does
   * not exist.
   */
  getChildHeights() {
    var leftHeight = 0;
    var rightHeight = 0;
    if (this.leftChild != null) {
      leftHeight = this.leftChild.height;
    }
    if (this.rightChild != null) {
      rightHeight = this.rightChild.height;
    }
    return [leftHeight, rightHeight];
  }

  /**
   * Delete the given value from this node's subtree.
   * Returns true if the value was in this node's
   * subtree and false otherwise.
   */
  delete(val) {
    var node = this.search(val);
    if (node == null) {
      return false;
    }
    console.log("to be deleted from", node.value);
    var parent = node.parent;
    if (node.leftChild != null && node.rightChild != null) {
      var succ = node.successor();
      succ.delete(succ.value);
      node.value = succ.value;
    } else if (node.leftChild != null) {
      console.log("replace with", node.leftChild.value);
      console.log(this, "\n", node.parent, node.parent.rightChild.parent);
      node.replaceWith(node.leftChild);
    } else if (node.rightChild != null) {
      node.replaceWith(node.rightChild);
    } else {
      node.replaceWith(null);
    }
    if (parent != null) { parent.updateHeights(); }
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
    if (this.parent != null) {
      if (this == this.parent.leftChild) {
        this.parent.leftChild = newNode;
      } else {
        this.parent.rightChild = newNode;
      }
    }
    if (newNode != null) {
      newNode.parent = this.parent;
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

  /**
   * Carry out an operation on this tree.
   */
  doOp(op, val) {
    console.log(op, val);
    if (op == "delete") {
      this.delete(val);
    } else if (op == "insert") {
      this.insert(val);
    }
    this.rebalance();
  }
}

// Demonstrate basic functions
var rootNode = new AvlNode(10);
console.log(rootNode.toString());
rootNode.doOp('insert', 5);
console.log(rootNode.toString());
rootNode.doOp('insert', 3);
console.log(rootNode.toString());
rootNode.doOp('insert', 2);
console.log(rootNode.toString());
rootNode.doOp('insert', 6);
console.log(rootNode.toString());
rootNode.doOp('insert',  9);
console.log(rootNode.toString());
rootNode.doOp('insert', 15);
console.log(rootNode.toString());
rootNode.doOp('insert', 12);
console.log(rootNode.toString());
rootNode.doOp('delete', 2);
console.log(rootNode.toString());
rootNode.doOp('delete', 5);
console.log(rootNode.toString());
rootNode.doOp('insert', 13);
console.log(rootNode.toString());
rootNode.doOp('insert', 14);
console.log(rootNode.toString());
rootNode.doOp('delete', 10);
console.log(rootNode.toString());
rootNode.doOp('delete', 15);
console.log(rootNode.toString());

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
      for (i = h; i < j; i++) {
        // deque and item from Q_i, and enqueue the item into Q_i+1
        var item = this.deques[i].dequeue();
        this.deques[i + 1].enqueue(item);
        // delete the item from T_i and insert into T_i+1
        this.trees[i].delete(item);
        this.trees[i + 1].insert(item);
      }
    } else if (j < h) {
      for (i = h; i > j; i--) {
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
    if (this.trees) {
      this.trees[0].insert(value);
    } else {
      this.trees.push(AvlNode(value))
    }
    if (this.deques) {
      this.deques[0].enqueue(value);
    } else {
      this.deques.push(deque(value));
    }
    // TODO check if last tree is 'full': requires maintaining
    // a size attribute of trees. will be annoying to maintain
    // b/c of rebalances, inserts, deletes
    //
    // if last tree is full, create new empty T_k and Q_k. 
    // perform shift up to this new index.
    this.shift(0, this.deques.length -1);
  }

  /**
   * Delete value from the structure.
   */
  delete(value) {
    var foundIndex = null;
    for (int i = 0; i < this.trees.length; i++) {
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

var workingSet = new WorkingSetStructure();
console.log(workingSet.trees);
console.log(workingSet.deques);
