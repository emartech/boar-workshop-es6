'use strict';

let AdminList = require('./admin-list');
let FileService = require('./file-service');
let co = require('co');

let listGoodAdminUsernames = function(customerId, options) {
  let customerFile = new FileService(`${options.customerFolder}/customer_${customerId}.json`);
  let blacklistFile = new FileService(options.blacklistFile);

  return co(function* () {
    yield customerFile.read();
    let adminsOfCustomer = new AdminList(customerFile.contents);
    yield blacklistFile.read();
    let blacklistedAdminIds = JSON.parse(blacklistFile.contents);
    return adminsOfCustomer.blacklist(blacklistedAdminIds).usernames;
  });
};

module.exports = listGoodAdminUsernames;
