/**
 * Module for the controller definition of the shipment api.
 * The ShipmentController is handling /api/shipments requests.
 * @module {shipment:controller~ShipmentController} shipment:controller
 * @requires {@link ParamController}
 */
'use strict';

module.exports = ShipmentController;

var _ = require('lodash');
var ParamController = require('../../lib/controllers/param.controller');

/**
 * The Shipment model instance
 * @type {shipment:model~Shipment}
 */
var Shipment = require('./shipment.model').model;

/**
 * ShipmentController constructor
 * @classdesc Controller that handles /api/shipments route requests
 * for the shipment api.
 * Uses the 'shipmentId' parameter and the 'shipmentParam' request property
 * to operate with the [main shipment API Model]{@link shipment:model~Shipment} model.
 * @constructor
 * @inherits ParamController
 * @see shipment:model~Shipment
 */
function ShipmentController(router) {
  ParamController.call(this, Shipment, router);

  // modify populations
  this.populations = ['product', 'customer'];

  // modify select only properties
  // this.select = ['-__v'];

  // omit properties on update
  // this.omit = ['hashedPassword'];

  // property to return (maybe a virtual getter of the model)
  // this.defaultReturn = 'profile';
  
}

// define properties for the ShipmentController here
ShipmentController.prototype = {

  /**
   * Set our own constructor property for instanceof checks
   * @private
   */
  constructor: ShipmentController

  // modify populations
  // populations: ['product', 'customer']

};

// inherit from ParamController
ShipmentController.prototype = _.create(ParamController.prototype, ShipmentController.prototype);

