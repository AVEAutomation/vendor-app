/**
 * Module for handling shipment requests.
 * Initializing the [ShipmentController]{@link shipment:controller~ShipmentController}
 * and configuring the express router to handle the shipment api
 * for /api/shipments routes. All Routes are registered after the
 * [request parameters]{@link shipment:parameters} have been
 * added to the router instance.
 * Exports the configured express router for the shipment api routes
 * @module {express.Router} shipment
 * @requires {@link module:middleware}
 * @requires {@link shipment:controller~ShipmentController}
 */
'use strict';

var router = require('express').Router();
var contextService = require('request-context');
var middleware = require('../../lib/middleware');
var ShipmentController = require('./shipment.controller');
var auth = require('../../lib/auth/auth.service');

// Export the configured express router for the shipment api routes
module.exports = router;

/**
 * The api controller
 * @type {shipment:controller~ShipmentController}
 */
var controller = new ShipmentController(router);

// register shipment route parameters, uncomment if needed
// var registerShipmentParameters = require('./shipment.params');
// registerShipmentParameters(router);

// add context for auth sensitive resources
var addRequestContext = contextService.middleware('request');

// add the authenticated user to the created acl context
var addUserContext = auth.addAuthContext('request:acl.user');

// check if the request is made by an authenticated user with at least the user role
var isAuthenticated = auth.hasRole('user');

// apply auth middleware to all routes
router.route('*').all(addRequestContext, isAuthenticated, addUserContext);

// register shipment routes
router.route('/')
  .get(controller.index)
  .post(controller.create);

router.route('/' + controller.paramString)
  .get(controller.show)
  .delete(controller.destroy)
  .put(controller.update)
  .patch(controller.update);
