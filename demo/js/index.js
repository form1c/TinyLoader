let jsonString = `[
  {
    "jspath": "/js/demo1.js"
  },
  {
    "jspath": "/js/demo2.js",
    "csspath" : "/css/demo2.css"
  }
]`;

// Load and embed a list of files
TinyLoader.embedFileList(jsonString)
  // Function to handle the successful loading of files
  .then((results) => {
    console.log("All files loaded successfully!");
    document.getElementById("result").innerHTML =
      "Files demo1.js, demo2.js and demo2.css have been loaded successfully.";
  })
  // Function to handle errors when loading files
  .catch((error) => {
    console.log("An error occurred when loading the files.");
    document.getElementById("result").innerHTML =
      "An error occurred when loading the files.";
  });

function embedFile() {
  // Load and embed a single file
  TinyLoader.embedFile("/js/demo3.js")
  .then((results) => {
    document.getElementById("result").innerHTML =
    "File demo3.js has been loaded successfully.";
    console.log("File loaded successfully!");
  })
  .catch((error) => {
    console.log("An error occurred when loading the file.");
    document.getElementById("result").innerHTML =
    "An error occurred when loading the file.";
  });
}  
