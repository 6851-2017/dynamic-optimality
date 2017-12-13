/**
 * Inserts the given element as the index-th child
 * of the object selected.
 *
 * Example usage: $("#controller").insertAt(1, "<div>insert at second position</div>");
 * Source: https://stackoverflow.com/questions/3562493/jquery-insert-div-as-certain-index
 */
jQuery.fn.insertAt = function(index, element) {
  var lastIndex = this.children().length;
  if (index < 0) {
    index = Math.max(0, lastIndex + 1 + index);
  }
  this.append(element);
  if (index < lastIndex) {
    this.children().eq(index).before(this.children().last());
  }
  return this;
}

$(document).ready(function() {
  // Draw example AVL tree.
  /*
  var rootNodeDemo = new AvlNode(10);
  rootNodeDemo.insert([5, 3, 2, 6, 9, 15, 12, 32, 77, 51, 20,27,1,17]);
  console.log(rootNodeDemo.toString());
  var dequeDemo = new Deque();
  dequeDemo.pushToFront(new DequeNode(1));
  dequeDemo.pushToFront(new DequeNode(2));
  dequeDemo.pushToFront(new DequeNode(3));
  dequeDemo.pushToBack(new DequeNode(0));
  dequeDemo.pushToFront(new DequeNode(4));
  dequeDemo.showDeque();
  var treeHtml = getTreeHtmlOverall(rootNodeDemo);
  var dequeHtml = getDequeHtml(dequeDemo);
  */
  var container = $('.container');
  /*
  container.append(dequeHtml);
  container.append(treeHtml);
  */

  // Initialize working set structure.
  var workingSet = new WorkingSetStructure();
  var userInput = null;

  // Read value from user input field.
  $("#user-input").change( function(){
    userInput = Number($('#user-input').val());
  });

  // Insert operation.
  $('#insert').click(function() {
    if (userInput) {
      console.log("Inserting", userInput)
      workingSet.insert(userInput);
      var workingSetHtml;
      //wait till animation done!!!!!
      function checkInsertFlag() {
        if(insertDone() == false) {
          console.log("no");
          window.setTimeout(checkInsertFlag, 100); /* this checks the flag every 100 milliseconds*/
        } else {
          console.log("new workingset: ");
          console.log(workingSet);
          $("#operation").text("none");
          $("#status").text("idle");
          workingSetHtml = getWorkingSetHtml(workingSet)
          container.html(workingSetHtml);
        }
      }
      checkInsertFlag();
    }
  });

  // Delete operation.
  $('#delete').click(function() {
    if (userInput) {
      console.log("Deleting", userInput)
      var del = workingSet.delete(userInput);
      if (del) {
        //var workingSetHtml = getWorkingSetHtml(workingSet);
        function checkDeleteFlag() {
          if(deleteDone() == false) {
            console.log("no (delete)");
            window.setTimeout(checkDeleteFlag, 100); /* this checks the flag every 100 milliseconds*/
          } else {
            $("#operation").text("none");
            $("#status").text("idle");
            workingSetHtml = getWorkingSetHtml(workingSet)
            container.html(workingSetHtml);
          }
        }
        checkDeleteFlag();
        // Reset HTML
        //container.html(workingSetHtml);
      } else if (!del) {
        var helpText = "Could not delete " + userInput + " because it is not in the working set structure.";
        alert(helpText);
      }
    }
  });

  // Search operation.
  $('#search').click(function() {
    if (userInput) {
      var indexOfElt = workingSet.searchFind(userInput);
      if (indexOfElt == null) {
        alert(userInput + " is not in the structure.");
      } else {
        // Move element to beginning of deque
        var dequeElement = $('#deque-' + userInput);
// <<<<<<< HEAD
        var newParent = $($('#deques').children()[0]);
        // The 'HEAD' block is the fist child, so insert at 1
// =======
        // var newParent = $($('#deques').children()[0]);
        // animateDequeSearch(dequeElement, newParent);
// >>>>>>> 22184f80e7add8e680f5eb3177b5a9556f2d0100

        $("#operation").text("search ["+userInput+"]");
        workingSet.searchAnimate(userInput, indexOfElt);
        function checkSearchFlag() {
          if(searchDone() == false) {
            console.log("no (search)");
            window.setTimeout(checkSearchFlag, 100); /* this checks the flag every 100 milliseconds*/
          } else {
            // moveAnimate(dequeElement, newParent, 1);
            animateDequeSearch(dequeElement, newParent);
            workingSet.searchFinish(userInput, indexOfElt);
            function checkSearchFinished() {
              if (insertAndDeleteDone() == false) {
                console.log("searchFinish NOT DONE!!!");
                window.setTimeout(checkSearchFinished, 100);
              } else {
                function checkShiftFinished() {
                  if (shiftDone() == false) {
                    console.log('SHIFT NOT DONE!!!!!!!!!');
                    window.setTimeout(checkShiftFinished, 100)
                  } else {
                    $("#operation").text("none");
                    $("#status").text("idle");
                    console.log("FINAL RE RENDER");
                    workingSetHtml = getWorkingSetHtml(workingSet)
                    container.html(workingSetHtml);
                  }
                }
                setTimeout(function () {
                  checkShiftFinished();
                }, 510);
              }
            }
            checkSearchFinished();
          }
        }
        checkSearchFlag();
        // var workingSetHtml = getWorkingSetHtml(workingSet);
        // Reset HTML
        // container.html(workingSetHtml);
      }
    }
  });

});

$(document).on("mouseenter", ".node", function() {
  var val = $(this).text();
  $('.'+val).css("background-color", "#c8e4f8");
});

$(document).on("mouseleave", ".node", function() {
  var val = $(this).text();
  $('.'+val).css("background-color", "#fff");
});


/**
 * Moves element to front of deque and shifts all
 * the values that were previously in front of dequeNode
 * over by one.
 */
function animateDequeSearch(element, deque) {
  var elementMarginTop = parseInt(element.css('marginTop'));
  var elementMarginLeft = parseInt(element.css('marginLeft'));

  var newOffset = $(deque.children()[1]).offset();

  // Amount for a deque element to move right
  var moveRightAmount =
    $(deque.children()[2]).offset().left -
    $(deque.children()[1]).offset().left;

  // TODO: Won't work w/ < 2 elements in deque

  var indexOfElement = element.index();


  // Hide all the elements that will move right by one
  // TODO: Can still see the old elements for a bit
  // before they disappear
  for (var i = 1; i < indexOfElement; i++) {
    var elementToAnimate = $(deque.children()[i]);
    elementToAnimate.css('visibility', 'hidden');
  }

  // Animate those elements moving to the right
  for (var i = 1; i < indexOfElement; i++) {
    var elementToAnimate = $(deque.children()[i]);

    var temp = elementToAnimate.clone().appendTo('body');
    temp.css({
      'position': 'absolute',
      // Account for margins
      'left': elementToAnimate.offset().left - elementMarginLeft,
      'top': elementToAnimate.offset().top - elementMarginTop,
      'z-index': 1000+i,
      'visibility': 'visible',
    });


    temp.animate(
      {'left': elementToAnimate.offset().left + moveRightAmount - elementMarginLeft},
      'slow',
      'linear',
      // Create a separate closure so we can keep what
      // elementToAnimate is each time
      (function(temp, elementToAnimate) {
        return function() {
          setTimeout(function() {
            temp.remove();
            elementToAnimate.css('visibility', 'visible');
          },
          500)
          
        }
      })(temp, elementToAnimate));
  }

  // Animate the actual element moving to the front
  
  element.css('visibility', 'hidden');
  var tempElement = element.clone().appendTo('body');

  tempElement.css({
    'position': 'absolute',
    'left': element.offset().left - elementMarginLeft,
    'top': element.offset().top - elementMarginTop,
    'z-index': 2000,
    'background': 'green',
    'visibility': 'visible'
  });

  tempElement.animate({'left': newOffset.left - elementMarginLeft}, 'slow', 'linear',function() {
    setTimeout(function() {
      tempElement.remove();
      deque.insertAt(1, element);
      element.css('visibility', 'visible');
    }, 500);
  });
}

/**
 * Moves the given element from its current position to be
 * a child of the newParent. It will become the index-th child
 * of the parent.
 * Source: https://stackoverflow.com/questions/907279/jquery-animate-moving-dom-element-to-new-parent
 */
function moveAnimate(element, newParent, index) {
    //Allow passing in either a jQuery object or selector
    element = $(element);
    newParent= $(newParent);

    var elementMarginTop = parseInt(element.css('marginTop'));
    var elementMarginLeft = parseInt(element.css('marginLeft'));

    var oldOffset = element.offset();
    newParent.insertAt(index, element);
    //element.appendTo(newParent);
    var newOffset = element.offset();

    // Account for margins
    oldOffset.top -= elementMarginTop;
    oldOffset.left -= elementMarginLeft;
    newOffset.top -= elementMarginTop;
    newOffset.left -= elementMarginLeft;

    var temp = element.clone().appendTo('body');
    temp.css({
        'position': 'absolute',
        'left': oldOffset.left,
        'top': oldOffset.top,
        'z-index': 1000,
    });

/*
    var temp2 = temp.clone().appendTo('body');
    temp2.css('color', 'red');
    var temp3 = element.clone().appendTo('body');
    temp3.css({
        'position': 'absolute',
        'left': newOffset.left,
        'top': newOffset.top,
        'z-index': -10,
        'color': 'green'
    });
    */

    element.hide();
    temp.animate({'top': newOffset.top, 'left': newOffset.left}, 'slow', 'linear', function(){
       // Unsure why we need the timeout of 500ms
       // but it makes it look a lot better
       setTimeout(function() {
        element.show();
        temp.remove();
       },
       500);

    });

    // TODO: Animate the other elements in deque shifting over?
    // TODO: Searching for something in the middle
    // makes everything move down

    console.log("newoffset:");
    console.log(newOffset);

    console.log("oldoffset:");
    console.log(oldOffset);
}


/** Get HTML for a deque */
function getDequeHtml(deque) {
  var mainDiv = document.createElement('div');
  mainDiv.classList.add('deque');
  var headNode = document.createElement('div');
  headNode.classList.add('headNode');
  headNode.appendChild(document.createTextNode("HEAD"));
  mainDiv.appendChild(headNode); 
  var currentNode = deque.first;
  while (currentNode) {
    var dequeNode = document.createElement('div');
    dequeNode.classList.add('dequeNode', currentNode.value, 'node');
    dequeNode.setAttribute('id', 'deque-' + currentNode.value);
    dequeNode.appendChild(document.createTextNode(currentNode.value));

    mainDiv.appendChild(dequeNode);
    currentNode = currentNode.next;
  }

  return mainDiv;
}


/** Get HTML for an entire tree */
function getTreeHtmlOverall(rootNode) {
  var mainDiv = document.createElement('div');
  mainDiv.classList.add('tree');

  var initialList = document.createElement('ul');
  var inner = getTreeHtml(rootNode);
  initialList.appendChild(inner);
  mainDiv.appendChild(initialList);

  return mainDiv;
}

/** Get inner HTML for an entire tree 
  (use for recursion, but the final tree
  needs extra HTML elements around it */
function getTreeHtml(rootNode) {    
  var treeRoot = document.createElement('li');
  var rootValueDiv = document.createElement('div');
  rootValueDiv.appendChild(document.createTextNode(rootNode.value));
  rootValueDiv.classList.add(rootNode.value, 'node', 'tree-'+rootNode.value);
  treeRoot.appendChild(rootValueDiv);

  // Add children
  var children = document.createElement('ul');
  children.appendChild(getChildHtml(rootNode.leftChild, rootNode, true));
  children.appendChild(getChildHtml(rootNode.rightChild, rootNode, false));
  treeRoot.appendChild(children);

  return treeRoot;
}

function getChildHtml(child, parent, left) {
  if (child) {
    return getTreeHtml(child);
  } else {
    parentVal = parent.value;
    whichChild = left == true ? "left-child" : "right-child";
    var childNull = document.createElement('li');
    var childNullDiv = document.createElement('div');
    childNullDiv.classList.add('null-elt', whichChild, 'parent-'+parentVal);
    childNullDiv.appendChild(document.createTextNode('null'));
    childNull.appendChild(childNullDiv);
    return childNull;
  }
}

/* Example tree HTML:

<div class="tree"> 
  <ul>
    <li>
      <div> Main </div>
      <ul>
          <li><div>Sub-1</div></li>
          <li><div>Sub-2</div>
            <ul>
              <li><div>Sub-2-1</div></li>
              <li><div>Sub-2-2</div></li>
            </ul>  
          </li>
      </ul>                      
    </li>
  </ul>             
</div>
*/

/** Get HTML for working set structure. */
function getWorkingSetHtml(ws) {
  var mainDiv = document.createElement('div');

  var dequesDiv = document.createElement('div');
  dequesDiv.setAttribute('id', 'deques');
  for (var i = 0; i < ws.deques.length ; i++) {
    var dequeHtml = getDequeHtml(ws.deques[i]);
    dequesDiv.append(dequeHtml);
  }
  mainDiv.append(dequesDiv);

  var treesDiv = document.createElement('div');
  treesDiv.setAttribute('id', 'trees');
  for (var i = 0; i < ws.trees.length ; i++) {
    var treeHtml = getTreeHtmlOverall(ws.trees[i].rootNode);
    treeHtml.classList.add("tree"+i);
    treesDiv.append(treeHtml);
  }
  mainDiv.append(treesDiv);

  return mainDiv;
}
