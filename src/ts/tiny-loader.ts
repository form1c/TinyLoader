/**
 * Represents the structure of a JSON object containing information about a JavaScript or CSS file to be loaded.
 * 
 * @property jspath - The path to the JavaScript file.
 * @property csspath - The path to the CSS file.
 */
interface FileJSON {
  jspath: string;
  csspath: string;
}

class TinyLoader {
  /**
   * Embeds a list of JavaScript and CSS files specified in a JSON string.
   * 
   * @param jsonInput - A JSON string or object containing an array of objects with `jspath` and `csspath` properties.
   * @returns A Promise that resolves to `true` if all files were embedded successfully, or `false` otherwise.
   */
  public static embedFileList(jsonInput: string): Promise<boolean> {
    let jsonObj: FileJSON[];
    if (typeof jsonInput === 'string') {
      jsonObj = JSON.parse(jsonInput);
    } else {
      jsonObj = jsonInput;
    }
    const promises = jsonObj.map((element) => TinyLoader.embedFileElement(element));
    return Promise.all(promises)
      .then((results) => results.every((res) => res === true))
      .catch(() => false);
  }

  /**
   * Embeds a JavaScript or CSS file element based on the provided file paths.
   * 
   * @param element - An object containing the file paths for JavaScript and CSS files.
   * @returns A Promise that resolves to `true` if the files were embedded successfully, or `false` otherwise.
   */
  private static embedFileElement(element: FileJSON): Promise<boolean> {
    const promises: Promise<boolean>[] = [];
    if (element.jspath) {
      promises.push(TinyLoader.embedFile(element.jspath));
    }
    if (element.csspath) {
      promises.push(TinyLoader.embedFile(element.csspath));
    }
    return Promise.all(promises)
      .then((results) => results.every((res) => res === true))
      .catch(() => false);
  }

  /**
   * Embeds a JavaScript or CSS file from the specified path.
   * 
   * @param path - The path to the file to be embedded.
   * @returns A Promise that resolves to `true` if the file was embedded successfully, or `false` otherwise.
   */
  public static embedFile(path: string): Promise<boolean> {
    const fileType = TinyLoader.getFileType(path);
    if (fileType === "js") {
      return TinyLoader.embedJsFile(path);
    } else if (fileType === "css") {
      return TinyLoader.embedCssFile(path);
    } else {
      return Promise.reject(false);
    }
  }

  /**
   * Embeds a JavaScript file from the specified path.
   * 
   * @param path - The path to the JavaScript file to be embedded.
   * @returns A Promise that resolves to `true` if the file was embedded successfully, or `false` otherwise.
   */
  private static embedJsFile(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement("script");
      scriptElement.onload = () => resolve(true);
      scriptElement.onerror = () => reject(false);
      scriptElement.src = path;
      document.head.appendChild(scriptElement); 
    });
  }

  /**
   * Embeds a CSS file from the specified path.
   * 
   * @param path - The path to the CSS file to be embedded.
   * @returns A Promise that resolves to `true` if the file was embedded successfully, or `false` otherwise.
   */
  private static embedCssFile(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const cssLinkElement = document.createElement("link");
      cssLinkElement.rel = "stylesheet";
      cssLinkElement.href = path;
      cssLinkElement.onload = () => resolve(true);
      cssLinkElement.onerror = () => reject(false);
      document.head.appendChild(cssLinkElement);
    });
  }

  /**
   * Loads a file from the specified path and returns its content as a string.
   * 
   * @param path - The path of the file to be loaded.
   * @returns A Promise that resolves to the content of the file as a string if the file was loaded successfully, or rejects with an error otherwise.
   */
  public static loadFile(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject(new Error('Failed to load file: ' + path));
          }
        }
      };
      xhr.open('GET', path, true);
      xhr.send();
    });
  }

  /**
   * Determines the file type (extension) of the file at the specified path.
   * 
   * @param path - The path to the file.
   * @returns The file type (e.g., "js", "css", "unknown") or "unknown" if the file type cannot be determined.
   */
  private static getFileType(path: string): string {
    const filename = path.split("/").pop();
    if (!filename) {
      return "unknown";
    }
    const lastDotIndex = filename.lastIndexOf(".");
    if (lastDotIndex === -1 || lastDotIndex === undefined) {
      return "unknown";
    }
    return filename.substring(lastDotIndex + 1);
  }
}

export { TinyLoader };