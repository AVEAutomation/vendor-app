/**
 * Module for the controller definition of the customer api.
 * The CustomerController is handling /api/customers requests.
 * @module {customer:controller~CustomerController} customer:controller
 * @requires {@link ParamController}
 */
'use strict';

module.exports = CustomerController;

var ParamController = require('../../lib/controllers/param.controller');

/**
 * The Customer model instance
 * @type {customer:model~Customer}
 */
var Customer = require('./customer.model').model;

/**
 * CustomerController constructor
 * @classdesc Controller that handles /api/customers route requests
 * for the customer api.
 * Uses the 'customerId' parameter and the 'customerParam' request property
 * to operate with the [main customer API Model]{@link customer:model~Customer} model.
 * @constructor
 * @inherits ParamController
 * @see customer:model~Customer
 */
function CustomerController(router) {
  ParamController.call(this, Customer,  router);

  // modify select only properties
  // this.select = ['-__v'];

  // omit properties on update
  // this.omit = ['hashedPassword'];

  // property to return (maybe a virtual getter of the model)
  // this.defaultReturn = 'profile';
}

// define properties for the CustomerController here
CustomerController.prototype = {

  /**
   * Set our own constructor property for instanceof checks
   * @private
   */
  constructor: CustomerController

};

// inherit from ParamController
CustomerController.prototype = Object.create(ParamController.prototype);

