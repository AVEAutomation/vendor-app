/* jshint unused:false */
'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var productModel = require('./product.model');
var seed = require('../../config/seed');
seed = seed.products;

// Clear all products
function cleanup(done) {
  productModel.model.remove().exec().then(function () { done();  });
}

describe('/api/products', function () {

  var product;

  // reset product before each test
  beforeEach(function () {
    product = seed[0];
  });

  // Clear products before each test
  beforeEach(cleanup);

  // Clear products after each test
  afterEach(cleanup);

  describe('GET', function () {

    it('should respond with JSON array', function (done) {
      request(app)
        .get('/api/products')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          res.body.should.be.instanceof(Array);
          done();
        });
    });

    it('should respond with an error for a malformed product id parameter', function (done) {
      request(app)
        .get('/api/products/malformedid')
        .set('Accept', 'application/json')
        .expect(400)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should respond with an not found error for a not existing product id', function (done) {
      request(app)
        .get('/api/products/cccccccccccccccccccccccc')
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should return a product for its id', function (done) {
      productModel.model(product).save(function (err, doc) {
        request(app)
          .get('/api/products/' + doc._id)
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
            res.body.should.be.an.Object.and.have.properties(product);
            res.body._id.should.exist;
            done();
          });
      });
    });

  });

  describe('POST', function () {

    it('should create a new product and respond with 201 and the created product', function (done) {
      request(app)
        .post('/api/products')
        .set('Accept', 'application/json')
        .send(product)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.Object.and.have.properties(product);
          res.body._id.should.exist;
          done();
        });
    });

  });

  describe('PUT', function () {

    it('should return an error if attempting a put without an id', function (done) {
      request(app)
        .put('/api/products')
        .set('Accept', 'application/json')
        .send(product)
        .expect(404)
        .end(done);
    });

    it('should respond with an not found error for a not existing product id', function (done) {
      request(app)
        .put('/api/products/cccccccccccccccccccccccc')
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should update a product and respond with the updated product', function (done) {
      request(app)
        .post('/api/products')
        .set('Accept', 'application/json')
        .send(product)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          product.name = 'Cat';
          // check if id is stripped on update
          product._id = 'malformed id string';
          request(app)
            .put('/api/products/' + res.body._id)
            .set('Accept', 'application/json')
            .send(product)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
              if (err) {
                return done(err);
              }
              res.body.should.be.an.Object.and.have.property('name', product.name);
              done();
            });
        });
    });

  });

  describe('DELETE', function () {

    it('should return an error if attempting a delete without an id', function (done) {
      request(app)
        .delete('/api/products')
        .set('Accept', 'application/json')
        .expect(404)
        .end(done);
    });

    it('should respond with an not found error for a not existing product id', function (done) {
      request(app)
        .delete('/api/products/cccccccccccccccccccccccc')
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should delete a product and respond with 204', function (done) {
      request(app)
        .post('/api/products')
        .set('Accept', 'application/json')
        .send(product)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          request(app)
            .delete('/api/products/' + res.body._id)
            .set('Accept', 'application/json')
            .expect(204)
            .end(done);
        });
    });
  });
});
