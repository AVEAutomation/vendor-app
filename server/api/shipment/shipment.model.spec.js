/* jshint unused:false */
'use strict';

var should = require('should');

var shipment = require('./shipment.model');
var shipmentDefinition = shipment.definition;
var shipmentSchema= shipment.schema;
var Shipment = shipment.model;

var shipmentData = [
  {
    "shipmentId":"DKcRNc7XN",
    "creationDate":"Aug 6, 2016",
    "shipByDate":"Aug 12, 2016",
    "status":"Unshipped",
    "units":1,
    "payments":"$3.92",
    "customer":1, //Hope these vals will be parsed into correct tyeps
    "lotId": null 
  }, {
    "shipmentId":"DplMb07cN",
    "creationDate":"Aug 6, 2016",
    "shipByDate":"Aug 12, 2016",
    "status":"Unshipped",
    "units":1,
    "payments":"$6.78",
    "customer":2,
    "lotId": null
  },{
    "shipmentId":"DpTMbp7bN",
    "creationDate":"Aug 6, 2016",
    "shipByDate":"Aug 12, 2016",
    "status":"Shipment confirmed",
    "units":1,
    "payments":"$3.92",
    "customer":3,
    "lotId": 1
  }
  // TODO: add 4th shipment to put in lot 2
];

// Clear all shipments
function cleanup(done) {
  Shipment.remove().exec().then(function () { done();  });
}

describe('Shipment Model', function () {

  // Clear shipments before testing
  before(cleanup);

  // Clear shipments after testing
  after(cleanup);

// Check test conditions for shipment tests
  it('should start with no shipments', function (done) {
    Shipment.find({}, function (err, shipments) {
      shipments.should.have.length(0);
      done(err);
    });
  });

  describe('basic crud operations', function () {

    var shipmentModel = new Shipment(shipmentData[0]);

    // Clear shipments after running this suite
    after(cleanup);

    it('should insert a new shipment', function (done) {
      shipmentModel.save(function (err, shipment) {
        shipment.should.have.properties(shipmentModel);
        done(err);
      });
    });

    it('should insert a list of shipments', function (done) {
      Shipment.create(shipmentData, function (err, shipment) {
        // slice err argument
        Array.prototype.slice.call(arguments, 1)
          .should.have.lengthOf(shipmentData.length);
        done(err);
      });
    });


    it('should find a shipment by _id property', function (done) {
      Shipment.findById(shipmentModel._id, function (err, shipment) {
        shipment.should.have.properties(shipmentData[0]);
        done(err);
      });
    });

    it('should update a shipment', function (done) {
      shipmentModel.status = 'Shipment confirmed';
      shipmentModel.save(function (err) { done(err);  });
    });

    it('should remove a shipment', function (done) {
      shipmentModel.remove(function (err) { done(err); });
    });
  }); // crud
});
