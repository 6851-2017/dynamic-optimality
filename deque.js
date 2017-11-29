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

  // TODO: Find
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
}

// Demonstration
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
