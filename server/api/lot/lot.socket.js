/**
 * Module for registering broadcast updates to clients when
 * the Lot model changes. Exports the
 * [register function]{@link lot:socket~registerLotSockets}
 * to register the model schema events on the socket instance.
 * @module {function} lot:socket
 * @requires {@link lot:model}
 */
'use strict';

/**
 * The Lot model instance
 * @type {lot:model~Lot}
 */
var Lot = require('./lot.model').model;

// export the function to register all socket broadcasts
exports.register = registerLotSockets;

/**
 * Register Lot model change events on the passed socket
 * @param {socket.io} socket - The socket object to register the Lot model events on
 */
function registerLotSockets(socket) {
  Lot.schema.post('save', function (doc) {
    onSave(socket, doc);
  });

  Lot.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

/**
 * Emit a Lot save event on a socket object: 'lot:save'
 * @param {socket.io} socket - The socket object to emit the Lot save event on
 * @param {MogooseDocument} doc - The saved document that triggered the event
 * @param {function} cb - The callback function
 */
function onSave(socket, doc, cb) {
  socket.emit('lot:save', doc);
}

/**
 * Emit a Lot remove event on a socket object: 'lot:remove'
 * @param {socket.io} socket - The socket object to emit the Lot remove event on
 * @param {MogooseDocument} doc - The removed document that triggered the event
 * @param {function} cb - The callback function
 */
function onRemove(socket, doc, cb) {
  socket.emit('lot:remove', doc);
}
