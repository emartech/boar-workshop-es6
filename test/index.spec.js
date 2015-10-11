'use strict';

var expect = require('chai').expect;
var presentReceiverFinder = require('../src');

describe('Secret Santa present receiver finder', function() {

  var options;

  beforeEach(function() {
    options = {
      employeesFile: __dirname + '/fixture/employees.json',
      secretSantaFile: __dirname + '/fixture/secretsanta.json'
    };
  });

  it('should find Alpha for Charlie', function(done) {
    presentReceiverFinder('Charlie', options, function(err, result) {
      expect(err).to.not.exist;
      expect(result).to.eql('Charlie -> Alpha');
      done();
    });
  });


  it('should find Echo for Delta', function(done) {
    presentReceiverFinder('Delta', options, function(err, result) {
      expect(err).to.not.exist;
      expect(result).to.eql('Delta -> Echo');
      done();
    });
  });


  it('should give an error message for Golf', function(done) {
    presentReceiverFinder('Golf', options, function(err, result) {
      expect(err).to.not.exist;
      expect(result).to.eql('Unknown employee: Golf');
      done();
    });
  });


  it('should propagate if there is a file system error', function(done) {
    options.employeesFile = __dirname + '/not-a-file';
    presentReceiverFinder('Golf', options, function(err, result) {
      expect(err).to.exist;
      done();
    });
  });

});
