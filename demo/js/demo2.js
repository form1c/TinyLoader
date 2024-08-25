/**
 * Loads the demo2.js file and the demo2.css file, and creates a new div element.
 * The new div element is then appended to the "loaded-files" div.
 */
function loadDemo2() {
  // Get the parent div element where the new div will be added
  const parentDiv = document.getElementById("loaded-files");

  // Create a new div element
  const childDiv = document.createElement('div');

  // Set the id of the new div element
  childDiv.id = "div2";

  // Set the content of the new div element
  childDiv.innerHTML = "This is a new div element created by the loadDemo2 function, because the demo2.js and demo2.css files were successfully loaded. The text in this div is colored green because the demo2.css file was loaded.";

  // Append the new div element to the parent div
  parentDiv.appendChild(childDiv);
}

// Call the loadDemo2 function to execute the code
loadDemo2();
