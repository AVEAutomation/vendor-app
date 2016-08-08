/* jshint unused:false */
'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var lotModel = require('./lot.model');

// Clear all lots
function cleanup(done) {
  lotModel.model.remove().exec().then(function () { done();  });
}

describe('/api/lots', function () {

  var lot;

  // reset lot before each test
  beforeEach(function () {
    lot = {
      name: 'Dog',
      info: 'Hello, this is dog.',
      active: true
    };
  });

  // Clear lots before each test
  beforeEach(cleanup);

  // Clear lots after each test
  afterEach(cleanup);

  describe('GET', function () {

    it('should respond with JSON array', function (done) {
      request(app)
        .get('/api/lots')
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

    it('should respond with an error for a malformed lot id parameter', function (done) {
      request(app)
        .get('/api/lots/malformedid')
        .set('Accept', 'application/json')
        .expect(400)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should respond with an not found error for a not existing lot id', function (done) {
      request(app)
        .get('/api/lots/cccccccccccccccccccccccc')
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should return a lot for its id', function (done) {
      lotModel.model(lot).save(function (err, doc) {
        request(app)
          .get('/api/lots/' + doc._id)
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
            res.body.should.be.an.Object.and.have.properties(lot);
            res.body._id.should.exist;
            done();
          });
      });
    });

  });

  describe('POST', function () {

    it('should create a new lot and respond with 201 and the created lot', function (done) {
      request(app)
        .post('/api/lots')
        .set('Accept', 'application/json')
        .send(lot)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.Object.and.have.properties(lot);
          res.body._id.should.exist;
          done();
        });
    });

  });

  describe('PUT', function () {

    it('should return an error if attempting a put without an id', function (done) {
      request(app)
        .put('/api/lots')
        .set('Accept', 'application/json')
        .send(lot)
        .expect(404)
        .end(done);
    });

    it('should respond with an not found error for a not existing lot id', function (done) {
      request(app)
        .put('/api/lots/cccccccccccccccccccccccc')
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should update a lot and respond with the updated lot', function (done) {
      request(app)
        .post('/api/lots')
        .set('Accept', 'application/json')
        .send(lot)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          lot.name = 'Cat';
          // check if id is stripped on update
          lot._id = 'malformed id string';
          request(app)
            .put('/api/lots/' + res.body._id)
            .set('Accept', 'application/json')
            .send(lot)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
              if (err) {
                return done(err);
              }
              res.body.should.be.an.Object.and.have.property('name', lot.name);
              done();
            });
        });
    });

  });

  describe('DELETE', function () {

    it('should return an error if attempting a delete without an id', function (done) {
      request(app)
        .delete('/api/lots')
        .set('Accept', 'application/json')
        .expect(404)
        .end(done);
    });

    it('should respond with an not found error for a not existing lot id', function (done) {
      request(app)
        .delete('/api/lots/cccccccccccccccccccccccc')
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/)
        .end(done);
    });

    it('should delete a lot and respond with 204', function (done) {
      request(app)
        .post('/api/lots')
        .set('Accept', 'application/json')
        .send(lot)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          request(app)
            .delete('/api/lots/' + res.body._id)
            .set('Accept', 'application/json')
            .expect(204)
            .end(done);
        });
    });
  });
});
