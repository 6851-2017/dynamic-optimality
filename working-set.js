/*
 * A node in a deque.
 */
class DequeNode {
  constructor(value, prev, next) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

/**
 * An implementation of deque.
 */ 
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
}


// Demonstration
/*
console.log("deque testing");
var dequeExample = new Deque();

// Test pushes
//dequeExample.pushToBack(new DequeNode(5));
//dequeExample.pushToFront(new DequeNode(3));
//dequeExample.pushToFront(new DequeNode(2));
//dequeExample.pushToBack(new DequeNode(15));
//dequeExample.showDeque();

// Test pops
//dequeExample.popFromBack();
//dequeExample.popFromFront();
//dequeExample.popFromFront();
//dequeExample.showDeque();

// Test find
//dequeExample.findAndPop(2);
//dequeExample.findAndPop(5);
//dequeExample.findAndPop(15);
//dequeExample.findAndPop(4);
//dequeExample.findAndPop(3);
//dequeExample.showDeque();


console.log("end of deque testing");
*/

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
      var value = "_".repeat(max_chars)+" ".repeat((Math.pow(2, this.height-level+1)-1)*max_chars);
      if (node != null && node.value != null) {
        // TODO: Don't think this can handle 3-digit numbers like 100
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
      //this.rebalance();
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
      for (var i = 0; i < value.length; i ++) {
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

// Demonstrate basic functions
/*
var n = new AvlNode(9);
n.insert([4, 15, 3, 6, 12, 2]);
console.log(n.toString());
n.delete(6);
console.log(n.toString());
n.insert(11);
console.log(n.toString());

n.insert(1);
console.log(n.toString());
n.delete(11);
console.log(n.toString());
n.delete(15);
console.log(n.toString());
*/

/*
var n = new AvlNode(10);
//n.insert(10);
n.insert([5,1,7,15,12,18]);
console.log(n.toString());
nn = n.delete(10);
console.log(nn.toString());
*/

/*
var tree = new AvlTree();
var toInsert = [5, 4, 3, 2, 1, 6, 9, 15, 12, 13, 14, 20, 25, 30, 28, 31, 29]; 
tree.insert(toInsert);
console.log("did the insert");
console.log(tree.rootNode.size);
console.log(tree.rootNode.toString());
console.log("done");
// TODO: Doesn't look balanced here
*/

/*
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
*/
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
    values.forEach(function(value) {
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
    if (k == 0 || this.trees[k-1].size() >= Math.pow(2, Math.pow(2, k))) {
      // Need to add a new tree to the end to fit this element
      this.trees.push(new AvlTree());
      this.deques.push(new Deque());
      k += 1;
    }

    this.trees[0].insert(value);
    this.deques[0].pushToFront(new DequeNode(value));
    
    this.shift(0, k-1);
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

/** Test for found bug 
console.log("BUG TEST");
var workingSet = new WorkingSetStructure();
workingSet.insert(1);
workingSet.insert(2);
workingSet.search(1);
workingSet.insert(3);
workingSet.search(2);
console.log(workingSet.trees);
console.log(workingSet.trees[0].rootNode.toString());
console.log(workingSet.deques);
console.log(workingSet.deques[0].toString());
*/


/*
var testTree = new AvlTree();
testTree.insert(5);
testTree.insert(10);
console.log(testTree.delete(5));
console.log(testTree.rootNode.toString());
console.log(testTree.rootNode);
*/

/*
var testNode = new AvlNode(5);
testNode.insert(10);
testNode.delete(5);
console.log(testNode.toString());




/* Test double inserts 
console.log("WORKING SET");
var workingSet = new WorkingSetStructure();

workingSet.insertAll([3, 4, 5, 6, 7]);
//workingSet.insert(3);
//workingSet.insert(6);
workingSet.insert(8);
//workingSet.insert(4);
workingSet.search(4);
console.log(workingSet.trees);
console.log(workingSet.trees[0].rootNode.toString());
console.log(workingSet.trees[1].rootNode.toString());
console.log(workingSet.deques);
console.log(workingSet.deques[0].toString());
console.log(workingSet.deques[1].toString());
console.log(workingSet.deques[1])



/* Test for search that was failing for Smriti 
   Currently passes for Caitlin 

workingSet.insertAll([2, 4, 1, 5, 10, 12]);
/*
workingSet.insert(2);
workingSet.insert(4);
workingSet.insert(1);
workingSet.insert(5);
workingSet.insert(10);
workingSet.insert(12);


workingSet.search(2);
console.log(workingSet.trees);
console.log(workingSet.trees[0].rootNode.toString());
console.log(workingSet.trees[1].rootNode.toString());
console.log(workingSet.deques);
console.log(workingSet.deques[0].toString());
console.log(workingSet.deques[1].toString());

/* Tests for search 
workingSet.insert(5);
workingSet.insert(6);
workingSet.search(5);
workingSet.search(5);
workingSet.search(5);
workingSet.search(6);
console.log(workingSet.trees);
console.log(workingSet.trees[0].rootNode.toString());
//console.log(workingSet.trees[1].rootNode.toString());
console.log(workingSet.deques);
console.log(workingSet.deques[0].toString());
//console.log(workingSet.deques[1].toString());

workingSet.insert(1);
workingSet.insert(2);
workingSet.insert(3);

console.log(workingSet.trees);
console.log(workingSet.trees[0].rootNode.toString());
console.log(workingSet.trees[1].rootNode.toString());
console.log(workingSet.deques);
console.log(workingSet.deques[0].toString());
console.log(workingSet.deques[1].toString());

workingSet.search(6);
workingSet.search(5);

console.log(workingSet.trees);
console.log(workingSet.trees[0].rootNode.toString());
console.log(workingSet.trees[1].rootNode.toString());
console.log(workingSet.deques);
console.log(workingSet.deques[0].toString());
console.log(workingSet.deques[1].toString());

workingSet.delete(2);

workingSet.search(1);

console.log(workingSet.trees);
console.log(workingSet.trees[0].rootNode.toString());
//console.log(workingSet.trees[1].rootNode.toString());
console.log(workingSet.deques);
console.log(workingSet.deques[0].toString());
//console.log(workingSet.deques[1].toString());
*/


/* Tests for insert + delete 
workingSet.insert(5);
workingSet.insert(10);
workingSet.insert(15);
workingSet.insert(0);
workingSet.insert(20);
workingSet.insert(19);
workingSet.insert(21);
workingSet.insert(4);
workingSet.insert(6);
workingSet.insert(2);
workingSet.insert(3);
workingSet.insert(1);


workingSet.delete(15);
workingSet.delete(2);
workingSet.delete(1);
workingSet.delete(19);
workingSet.delete(20);
workingSet.delete(0);
workingSet.delete(5);
workingSet.delete(4);

console.log("after 4");
console.log(workingSet.trees);
console.log(workingSet.trees[0].rootNode.toString());
//console.log(workingSet.trees[1].rootNode.toString());
console.log(workingSet.deques);
console.log(workingSet.deques[0].toString());
//console.log(workingSet.deques[1].toString());

// still left: 10, 21, 6, 3

workingSet.delete(21);

workingSet.insert(90);

workingSet.insert(80);

workingSet.delete(80);
// Should be 90, 3, 6, 10

console.log(workingSet.trees);
console.log(workingSet.trees[0].rootNode.toString());
//console.log(workingSet.trees[1].rootNode.toString());
console.log(workingSet.deques);
console.log(workingSet.deques[0].toString());
//console.log(workingSet.deques[1].toString());

workingSet.delete(10);
workingSet.delete(6);
workingSet.delete(3);
workingSet.delete(90);

console.log(workingSet.trees);
//console.log(workingSet.trees[0].rootNode.toString());
//console.log(workingSet.trees[1].rootNode.toString());
console.log(workingSet.deques);
//console.log(workingSet.deques[0].toString());
//console.log(workingSet.deques[1].toString());

workingSet.insert(4);

console.log(workingSet.trees);
console.log(workingSet.trees[0].rootNode.toString());
//console.log(workingSet.trees[1].rootNode.toString());
console.log(workingSet.deques);
console.log(workingSet.deques[0].toString());
//console.log(workingSet.deques[1].toString());

workingSet.insert(5);
workingSet.insert(6);

console.log(workingSet.trees);
console.log(workingSet.trees[0].rootNode.toString());
//console.log(workingSet.trees[1].rootNode.toString());
console.log(workingSet.deques);
console.log(workingSet.deques[0].toString());
//console.log(workingSet.deques[1].toString());
*/

