/**
 * Module for registering broadcast updates to clients when
 * the Product model changes. Exports the
 * [register function]{@link product:socket~registerProductSockets}
 * to register the model schema events on the socket instance.
 * @module {function} product:socket
 * @requires {@link product:model}
 */
'use strict';

/**
 * The Product model instance
 * @type {product:model~Product}
 */
var Product = require('./product.model').model;

// export the function to register all socket broadcasts
exports.register = registerProductSockets;

/**
 * Register Product model change events on the passed socket
 * @param {socket.io} socket - The socket object to register the Product model events on
 */
function registerProductSockets(socket) {
  Product.schema.post('save', function (doc) {
    onSave(socket, doc);
  });

  Product.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

/**
 * Emit a Product save event on a socket object: 'product:save'
 * @param {socket.io} socket - The socket object to emit the Product save event on
 * @param {MogooseDocument} doc - The saved document that triggered the event
 * @param {function} cb - The callback function
 */
function onSave(socket, doc, cb) {
  socket.emit('product:save', doc);
}

/**
 * Emit a Product remove event on a socket object: 'product:remove'
 * @param {socket.io} socket - The socket object to emit the Product remove event on
 * @param {MogooseDocument} doc - The removed document that triggered the event
 * @param {function} cb - The callback function
 */
function onRemove(socket, doc, cb) {
  socket.emit('product:remove', doc);
}
