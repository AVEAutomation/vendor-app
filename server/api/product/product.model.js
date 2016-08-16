/**
 * An module for defining and initializing the Product model.
 * Exporting the Product model definition, schema and model instance.
 * @module {Object} product:model
 * @property {Object} definition - The [definition object]{@link product:model~ProductDefinition}
 * @property {MongooseSchema} schema - The [mongoose model schema]{@link product:model~ProductSchema}
 * @property {MongooseModel} model - The [mongoose model]{@link product:model~Product}
 */
'use strict';

var mongoose = require('mongoose');
var requestContext = require('mongoose-request-context');
var createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin;

/**
 * The Product model definition
 * @type {Object}
 * @property {String} name - The name of this product
 * @property {String} info - Details about this product
 * @property {Boolean} active - Flag indicating this product is active
 */
var ProductDefinition = {
  name: {type: String, required: true},
  upc: {type: String, match: /^(8\d{11}|8\d{13})/ },
  asin: {type: String, match: /^([a-zA-Z0-9]{10})/}
};

/**
 * The Product model schema
 * @type {MongooseSchema}
 */
var ProductSchema = new mongoose.Schema(ProductDefinition);

/**
 * Attach security related plugins
 */
ProductSchema.plugin(createdModifiedPlugin);

ProductSchema.plugin(requestContext, {
  propertyName: 'modifiedBy',
  contextPath: 'request:acl.user.name'
});

/**
 * Validations
 */
ProductSchema
  .path('upc')
  .validate(validateUniqueUPC, 'The specified upc is already in use.');
ProductSchema
  .path('asin')
  .validate(validateUniqueASIN, 'The specified asin is already in use.');
/**
 *  The registered mongoose model instance of the Product model
 *  @type {Product}
 */
var Product = mongoose.model('Product', ProductSchema);

module.exports = {

  /**
   * The Product model definition object
   * @type {Object}
   * @see product:ProductModel~ProductDefinition
   */
  definition: ProductDefinition,

  /**
   * The Product model schema
   * @type {MongooseSchema}
   * @see product:model~ProductSchema
   */
  schema: ProductSchema,

  /**
   * The Product model instance
   * @type {product:model~Product}
   */
  model: Product

};

/**
 * Validate the uniqueness of the given upc
 *
 * @api private
 * @param {String} value - The upc to check for uniqueness
 * @param {Function} respond - The callback function
 */
function validateUniqueUPC(value, respond) {
  // jshint validthis: true
  var self = this;

  // check for uniqueness of product upc
  this.constructor.findOne({upc: value}, function (err, product) {
    if (err) {
      throw err;
    }

    if (product) {
      // the searched upc is my upc or a duplicate
      return respond(self.id === product.id);
    }

    respond(true);
  });
}

/**
 * Validate the uniqueness of the given asin
 *
 * @api private
 * @param {String} value - The asin to check for uniqueness
 * @param {Function} respond - The callback function
 */
function validateUniqueASIN(value, respond) {
  // jshint validthis: true
  var self = this;

  // check for uniqueness of product asin
  this.constructor.findOne({asin: value}, function (err, product) {
    if (err) {
      throw err;
    }

    if (product) {
      // the searched asin is my asin or a duplicate
      return respond(self.id === product.id);
    }

    respond(true);
  });
}
