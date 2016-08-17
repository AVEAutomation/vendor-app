/**
 * An module for defining and initializing the Customer model.
 * Exporting the Customer model definition, schema and model instance.
 * @module {Object} customer:model
 * @property {Object} definition - The [definition object]{@link customer:model~CustomerDefinition}
 * @property {MongooseSchema} schema - The [mongoose model schema]{@link customer:model~CustomerSchema}
 * @property {MongooseModel} model - The [mongoose model]{@link customer:model~Customer}
 */
'use strict';

var mongoose = require('mongoose');
var requestContext = require('mongoose-request-context');
var createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin;

/**
 * The Customer model definition
 * @type {Object}
 * @property {String} name - The name of this customer
 * @property {String} address - Address this customer shipped to
 * @property {String} phone - Phone number given by customer
 */
var CustomerDefinition = {
  name: {type: String, required: true},
  address: {
    street: {type:String, required: true}, 
    streetLine2: {type: String, required: false},
    zip: {type: String, required: true},
    state: {type: String, required: true},
    city: {type: String, required: true}
  },
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-?\d{3}-?\d{4}/.test(v);
      },
      message: '{VALUE} is not a valid phone number! Use format XXX-XXX-XXXX'
    },
    required: false
  }
};

/**
 * The Customer model schema
 * @type {MongooseSchema}
 */
var CustomerSchema = new mongoose.Schema(CustomerDefinition);

/**
 * Attach security related plugins
 */
CustomerSchema.plugin(createdModifiedPlugin);

CustomerSchema.plugin(requestContext, {
  propertyName: 'modifiedBy',
  contextPath: 'request:acl.user.name'
});

/**
 * Virtuals
 */


/**
 * Validations
 */
 // TODO: Index by phone number for customers
CustomerSchema
  .path('phone')
  .validate(validateUniquePhone, 'The specified phone number is already in use.');

/**
 *  The registered mongoose model instance of the Customer model
 *  @type {Customer}
 */
var Customer = mongoose.model('Customer', CustomerSchema);

module.exports = {

  /**
   * The Customer model definition object
   * @type {Object}
   * @see customer:CustomerModel~CustomerDefinition
   */
  definition: CustomerDefinition,

  /**
   * The Customer model schema
   * @type {MongooseSchema}
   * @see customer:model~CustomerSchema
   */
  schema: CustomerSchema,

  /**
   * The Customer model instance
   * @type {customer:model~Customer}
   */
  model: Customer

};

/**
 * Validate the uniqueness of the given name
 *
 * @api private
 * @param {String} value - The username to check for uniqueness
 * @param {Function} respond - The callback function
 */
function validateUniquePhone(value, respond) {
  // jshint validthis: true
  var self = this;

  // valid if no phone given
  if (!value) {
    respond(true);
  }

  // check for uniqueness of user name
  this.constructor.findOne({phone: value}, function (err, customer) {
    if (err) {
      throw err;
    }

    if (customer) {
      // the searched name is my name or a duplicate
      return respond(self.id === customer.id);
    }

    respond(true);
  });
}
