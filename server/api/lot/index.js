/**
 * Module for handling lot requests.
 * Initializing the [LotController]{@link lot:controller~LotController}
 * and configuring the express router to handle the lot api
 * for /api/lots routes. All Routes are registered after the
 * [request parameters]{@link lot:parameters} have been
 * added to the router instance.
 * Exports the configured express router for the lot api routes
 * @module {express.Router} lot
 * @requires {@link module:middleware}
 * @requires {@link lot:controller~LotController}
 */
'use strict';

var router = require('express').Router();
var contextService = require('request-context');
var middleware = require('../../lib/middleware');
var LotController = require('./lot.controller');
var auth = require('../../lib/auth/auth.service');

// Export the configured express router for the lot api routes
module.exports = router;

/**
 * The api controller
 * @type {lot:controller~LotController}
 */
var controller = new LotController(router);

// register lot route parameters, uncomment if needed
// var registerLotParameters = require('./lot.params');
// registerLotParameters(router);

// add context for auth sensitive resources
var addRequestContext = contextService.middleware('request');

// add the authenticated user to the created acl context
var addUserContext = auth.addAuthContext('request:acl.user');

// check if the request is made by an authenticated user with at least the user role
var isAuthenticated = auth.hasRole('user');

// apply auth middleware to all routes
router.route('*').all(addRequestContext, isAuthenticated, addUserContext);

// register lot routes
router.route('/')
  .get(controller.index)
  .post(controller.create);

router.route('/' + controller.paramString)
  .get(controller.show)
  .delete(controller.destroy)
  .put(controller.update)
  .patch(controller.update);
