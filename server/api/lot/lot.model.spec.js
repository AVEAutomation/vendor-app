/* jshint unused:false */
'use strict';

var should = require('should');
var seed = require('../../config/seed');

var lot = require('./lot.model');
var lotDefinition = lot.definition;
var lotSchema= lot.schema;
var Lot = lot.model;

var lotData = seed.lots;

// Clear all lots
function cleanup(done) {
  Lot.remove().exec().then(function () { done();  });
}

describe('Lot Model', function () {

  // Clear lots before testing
  before(cleanup);

  // Clear lots after testing
  after(cleanup);

// Check test conditions for lot tests
  it('should start with no lots', function (done) {
    Lot.find({}, function (err, lots) {
      lots.should.have.length(0);
      done(err);
    });
  });

  describe('basic crud operations', function () {

    var lotModel = new Lot(lotData[0]);

    // Clear lots after running this suite
    after(cleanup);

    it('should insert a new lot', function (done) {
      lotModel.save(function (err, lot) {
        lot.should.have.properties(lotModel);
        done(err);
      });
    });

    it('should insert a list of lots', function (done) {
      Lot.create(lotData, function (err, lot) {
        // slice err argument
        Array.prototype.slice.call(arguments, 1)
          .should.have.lengthOf(lotData.length);
        done(err);
      });
    });


    it('should find a lot by _id property', function (done) {
      Lot.findById(lotModel._id, function (err, lot) {
        lot.should.have.properties(lotData[0]);
        done(err);
      });
    });

    it('should update a lot', function (done) {
      lotModel.name = 'foo';
      lotModel.save(function (err) { done(err);  });
    });

    it('should remove a lot', function (done) {
      lotModel.remove(function (err) { done(err); });
    });
  }); // crud
});
