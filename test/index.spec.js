'use strict';

require('co-mocha');

let expect = require('chai').expect;
let adminUsernameLister = require('../src');

describe('Good admin username lister', function() {

  let options;

  beforeEach(function() {
    options = {
      customerFolder: __dirname + '/fixture',
      blacklistFile: __dirname + '/fixture/blacklist.json'
    };
  });

  it('should filter the blacklisted admins for Customer 123 and give back the admin usernames', function* () {
    let result = yield adminUsernameLister('123', options);
    expect(result).to.eql(['Bravo']);
  });


  it('should filter the blacklisted admins for Customer 456', function* () {
    let result = yield adminUsernameLister('456', options);
    expect(result).to.eql(['Delta', 'Foxtrott']);
  });


  it('should propagate the error if there is no such customer', function* () {
    try {
      let result = yield adminUsernameLister('789', options);
    } catch (err) {
      expect(err).to.exist;
      return;
    }
    throw new Error('errors should propagate');
  });


  it('should propagate the error if the blacklist file is missing', function* () {
    options.blacklistFile = __dirname + '/not-a-file';
    try {
      let result = yield adminUsernameLister('123', options);
    } catch (err) {
      expect(err).to.exist;
      return;
    }
    throw new Error('errors should propagate');
  });

});
