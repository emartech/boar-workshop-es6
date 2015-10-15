'use strict';

var expect = require('chai').expect;
var adminUsernameLister = require('../src');

describe('Good admin username lister', function() {

  var options;

  beforeEach(function() {
    options = {
      customerFolder: __dirname + '/fixture',
      blacklistFile: __dirname + '/fixture/blacklist.json'
    };
  });

  it('should filter the blacklisted admins for Customer 123 and give back the admin usernames', function(done) {
    adminUsernameLister('123', options, function(err, result) {
      expect(err).to.not.exist;
      expect(result).to.eql(['Bravo']);
      done();
    });
  });


  it('should filter the blacklisted admins for Customer 456', function(done) {
    adminUsernameLister('456', options, function(err, result) {
      expect(err).to.not.exist;
      expect(result).to.eql(['Delta', 'Foxtrott']);
      done();
    });
  });


  it('should propagate the error if there is no such customer', function(done) {
    adminUsernameLister('789', options, function(err, result) {
      expect(err).to.exist;
      done();
    });
  });


  it('should propagate the error if the blacklist file is missing', function(done) {
    options.blacklistFile = __dirname + '/not-a-file';
    adminUsernameLister('123', options, function(err, result) {
      expect(err).to.exist;
      done();
    });
  });

});
