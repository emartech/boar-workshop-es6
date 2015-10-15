'use strict';

let fs = require('fs');

class FileService {

  constructor(filePath) {
    this._path = filePath;
    this.contents = null;
  }


  read(callback) {
    fs.readFile(this._path, (err, contents) => {
      this.contents = contents;
      callback(err);
    });
  }


  get contents() {
    return this._contents;
  }


  set contents(value) {
    this._contents = value;
  }


}

module.exports = FileService;
