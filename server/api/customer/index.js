/**
 * Module for handling customer requests.
 * Initializing the [CustomerController]{@link customer:controller~CustomerController}
 * and configuring the express router to handle the customer api
 * for /api/customers routes. All Routes are registered after the
 * [request parameters]{@link customer:parameters} have been
 * added to the router instance.
 * Exports the configured express router for the customer api routes
 * @module {express.Router} customer
 * @requires {@link module:middleware}
 * @requires {@link customer:controller~CustomerController}
 */
'use strict';

var router = require('express').Router();
var contextService = require('request-context');
var middleware = require('../../lib/middleware');
var CustomerController = require('./customer.controller');
var auth = require('../../lib/auth/auth.service');

// Export the configured express router for the customer api routes
module.exports = router;

/**
 * The api controller
 * @type {customer:controller~CustomerController}
 */
var controller = new CustomerController(router);

// register customer route parameters, uncomment if needed
// var registerCustomerParameters = require('./customer.params');
// registerCustomerParameters(router);

// add context for auth sensitive resources
var addRequestContext = contextService.middleware('request');

// add the authenticated user to the created acl context
var addUserContext = auth.addAuthContext('request:acl.user');

// check if the request is made by an authenticated user with at least the user role
var isAuthenticated = auth.hasRole('user');

// apply auth middleware to all routes
router.route('*').all(addRequestContext, isAuthenticated, addUserContext);

// register customer routes
router.route('/')
  .get(controller.index)
  .post(controller.create);

router.route('/' + controller.paramString)
  .get(controller.show)
  .delete(controller.destroy)
  .put(controller.update)
  .patch(controller.update);
