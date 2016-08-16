/* jshint unused:false */
'use strict';

var should = require('should');
var seed = require('../../config/seed');

var customer = require('./customer.model');
var customerDefinition = customer.definition;
var customerSchema= customer.schema;
var Customer = customer.model;

var customerData = seed.customers;

// Clear all customers
function cleanup(done) {
  Customer.remove().exec().then(function () { done();  });
}

describe('Customer Model', function () {

  // Clear customers before testing
  before(cleanup);

  // Clear customers after testing
  after(cleanup);

// Check test conditions for customer tests
  it('should start with no customers', function (done) {
    Customer.find({}, function (err, customers) {
      customers.should.have.length(0);
      done(err);
    });
  });

  describe('basic crud operations', function () {

    var customerModel = new Customer(customerData[0]);

    // Clear customers after running this suite
    after(cleanup);

    it('should insert a new customer', function (done) {
      customerModel.save(function (err, customer) {
        customer.should.have.properties(customerModel);
        done(err);
      });
    });

    it('should insert a list of customers', function (done) {
      Customer.create(customerData, function (err, customer) {
        // slice err argument
        Array.prototype.slice.call(arguments, 1)
          .should.have.lengthOf(customerData.length);
        done(err);
      });
    });


    it('should find a customer by _id property', function (done) {
      Customer.findById(customerModel._id, function (err, customer) {
        customer.should.have.properties(customerData[0]);
        done(err);
      });
    });

    it('should update a customer', function (done) {
      customerModel.name = 'foo';
      customerModel.save(function (err) { done(err);  });
    });

    it('should remove a customer', function (done) {
      customerModel.remove(function (err) { done(err); });
    });
  }); // crud
});
