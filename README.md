# TinyLoader
## Overview
TinyLoader is a TypeScript library that simplifies the dynamic embedding of JavaScript and CSS files into HTML documents. With its simple and intuitive API, developers can effortlessly embed single or multiple files into the `<head>` section of the HTML document.

The embedded files are included in the `<head>` section of the HTML document, like this:
```html
<head>
  ...
  <script src="/js/demo1.js"></script>
  <script src="/js/demo2.js"></script>
  <link rel="stylesheet" href="/css/demo2.css">
  <link rel="stylesheet" href="/css/demo3.css">
  <script src="/js/demo3.js"></script>
  ...
</head>
```

## Usage
### Embedding a single file
To embed a single file, use the `TinyLoader.embedFile()` method:
```javascript
TinyLoader.embedFile("/js/demo3.js")
  .then((result) => {
    // Code to execute on successful embedding
  })
  .catch((error) => {
    // Code to handle errors
  });
```

### Embedding multiple files
To embed multiple files, use the `TinyLoader.embedFileList()` method and pass a JSON string containing an array of file objects:
```javascript
const jsonString = `[
  {
    "jspath": "/js/demo1.js"
  },
  {
    "jspath": "/js/demo2.js",
    "csspath": "/css/demo2.css"
  },
  {
    "csspath": "/css/demo3.css"
  }
]`;

TinyLoader.embedFileList(jsonString)
  .then((results) => {
    // Code to execute on successful embedding
  })
  .catch((error) => {
    // Code to handle errors
  });
```

Each file object in the JSON array should have a `"jspath"` property specifying the path to the JavaScript file, and/or a `"csspath"` property specifying the path to the corresponding CSS file.

### Loading a file's content
To load the content of a file as a string, use the `TinyLoader.loadFile()` method:
```javascript
TinyLoader.loadFile("/path/to/file.txt")
  .then((fileContent) => {
    // Code to handle the loaded file content
  })
  .catch((error) => {
    // Code to handle errors
  });
```

## API
### `TinyLoader.embedFileList(jsonInput: string): Promise<boolean>`
Embeds a list of JavaScript and CSS files specified in a JSON string.

- `jsonInput`: A JSON string or object containing an array of objects with `jspath` and `csspath` properties.
- Returns a Promise that resolves to `true` if all files were embedded successfully, or `false` otherwise.

### `TinyLoader.embedFile(path: string): Promise<boolean>`
Embeds a JavaScript or CSS file from the specified path.

- `path`: The path to the file to be embedded.
- Returns a Promise that resolves to `true` if the file was embedded successfully, or `false` otherwise.

### `TinyLoader.loadFile(path: string): Promise<string>`
Loads a file from the specified path and returns its content as a string.

- `path`: The path of the file to be loaded.
- Returns a Promise that resolves to the content of the file as a string if the file was loaded successfully, or rejects with an error otherwise.

## License
This project is licensed under the [MIT License](LICENSE).