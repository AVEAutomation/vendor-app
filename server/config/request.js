/**
 * This module loads and initializes the request configuration
 * depending on the 'NODE_ENV' environment variable.
 * @module {function} config:request
 * @requires {@link config}
 */
 'use strict';

var express = require('express');
var path = require('path');
var config =  require('./index');


// export the request configuration function
module.exports = initRequest;

/**
 * Configure the request application by adding middleware and setting application
 * variables.
 * @param {request.app} app - The request instance to configure
 */
function initRequest(app) {
  app.default({jar: true});
  
}