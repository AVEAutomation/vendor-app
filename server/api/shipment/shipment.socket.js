/**
 * Module for registering broadcast updates to clients when
 * the Shipment model changes. Exports the
 * [register function]{@link shipment:socket~registerShipmentSockets}
 * to register the model schema events on the socket instance.
 * @module {function} shipment:socket
 * @requires {@link shipment:model}
 */
'use strict';

/**
 * The Shipment model instance
 * @type {shipment:model~Shipment}
 */
var Shipment = require('./shipment.model').model;

// export the function to register all socket broadcasts
exports.register = registerShipmentSockets;

/**
 * Register Shipment model change events on the passed socket
 * @param {socket.io} socket - The socket object to register the Shipment model events on
 */
function registerShipmentSockets(socket) {
  Shipment.schema.post('save', function (doc) {
    onSave(socket, doc);
  });

  Shipment.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

/**
 * Emit a Shipment save event on a socket object: 'shipment:save'
 * @param {socket.io} socket - The socket object to emit the Shipment save event on
 * @param {MogooseDocument} doc - The saved document that triggered the event
 * @param {function} cb - The callback function
 */
function onSave(socket, doc, cb) {
  socket.emit('shipment:save', doc);
}

/**
 * Emit a Shipment remove event on a socket object: 'shipment:remove'
 * @param {socket.io} socket - The socket object to emit the Shipment remove event on
 * @param {MogooseDocument} doc - The removed document that triggered the event
 * @param {function} cb - The callback function
 */
function onRemove(socket, doc, cb) {
  socket.emit('shipment:remove', doc);
}
