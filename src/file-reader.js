'use strict';

let fs = require('fs');

class FileReader {

  constructor(filePath) {

    this._path = filePath;
    this._contents = null;
  }

  read() {
    return new Promise((resolve, reject) => {
      fs.readFile(this._path, (err, contents) => {
        if (err) {
          reject(err);
          return;
        }

        this.contents = contents;
        resolve();
      });
    });
  }


  get contents() {
    return this._contents;
  }


  set contents(value) {
    this._contents = value;
  }

}

module.exports = FileReader;