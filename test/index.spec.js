'use strict';

let expect = require('chai').expect;
let presentReceiverFinder = require('../src');

describe('Good admin username lister', function() {

  let options;

  beforeEach(function() {
    options = {
      customerFolder: __dirname + '/fixture',
      blacklistFile: __dirname + '/fixture/blacklist.json'
    };
  });

  it('should find Bravo for Customer 123', function() {
    return presentReceiverFinder('123', options).then(function(result) {
      expect(result).to.eql(['Bravo']);
    });
  });


  it('should find Delta and Foxtrott for Customer 456', function() {
    return presentReceiverFinder('456', options).then(function(result) {
      expect(result).to.eql(['Delta', 'Foxtrott']);
    });
  });


  it('should propagate the error if there is no such customer', function() {
    return presentReceiverFinder('789', options).then(function() {
      throw new Error('Errors should propagate, but it seems they were handled.');
    }, function(err) {
      expect(err).to.exist;
    });
  });


  it('should propagate the error if the blacklist file is missing', function() {
    options.blacklistFile = __dirname + '/not-a-file';
    return presentReceiverFinder('123', options).then(function() {
      throw new Error('Errors should propagate, but it seems they were handled.');
    }, function(err) {
      expect(err).to.exist;
    });
  });

});
