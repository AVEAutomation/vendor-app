/**
 * An module for defining and initializing the Lot model.
 * Exporting the Lot model definition, schema and model instance.
 * @module {Object} lot:model
 * @property {Object} definition - The [definition object]{@link lot:model~LotDefinition}
 * @property {MongooseSchema} schema - The [mongoose model schema]{@link lot:model~LotSchema}
 * @property {MongooseModel} model - The [mongoose model]{@link lot:model~Lot}
 */
'use strict';

var mongoose = require('mongoose');
var requestContext = require('mongoose-request-context');
var createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin;

/**
 * The Lot model definition
 * @type {Object}
 * @property {Date} created - The date this lot was created
 * @property {Date} shipped - The date this lot was confirmed shipped
 * @property {[ObjectId]} shipments - The shipments within this lot
 * @property {Boolean} active - Flag indicating this lot is active
 */
var LotDefinition = {
  created: {type: Date, default: Date.now()},
  shipped: Date,
  shipments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Shipment', index: true}]
};

/**
 * The Lot model schema
 * @type {MongooseSchema}
 */
var LotSchema = new mongoose.Schema(LotDefinition);

/**
 * Attach security related plugins
 */
LotSchema.plugin(createdModifiedPlugin);

LotSchema.plugin(requestContext, {
  propertyName: 'modifiedBy',
  contextPath: 'request:acl.user.name'
});

/**
 * Validations
 */
LotSchema
  .path('shipments')
  .validate(validateUniqueShipments, 'A specified shipment is already in use by a Lot.');

/**
 *  The registered mongoose model instance of the Lot model
 *  @type {Lot}
 */
var Lot = mongoose.model('Lot', LotSchema);

module.exports = {

  /**
   * The Lot model definition object
   * @type {Object}
   * @see lot:LotModel~LotDefinition
   */
  definition: LotDefinition,

  /**
   * The Lot model schema
   * @type {MongooseSchema}
   * @see lot:model~LotSchema
   */
  schema: LotSchema,

  /**
   * The Lot model instance
   * @type {lot:model~Lot}
   */
  model: Lot

};

/**
 * Validate the uniqueness of the given shipments
 *
 * @api private
 * @param {[ObjectId]} value - The shipment id's to check for uniqueness
 * @param {Function} respond - The callback function
 */
function validateUniqueShipments(value, respond) {
  // jshint validthis: true
  var self = this;

  // TODO check for uniqueness all shipments in value

  respond(true);
}
