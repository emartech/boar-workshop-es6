'use strict';

var fs = require('fs');

var findPresentReceiver = function(startName, options, callback) {
  fs.readFile(options.employeesFile, function(err, contents) {

    if (err) {
      callback(err);
      return;
    }

    var employees = JSON.parse(contents);

    fs.readFile(options.secretSantaFile, function(err, contents) {

      if (err) {
        callback(err);
        return;
      }

      var secretSanta = JSON.parse(contents);

      var employee = employees.filter(function(e) {
        return e.name === startName;
      })[0];

      if (!employee) {
        callback(null, 'Unknown employee: ' + startName);
        return;
      }

      var otherEmployeeId = secretSanta[employee.id];

      var otherEmployee = employees.filter(function(e) {
        return e.id === otherEmployeeId;
      })[0];

      callback(null, startName + ' -> ' + otherEmployee.name);

    });

  });
};

module.exports = findPresentReceiver;
