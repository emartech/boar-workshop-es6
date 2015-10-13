'use strict';

let AdminList = require('./admin-list');
let FileReader = require('./file-reader');
let co = require('co');

let listGoodAdminUsernames = function(customerId, options) {
  return co(function*() {
    let customerReader = new FileReader(`${options.customerFolder}/customer_${customerId}.json`);
    yield customerReader.read();
    let adminsOfCustomer = new AdminList(customerReader.contents);
    let blacklistReader = new FileReader(options.blacklistFile);
    yield blacklistReader.read();
    let blacklistedAdminIds = JSON.parse(blacklistReader.contents);
    let goodAdminUsernames = adminsOfCustomer.blacklist(blacklistedAdminIds).usernames;
    return goodAdminUsernames;
  });
};

module.exports = listGoodAdminUsernames;
