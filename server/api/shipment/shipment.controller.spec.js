/* jshint unused:false */
'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var shipmentModel = require('./shipment.model');

// Clear all shipments
function cleanup(done) {
  shipmentModel.model.remove().exec().then(function () { done();  });
}

describe('/api/shipments', function () {

  var shipment;

  // reset shipment before each test
  beforeEach(function () {
    shipment =  {
      shipmentId:"DKcRNc7XN",
      creationDate:"Aug 6, 2016",
      shipByDate:"Aug 12, 2016",
      status:"Unshipped",
      units:1,
      payments:"$3.92",
      customer:1, //Hope these vals will be parsed into correct tyeps
      lotId: null 
    };
  });

  // Clear shipments before each test
  beforeEach(cleanup);

  // Clear shipments after each test
  afterEach(cleanup);

  describe('GET', function () {

    it('should respond with JSON array', function (done) {
      request(app)
        .get('/api/shipments')
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

    it('should respond with an error for a malformed shipment id parameter', function (done) {
      request(app)
        .get('/api/shipments/malformedid')
        .set('Accept', 'application/json')
        .expect(400)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should respond with an not found error for a not existing shipment id', function (done) {
      request(app)
        .get('/api/shipments/cccccccccccccccccccccccc')
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should return a shipment for its id', function (done) {
      shipmentModel.model(shipment).save(function (err, doc) {
        request(app)
          .get('/api/shipments/' + doc._id)
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
            res.body.should.be.an.Object.and.have.properties(shipment);
            res.body._id.should.exist;
            done();
          });
      });
    });

  });

  describe('POST', function () {

    it('should create a new shipment and respond with 201 and the created shipment', function (done) {
      request(app)
        .post('/api/shipments')
        .set('Accept', 'application/json')
        .send(shipment)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.Object.and.have.properties(shipment);
          res.body._id.should.exist;
          done();
        });
    });

  });

  describe('PUT', function () {

    it('should return an error if attempting a put without an id', function (done) {
      request(app)
        .put('/api/shipments')
        .set('Accept', 'application/json')
        .send(shipment)
        .expect(404)
        .end(done);
    });

    it('should respond with an not found error for a not existing shipment id', function (done) {
      request(app)
        .put('/api/shipments/cccccccccccccccccccccccc')
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should update a shipment and respond with the updated shipment', function (done) {
      request(app)
        .post('/api/shipments')
        .set('Accept', 'application/json')
        .send(shipment)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          shipment.name = 'Cat';
          // check if id is stripped on update
          shipment._id = 'malformed id string';
          request(app)
            .put('/api/shipments/' + res.body._id)
            .set('Accept', 'application/json')
            .send(shipment)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
              if (err) {
                return done(err);
              }
              res.body.should.be.an.Object.and.have.property('name', shipment.name);
              done();
            });
        });
    });

  });

  describe('DELETE', function () {

    it('should return an error if attempting a delete without an id', function (done) {
      request(app)
        .delete('/api/shipments')
        .set('Accept', 'application/json')
        .expect(404)
        .end(done);
    });

    it('should respond with an not found error for a not existing shipment id', function (done) {
      request(app)
        .delete('/api/shipments/cccccccccccccccccccccccc')
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should delete a shipment and respond with 204', function (done) {
      request(app)
        .post('/api/shipments')
        .set('Accept', 'application/json')
        .send(shipment)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          request(app)
            .delete('/api/shipments/' + res.body._id)
            .set('Accept', 'application/json')
            .expect(204)
            .end(done);
        });
    });
  });
});
