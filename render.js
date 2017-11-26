// Draw an example AVL trees
$(document).ready(function() {
  console.log("hello");
  var rootNodeDemo = new AvlNode(10);
  rootNodeDemo.insert([5, 3, 2, 6, 9, 15, 12]);
  console.log(rootNodeDemo.toString());
  
  var treeHtml = getTreeHtmlOverall(rootNodeDemo);
  var container = $('.container');
  container.append(treeHtml);

});

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