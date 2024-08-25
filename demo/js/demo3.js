/**
 * Loads the demo3.js file and creates a new div element.
 * The new div element is then appended to the "loaded-files" div.
 */
function loadDemo3() {
  // Get the parent div element where the new div will be added
  const parentDiv = document.getElementById("loaded-files");

  // Get the number of child div elements in the parent div
  const childDivCount = parentDiv.getElementsByTagName('div').length;

  // Create a new div element
  const newDiv = document.createElement('div');

  // Set the id of the new div element to the count of child divs plus 1
  newDiv.id = `div${childDivCount + 1}`;

  // Set the content of the new div element
  newDiv.textContent = "This is a new div element created by the loadDemo3 function, because the demo3.js file was successfully loaded.";

  // Append the new div element to the parent div
  parentDiv.appendChild(newDiv);
}

// Call the loadDemo3 function to execute the code
loadDemo3();
