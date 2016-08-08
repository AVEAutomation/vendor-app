/* jshint unused:false */
'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var customerModel = require('./customer.model');

// Clear all customers
function cleanup(done) {
  customerModel.model.remove().exec().then(function () { done();  });
}

describe('/api/customers', function () {

  var customer;

  // reset customer before each test
  beforeEach(function () {
    customer = {
      name: 'Dog',
      info: 'Hello, this is dog.',
      active: true
    };
  });

  // Clear customers before each test
  beforeEach(cleanup);

  // Clear customers after each test
  afterEach(cleanup);

  describe('GET', function () {

    it('should respond with JSON array', function (done) {
      request(app)
        .get('/api/customers')
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

    it('should respond with an error for a malformed customer id parameter', function (done) {
      request(app)
        .get('/api/customers/malformedid')
        .set('Accept', 'application/json')
        .expect(400)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should respond with an not found error for a not existing customer id', function (done) {
      request(app)
        .get('/api/customers/cccccccccccccccccccccccc')
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should return a customer for its id', function (done) {
      customerModel.model(customer).save(function (err, doc) {
        request(app)
          .get('/api/customers/' + doc._id)
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
            res.body.should.be.an.Object.and.have.properties(customer);
            res.body._id.should.exist;
            done();
          });
      });
    });

  });

  describe('POST', function () {

    it('should create a new customer and respond with 201 and the created customer', function (done) {
      request(app)
        .post('/api/customers')
        .set('Accept', 'application/json')
        .send(customer)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.Object.and.have.properties(customer);
          res.body._id.should.exist;
          done();
        });
    });

  });

  describe('PUT', function () {

    it('should return an error if attempting a put without an id', function (done) {
      request(app)
        .put('/api/customers')
        .set('Accept', 'application/json')
        .send(customer)
        .expect(404)
        .end(done);
    });

    it('should respond with an not found error for a not existing customer id', function (done) {
      request(app)
        .put('/api/customers/cccccccccccccccccccccccc')
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should update a customer and respond with the updated customer', function (done) {
      request(app)
        .post('/api/customers')
        .set('Accept', 'application/json')
        .send(customer)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          customer.name = 'Cat';
          // check if id is stripped on update
          customer._id = 'malformed id string';
          request(app)
            .put('/api/customers/' + res.body._id)
            .set('Accept', 'application/json')
            .send(customer)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
              if (err) {
                return done(err);
              }
              res.body.should.be.an.Object.and.have.property('name', customer.name);
              done();
            });
        });
    });

  });

  describe('DELETE', function () {

    it('should return an error if attempting a delete without an id', function (done) {
      request(app)
        .delete('/api/customers')
        .set('Accept', 'application/json')
        .expect(404)
        .end(done);
    });

    it('should respond with an not found error for a not existing customer id', function (done) {
      request(app)
        .delete('/api/customers/cccccccccccccccccccccccc')
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should delete a customer and respond with 204', function (done) {
      request(app)
        .post('/api/customers')
        .set('Accept', 'application/json')
        .send(customer)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          request(app)
            .delete('/api/customers/' + res.body._id)
            .set('Accept', 'application/json')
            .expect(204)
            .end(done);
        });
    });
  });
});
