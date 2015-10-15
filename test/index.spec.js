'use strict';

var expect = require('chai').expect;
var presentReceiverFinder = require('../src');

describe('Good admin username lister', function() {

  var options;

  beforeEach(function() {
    options = {
      customerFolder: __dirname + '/fixture',
      blacklistFile: __dirname + '/fixture/blacklist.json'
    };
  });

  it('should filter the blacklisted admins for Customer 123 and give back the admin usernames', function(done) {
    presentReceiverFinder('123', options, function(err, result) {
      expect(err).to.not.exist;
      expect(result).to.eql(['Bravo']);
      done();
    });
  });


  it('should filter the blacklisted admins for Customer 456', function(done) {
    presentReceiverFinder('456', options, function(err, result) {
      expect(err).to.not.exist;
      expect(result).to.eql(['Delta', 'Foxtrott']);
      done();
    });
  });


  it('should propagate the error if there is no such customer', function(done) {
    presentReceiverFinder('789', options, function(err, result) {
      expect(err).to.exist;
      done();
    });
  });


  it('should propagate the error if the blacklist file is missing', function(done) {
    options.blacklistFile = __dirname + '/not-a-file';
    presentReceiverFinder('123', options, function(err, result) {
      expect(err).to.exist;
      done();
    });
  });

});
