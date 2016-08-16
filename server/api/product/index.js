/**
 * Module for handling product requests.
 * Initializing the [ProductController]{@link product:controller~ProductController}
 * and configuring the express router to handle the product api
 * for /api/products routes. All Routes are registered after the
 * [request parameters]{@link product:parameters} have been
 * added to the router instance.
 * Exports the configured express router for the product api routes
 * @module {express.Router} product
 * @requires {@link module:middleware}
 * @requires {@link product:controller~ProductController}
 */
'use strict';

var router = require('express').Router();
var contextService = require('request-context');
var middleware = require('../../lib/middleware');
var ProductController = require('./product.controller');
var auth = require('../../lib/auth/auth.service');

// Export the configured express router for the product api routes
module.exports = router;

/**
 * The api controller
 * @type {product:controller~ProductController}
 */
var controller = new ProductController(router);

// register product route parameters, uncomment if needed
// var registerProductParameters = require('./product.params');
// registerProductParameters(router);

// add context for auth sensitive resources
var addRequestContext = contextService.middleware('request');

// add the authenticated user to the created acl context
var addUserContext = auth.addAuthContext('request:acl.user');

// check if the request is made by an authenticated user with at least the user role
var isAuthenticated = auth.hasRole('user');

// apply auth middleware to all routes
router.route('*').all(addRequestContext, isAuthenticated, addUserContext);

// register product routes
router.route('/')
  .get(controller.index)
  .post(controller.create);

router.route('/' + controller.paramString)
  .get(controller.show)
  .delete(controller.destroy)
  .put(controller.update)
  .patch(controller.update);
