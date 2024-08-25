/**
 * Loads the demo1.js file and creates a new div element.
 * The new div element is then appended to the "loaded-files" div.
 */
function loadDemo1() {
  // Get the parent div element where the new div will be added
  const parentDiv = document.getElementById("loaded-files");

  // Create a new div element
  const childDiv = document.createElement('div');

  // Set the id of the new div element
  childDiv.id = "div1";

  // Set the content of the new div element
  childDiv.innerHTML = "This is a new div element created by the loadDemo1 function, because the demo1.js file was successfully loaded.";

  // Append the new div element to the parent div
  parentDiv.appendChild(childDiv);
}

// Call the loadDemo1 function to execute the code
loadDemo1();
