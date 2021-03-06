/**
 * An module for defining and initializing the Shipment model.
 * Exporting the Shipment model definition, schema and model instance.
 * @module {Object} shipment:model
 * @property {Object} definition - The [definition object]{@link shipment:model~ShipmentDefinition}
 * @property {MongooseSchema} schema - The [mongoose model schema]{@link shipment:model~ShipmentSchema}
 * @property {MongooseModel} model - The [mongoose model]{@link shipment:model~Shipment}
 */
'use strict';

var mongoose = require('mongoose');
var requestContext = require('mongoose-request-context');
var createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin;
var Currency = mongoose.Types.Currency, ObjectId = mongoose.Schema.Types.ObjectId;
/**
 * The Shipment model definition
 * @type {Object}
 * @property {String} orderId - The AVE id of this shipment
 * @property {String} info - Details about this shipment
 * @property {Boolean} active - Flag indicating this shipment is active
 */
var ShipmentDefinition = {
  orderId: {type: String, required: true},
  creationDate: Date,
  shipByDate: Date,
  status: {type: String, enum : ['Unshipped', 'Shipment confirmed', 'Canceled',
    'Delivered', 'Paid'], default: 'Unshipped'},
  units: Number,
  payments: Currency,
  sku: {type: String, required: true},
  product: {type: ObjectId, ref: 'Product', index: true},
  customer: {type: ObjectId, ref: 'Customer', index: true}
};

/**
 * The Shipment model schema
 * @type {MongooseSchema}
 */
var ShipmentSchema = new mongoose.Schema(ShipmentDefinition);

/**
 * Set compound indices. Combination of orderId and product must be unique. 
 */

ShipmentSchema.index({orderId: 1, product: -1});

/**
 * Attach security related plugins
 */
ShipmentSchema.plugin(createdModifiedPlugin);

ShipmentSchema.plugin(requestContext, {
  propertyName: 'modifiedBy',
  contextPath: 'request:acl.user.name'
});

/**
 * Validations TODO: validate unique {orderID + ProductId}
 */
// ShipmentSchema
//   .path('orderId')
//   .validate(validateUniqueOrderId, 'The specified orderId is already in use.');

/**
 *  The registered mongoose model instance of the Shipment model
 *  @type {Shipment}
 */
var Shipment = mongoose.model('Shipment', ShipmentSchema);

module.exports = {

  /**
   * The Shipment model definition object
   * @type {Object}
   * @see shipment:ShipmentModel~ShipmentDefinition
   */
  definition: ShipmentDefinition,

  /**
   * The Shipment model schema
   * @type {MongooseSchema}
   * @see shipment:model~ShipmentSchema
   */
  schema: ShipmentSchema,

  /**
   * The Shipment model instance
   * @type {shipment:model~Shipment}
   */
  model: Shipment

};

/**
 * Validate the uniqueness of the given name
 *
 * @api private
 * @param {String} value - The amazon order id to check for uniqueness
 * @param {Function} respond - The callback function
 */
function validateUniqueOrderId(value, respond) {
  // jshint validthis: true
  var self = this;

  // check for uniqueness of shipment id
  this.constructor.findOne({orderId: value}, function (err, shipment) {
    if (err) {
      throw err;
    }

    if (shipment) {
      // the searched orderId is my orderId or a duplicate
      return respond(self.id === shipment.id);
    }

    respond(true);
  });
}

/**
 * Validate the status of a shipment based on current data. 
 *
 * @api private
 * @param {String} value - The shipment status to check for uniqueness
 * @param {Function} respond - The callback function
 */
function validateStatus(value, respond) {
  // jshint validthis: true
  var self = this;

  // check for lot info in model, if status requires it
  if (this.status !== 'Unshipped' && this.status !== 'Canceled') {
    respond(this.lot != null);
  }
  respond(true);
}