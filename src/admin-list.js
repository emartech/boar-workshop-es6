'use strict';

class AdminList {

  constructor(data) {
    this._data = JSON.parse(data);
  }


  blacklist(ids) {
    this._data = this._data.filter(admin => ids.indexOf(admin.id) < 0);
    return this;
  }


  get usernames() {
    return this._data.map(admin => admin.username);
  }

}

module.exports = AdminList;
