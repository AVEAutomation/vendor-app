/**
 * Module for the controller definition of the product api.
 * The ProductController is handling /api/products requests.
 * @module {product:controller~ProductController} product:controller
 * @requires {@link ParamController}
 */
'use strict';

module.exports = ProductController;

var ParamController = require('../../lib/controllers/param.controller');

/**
 * The Product model instance
 * @type {product:model~Product}
 */
var Product = require('./product.model').model;

/**
 * ProductController constructor
 * @classdesc Controller that handles /api/products route requests
 * for the product api.
 * Uses the 'productId' parameter and the 'productParam' request property
 * to operate with the [main product API Model]{@link product:model~Product} model.
 * @constructor
 * @inherits ParamController
 * @see product:model~Product
 */
function ProductController(router) {
  ParamController.call(this, Product,  router);

  // modify select only properties
  // this.select = ['-__v'];

  // omit properties on update
  // this.omit = ['hashedPassword'];

  // property to return (maybe a virtual getter of the model)
  // this.defaultReturn = 'profile';
}

// define properties for the ProductController here
ProductController.prototype = {

  /**
   * Set our own constructor property for instanceof checks
   * @private
   */
  constructor: ProductController

};

// inherit from ParamController
ProductController.prototype = Object.create(ParamController.prototype);

