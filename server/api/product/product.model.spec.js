/* jshint unused:false */
'use strict';

var should = require('should');
var seed = require('../../config/seed');

var product = require('./product.model');
var productDefinition = product.definition;
var productSchema= product.schema;
var Product = product.model;

var productData = seed.products;

// Clear all products
function cleanup(done) {
  Product.remove().exec().then(function () { done();  });
}

describe('Product Model', function () {

  // Clear products before testing
  before(cleanup);

  // Clear products after testing
  after(cleanup);

// Check test conditions for product tests
  it('should start with no products', function (done) {
    Product.find({}, function (err, products) {
      products.should.have.length(0);
      done(err);
    });
  });

  describe('basic crud operations', function () {

    var productModel = new Product(productData[0]);

    // Clear products after running this suite
    after(cleanup);

    it('should insert a new product', function (done) {
      productModel.save(function (err, product) {
        product.should.have.properties(productModel);
        done(err);
      });
    });

    it('should insert a list of products', function (done) {
      Product.create(productData, function (err, product) {
        // slice err argument
        Array.prototype.slice.call(arguments, 1)
          .should.have.lengthOf(productData.length);
        done(err);
      });
    });


    it('should find a product by _id property', function (done) {
      Product.findById(productModel._id, function (err, product) {
        product.should.have.properties(productData[0]);
        done(err);
      });
    });

    it('should update a product', function (done) {
      productModel.name = 'foo';
      productModel.save(function (err) { done(err);  });
    });

    it('should remove a product', function (done) {
      productModel.remove(function (err) { done(err); });
    });
  }); // crud
});
