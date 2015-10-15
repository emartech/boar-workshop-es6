'use strict';

let fs = require('fs');

let listGoodAdminUsernames = function(customerId, options, callback) {
  fs.readFile(`${options.customerFolder}/customer_${customerId}.json`, function(err, contents) {

    if (err) {
      callback(err);
      return;
    }

    let adminsOfCustomer = JSON.parse(contents);

    fs.readFile(options.blacklistFile, function(err, contents) {

      if (err) {
        callback(err);
        return;
      }

      let blacklistedAdminIds = JSON.parse(contents);

      let goodAdminUsernames = adminsOfCustomer
        .filter(admin => blacklistedAdminIds.indexOf(admin.id) < 0)
        .map(admin => admin.username);

      callback(null, goodAdminUsernames);

    });

  });
};

module.exports = listGoodAdminUsernames;
