$(document).ready(function() {

  // Draw example AVL tree.
  var rootNodeDemo = new AvlNode(10);
  rootNodeDemo.insert([5, 3, 2, 6, 9, 15, 12]);
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
  var container = $('.container');
  container.append(dequeHtml);
  container.append(treeHtml);
<<<<<<< HEAD
});

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
    dequeNode.classList.add('dequeNode');
    dequeNode.appendChild(document.createTextNode(currentNode.value));
    mainDiv.appendChild(dequeNode);
    currentNode = currentNode.next;
  }

  return mainDiv;
}
=======

  // Initialize working set structure.
  var workingSet = new WorkingSetStructure();
  var userInput = null;

  // Read value from user input field.
  $("#user-input").change( function(){
    userInput = $('#user-input').val();
  });

  // Insert operation.
  $('#insert').click(function() {
    // TODO: write getWorkingSetHtmlOverall once deques are available; then remove return
    if (userInput) {
      var helpText = "Do you want to insert " + userInput + "?";
      var ans = confirm(helpText);
      if (ans) {
        console.log("Inserting", userInput)
        workingSet.insert(userInput);
        return;
        var workingSetHtml = getWorkingSetHtmlOverall(workingSet);
        // replace container class with new HTML
        container.html(workingSetHtml);
      }
    }
  });

  // Delete operation.
  $('#delete').click(function() {
    // TODO: write getWorkingSetHtmlOverall once deques are available; then remove return
    if (userInput) {
      var helpText = "Do you want to delete " + userInput + "?";
      var ans = confirm(helpText);
      if (ans) {
        console.log("Deleting", userInput)
        var del = workingSet.delete(userInput);
        return;
        if (del) {
          var workingSetHtml = getWorkingSetHtmlOverall(workingSet);
          // replace container class with new HTML
          container.html(workingSetHtml);
        } else if (!del) {
          var helpText = "Could not delete " + userInput + " because it is not in the working set structure.";
          alert(helpText);
        }
      }
    }
  });

  // Search operation.
  $('#search').click(function() {
    if (userInput) {
      var item = workingSet.search(userInput);
      if (item == null) {
        var helpText = userInput + " is not in the working set structure.";
      } else {
        var helpText = userInput + " is in the working set structure.";
      }
      alert(helpText);
    }
  });
});


>>>>>>> 1ea2ab0cee035c51bd05d885eadecab793e7aa0a

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
  treeRoot.appendChild(rootValueDiv);

  // Add children
  var children = document.createElement('ul');
  children.appendChild(getChildHtml(rootNode.leftChild));
  children.appendChild(getChildHtml(rootNode.rightChild));
  treeRoot.appendChild(children);

  return treeRoot;
}

function getChildHtml(child) {
  if (child) {
    return getTreeHtml(child);
  } else {
    var childNull = document.createElement('li');
    var childNullDiv = document.createElement('div');
    childNullDiv.classList.add('null-elt');
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
