/**
 * Module for registering broadcast updates to clients when
 * the Customer model changes. Exports the
 * [register function]{@link customer:socket~registerCustomerSockets}
 * to register the model schema events on the socket instance.
 * @module {function} customer:socket
 * @requires {@link customer:model}
 */
'use strict';

/**
 * The Customer model instance
 * @type {customer:model~Customer}
 */
var Customer = require('./customer.model').model;

// export the function to register all socket broadcasts
exports.register = registerCustomerSockets;

/**
 * Register Customer model change events on the passed socket
 * @param {socket.io} socket - The socket object to register the Customer model events on
 */
function registerCustomerSockets(socket) {
  Customer.schema.post('save', function (doc) {
    onSave(socket, doc);
  });

  Customer.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

/**
 * Emit a Customer save event on a socket object: 'customer:save'
 * @param {socket.io} socket - The socket object to emit the Customer save event on
 * @param {MogooseDocument} doc - The saved document that triggered the event
 * @param {function} cb - The callback function
 */
function onSave(socket, doc, cb) {
  socket.emit('customer:save', doc);
}

/**
 * Emit a Customer remove event on a socket object: 'customer:remove'
 * @param {socket.io} socket - The socket object to emit the Customer remove event on
 * @param {MogooseDocument} doc - The removed document that triggered the event
 * @param {function} cb - The callback function
 */
function onRemove(socket, doc, cb) {
  socket.emit('customer:remove', doc);
}
