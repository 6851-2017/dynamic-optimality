function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    console.log("holding");
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

var insertComplete = true;
var deleteComplete = true;
var searchComplete = true;
var shiftComplete = true;

function justInsertDone() {
  return insertComplete;
}

function insertDone() {
  return insertComplete && shiftComplete;
}

function deleteDone() {
  return deleteComplete && shiftComplete;
}

function searchDone() {
  return searchComplete;
}

function shiftDone() {
  return shiftComplete;
}

function insertAndDeleteDone() {
  return insertComplete && deleteComplete && shiftComplete;
}

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
    insertComplete = false;
    var element = $(".tree-"+this.value);
    console.log(".tree-"+this.value+" : "+element);

    element.css("background-color", "#def4fe");

    var thisNode = this;
    setTimeout(function() {
      if (thisNode.value == val) {
        throw new Error("value " + val + " already exists in tree");
      } else if (thisNode.value < val) {
        if (thisNode.rightChild != null) {
          thisNode.rightChild.insertHelper(val);
        } else {
          var nullElt = $(".right-child.parent-"+thisNode.value);
          nullElt.css("background-color", "#7bd6ff");
          nullElt.delay(500)
                 .queue(function(n) {
                    nullElt.text(val);
                    setTimeout(function() {
                      insertComplete = true;
                    }, 700);
                    n();
                  });
          thisNode.rightChild = new AvlNode(val);
          thisNode.rightChild.parent = thisNode;
          thisNode.updateToRoot();
        }
      } else if (thisNode.value > val) {
        if (thisNode.leftChild != null) {
          thisNode.leftChild.insertHelper(val);
        } else {
          var nullElt = $(".left-child.parent-"+thisNode.value);
          nullElt.css("background-color", "#7bd6ff");
          nullElt.delay(500)
                 .queue(function(n) {
                    nullElt.text(val);
                    setTimeout(function() {
                      insertComplete = true;
                    }, 500);
                    n();
                  });
          thisNode.leftChild = new AvlNode(val);
          thisNode.leftChild.parent = thisNode;
          thisNode.updateToRoot();
        }
      }
    }, 500);
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
  searchAnimate(value) {
    searchComplete = false;
    // $("#status").text("searching for ["+value+"] in tree [");
    var element = $(".tree-"+this.value);
    console.log("THIS ELEMENT: "+this.value);
    element.css("background-color", "#fff47b");
    if (this.value == value) {
      element.css("background-color", "#fdc11f");
      $("#status").text("found ["+value+"]");
      setTimeout(function() {
        searchComplete = true;
      }, 800);
    } else {
      var thisNode = this;
      setTimeout(function() {
        if (value < thisNode.value && thisNode.leftChild) {
          thisNode.leftChild.searchAnimate(value);
        } else if (value > thisNode.value && thisNode.rightChild) {
          thisNode.rightChild.searchAnimate(value);
        } else {
          if (value < thisNode.value) {
            // highlight LEFTCHILD NULL
            var nullElt = $(".left-child.parent-"+thisNode.value);
            nullElt.css("background-color", "#ff6060");
          } else {
            // highlight RIGHTCHILD NULL
            var nullElt = $(".right-child.parent-"+thisNode.value);
            nullElt.css("background-color", "#ff6060");
          }
          setTimeout(function() {
            searchComplete = true;
          }, 800)
        }
      }, 500);
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

  searchAnimate(value) {
    if (!this.rootNode) {
      return false;
    } else {
      this.rootNode.searchAnimate(value);
      // return this.rootNode.search(value);
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
    shiftComplete = false;
    if (h < j) {
      for (var i = h; i < j; i++) {
        // deque and item from Q_i, and enqueue the item into Q_i+1
        var item = this.deques[i].popFromBack();
        this.deques[i + 1].pushToFront(new DequeNode(item.value));
        // delete the item from T_i and insert into T_i+1
        var nodeElt = $("."+item.value);
        nodeElt.css("background-color", "#defee2");
        nodeElt.removeClass("node");

        $(".null-elt").each(function() {
          $(this).css("background-color", "#e3e3e3");
        });

        $(".node").each(function() {
          $(this).css("background-color", "#fff");
        })

        $("#status").text("shifting ["+item.value+"] into tree "+(i+1));
        var thisSet = this;
        var iCopy = i;
        var jCopy = j;
        var itemVal = item.value;
        setTimeout(function() {
          thisSet.trees[iCopy].delete(itemVal);
          //console.log((iCopy+1)+" "+(jCopy+1));
          thisSet.trees[iCopy + 1].insert(itemVal);
          function checkInsertDone() {
            if(justInsertDone() == false) {
              console.log("no (line 880, ws)");
              window.setTimeout(checkInsertDone, 100); /* this checks the flag every 100 milliseconds*/
            } else {
              shiftComplete = true;
            }
          }
          checkInsertDone();
          // setTimeout(function() {
          //   shiftComplete = true;
          // }, 500);
        }, 500);
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
        var nodeElt = $("."+item.value);
        nodeElt.css("background-color", "#defee2");
        nodeElt.removeClass("node");

        $(".null-elt").each(function() {
          $(this).css("background-color", "#e3e3e3");
        });

        $(".node").each(function() {
          $(this).css("background-color", "#fff");
        })

        $("#status").text("shifting ["+item.value+"] into tree "+(i-1));
        var thisSet = this;
        var iCopy = i;
        var itemVal = item.value;
        setTimeout(function() {
          thisSet.trees[iCopy].delete(itemVal);
          thisSet.trees[iCopy - 1].insert(itemVal, i, h + 1);
          setTimeout(function() {
            shiftComplete = true;
          }, 500);
        }, 500);
      }
    } else {
      setTimeout(function() {
        shiftComplete = true;
      }, 10);
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
      // shiftComplete = true;
    }
    $("#operation").text("insert ["+value+"]");
    $("#status").text("inserting ["+value+"] into tree 0");
    this.trees[0].insert(value);
    this.deques[0].pushToFront(new DequeNode(value));
    var thisNode = this;

    function checkInsertFlag() {
      if(insertDone() == false) {
        window.setTimeout(checkInsertFlag, 100); /* this checks the flag every 100 milliseconds*/
      } else {
        thisNode.shift(0, k-1);
      }
    }
    checkInsertFlag();

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
        $("#operation").text("delete ["+value+"]");
        $("#status").text("deleting ["+value+"] from tree "+i);
        tree.delete(value);
        foundIndex = i;
        this.deques[i].findAndPop(value);
        break;
      }
    }
    if (foundIndex != null) {
      var thisStructure = this;
      function checkDeleteFlag() {
        if(deleteDone() == false) {
          window.setTimeout(checkDeleteFlag, 100); /* this checks the flag every 100 milliseconds*/
        } else {
          thisStructure.shift(thisStructure.deques.length - 1, foundIndex);
          if (thisStructure.trees[thisStructure.trees.length - 1].size() == 0) {
            // We emptied the last one, so remove it
            thisStructure.trees.pop();
            thisStructure.deques.pop();
          }
          return true;
        }
      }
      checkDeleteFlag();
    } else {
      return false;
    }
  }

  /**
   * Search for value in the structure and returns that value.
   * Returns null if the value isn't in the structure.
   */ 
  searchFind(value) {

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
    } else {
      return j;
    }

    // // Delete value from T_j
    // this.trees[j].delete(value);
    // this.deques[j].findAndPop(value);

    // // Insert value into T_1
    // this.trees[0].insert(value);
    // this.deques[0].pushToFront(new DequeNode(value));

    // // Shift 1 -> j
    // this.shift(0, j);

    // return node.value;

  }

  searchFinish(value, j) {
    var thisStructure = this;
    // Delete value from T_j
    if (j != 0) {
      this.trees[j].delete(value);
      function checkDeleteFlag() {
        if(deleteDone() == false) {
          window.setTimeout(checkDeleteFlag, 100); /* this checks the flag every 100 milliseconds*/
        } else {
          thisStructure.trees[0].insert(value);
        }
      }
      checkDeleteFlag();
    }

    this.deques[j].findAndPop(value);

    // Insert value into T_1
    this.deques[0].pushToFront(new DequeNode(value));

    // Shift 1 -> j
    function checkInsertComplete() {
      if(insertDone() == false) {
        window.setTimeout(checkInsertComplete, 100); /* this checks the flag every 100 milliseconds*/
      } else {
        // FIRST RE RENDER!!!!!!!!
        console.log("trying first rerender");
        console.log(thisStructure);
        var container = $(".container");
        var workingSetHtml = getWorkingSetHtml(thisStructure);
        console.log(workingSetHtml);
        container.html(workingSetHtml);
        console.log("re rendered");
        setTimeout(function(){
          // THEN:
          thisStructure.shift(0, j);
        }, 500);
      }
    }
    checkInsertComplete();
    // return value;
  }

  /**
   * Search for value in the structure and returns that value.
   * Returns null if the value isn't in the structure.
   */ 
  searchAnimate(value, j) {

    if (j == null) { // if j = 0, j will evaluate to false
      // value is not in the tree
      return null;
    } else {
      var thisStructure = this;
      for (var i = 0; i < j+1; i++) {
        $("#status").text("searching for ["+value+"] in tree ["+i+"]");
        var iCopy = i;
        function checkSearchFlag() {
          if(searchDone() == false) {
            window.setTimeout(checkSearchFlag, 100); /* this checks the flag every 100 milliseconds*/
          } else {
            $(".null-elt").each(function() {
              $(this).css("background-color", "#e3e3e3");
            });

            $(".node").each(function() {
              $(this).css("background-color", "#fff");
            })
            thisStructure.trees[iCopy].searchAnimate(value);
          }
        }
        checkSearchFlag();
      }
    }
  }

}

// function getWorkingSetHtml(ws) {
//   var mainDiv = document.createElement('div');

//   var dequesDiv = document.createElement('div');
//   dequesDiv.setAttribute('id', 'deques');
//   for (var i = 0; i < ws.deques.length ; i++) {
//     var dequeHtml = getDequeHtml(ws.deques[i]);
//     dequesDiv.append(dequeHtml);
//   }
//   mainDiv.append(dequesDiv);

//   var treesDiv = document.createElement('div');
//   treesDiv.setAttribute('id', 'trees');
//   for (var i = 0; i < ws.trees.length ; i++) {
//     var treeHtml = getTreeHtmlOverall(ws.trees[i].rootNode);
//     treeHtml.classList.add("tree"+i);
//     treesDiv.append(treeHtml);
//   }
//   mainDiv.append(treesDiv);

//   return mainDiv;
// }
