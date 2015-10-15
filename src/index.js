'use strict';

let fs = require('fs');
let AdminList = require('./admin-list');

let listGoodAdminUsernames = function(customerId, options, callback) {
  fs.readFile(`${options.customerFolder}/customer_${customerId}.json`, function(err, contents) {

    if (err) {
      callback(err);
      return;
    }

    let adminsOfCustomer = new AdminList(contents);

    fs.readFile(options.blacklistFile, function(err, contents) {

      if (err) {
        callback(err);
        return;
      }

      let blacklistedAdminIds = JSON.parse(contents);
      let goodAdminUsernames = adminsOfCustomer.blacklist(blacklistedAdminIds).usernames;

      callback(null, goodAdminUsernames);

    });

  });
};

module.exports = listGoodAdminUsernames;
