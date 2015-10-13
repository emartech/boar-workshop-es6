'use strict';

var fs = require('fs');

var listGoodAdminUsernames = function(customerId, options, callback) {
  fs.readFile(options.customerFolder + '/customer_' + customerId + '.json', function(err, contents) {

    if (err) {
      callback(err);
      return;
    }

    var adminsOfCustomer = JSON.parse(contents);

    fs.readFile(options.blacklistFile, function(err, contents) {

      if (err) {
        callback(err);
        return;
      }

      var blacklistedAdminIds = JSON.parse(contents);

      var goodAdminUsernames = adminsOfCustomer.filter(function(admin) {
        return blacklistedAdminIds.indexOf(admin.id) < 0;
      }).map(function(admin) {
        return admin.username;
      });

      callback(null, goodAdminUsernames);

    });

  });
};

module.exports = listGoodAdminUsernames;
