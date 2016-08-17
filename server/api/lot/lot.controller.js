/**
 * Module for the controller definition of the lot api.
 * The LotController is handling /api/lots requests.
 * @module {lot:controller~LotController} lot:controller
 * @requires {@link ParamController}
 */
'use strict';

module.exports = LotController;

var _ = require('lodash');
var ParamController = require('../../lib/controllers/param.controller');

/**
 * The Lot model instance
 * @type {lot:model~Lot}
 */
var Lot = require('./lot.model').model;

/**
 * LotController constructor
 * @classdesc Controller that handles /api/lots route requests
 * for the lot api.
 * Uses the 'lotId' parameter and the 'lotParam' request property
 * to operate with the [main lot API Model]{@link lot:model~Lot} model.
 * @constructor
 * @inherits ParamController
 * @see lot:model~Lot
 */
function LotController(router) {
  ParamController.call(this, Lot,  router);

  this.populations = ['shipments'];

  // modify select only properties
  // this.select = ['-__v'];

  // omit properties on update
  // this.omit = ['hashedPassword'];

  // property to return (maybe a virtual getter of the model)
  // this.defaultReturn = 'profile';
}

// define properties for the LotController here
LotController.prototype = {

  /**
   * Set our own constructor property for instanceof checks
   * @private
   */
  constructor: LotController

};

// inherit from ParamController
LotController.prototype = _.create(ParamController.prototype, LotController.prototype);

