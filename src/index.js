'use strict';

let AdminList = require('./admin-list');
let FileService = require('./file-service');

let listGoodAdminUsernames = function(customerId, options, callback) {
  let customerFile = new FileService(`${options.customerFolder}/customer_${customerId}.json`);
  let blacklistFile = new FileService(options.blacklistFile);

  customerFile.read(function(err) {

    if (err) {
      callback(err);
      return;
    }

    let adminsOfCustomer = new AdminList(customerFile.contents);

    blacklistFile.read(function(err) {

      if (err) {
        callback(err);
        return;
      }

      let blacklistedAdminIds = JSON.parse(blacklistFile.contents);
      let goodAdminUsernames = adminsOfCustomer.blacklist(blacklistedAdminIds).usernames;

      callback(null, goodAdminUsernames);

    });

  });
};

module.exports = listGoodAdminUsernames;
