'use strict';

let AdminList = require('./admin-list');
let FileService = require('./file-service');
let co = require('co');

let listGoodAdminUsernames = function(customerId, options, callback) {
  let customerFile = new FileService(`${options.customerFolder}/customer_${customerId}.json`);
  let blacklistFile = new FileService(options.blacklistFile);

  co(function* () {
    yield customerFile.read();
    let adminsOfCustomer = new AdminList(customerFile.contents);
    yield blacklistFile.read();
    let blacklistedAdminIds = JSON.parse(blacklistFile.contents);
    return adminsOfCustomer.blacklist(blacklistedAdminIds).usernames;
  }).then(result => callback(null, result)).catch(err => callback(err));
};

module.exports = listGoodAdminUsernames;
