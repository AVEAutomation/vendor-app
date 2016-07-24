'use strict';

process.env.DATABASE_NAME = process.env.DATABASE_NAME || 'vendorApp';

module.exports = {

  ip: process.env.ip || undefined,

  port: process.env.PORT || 8080,

  publicDir: 'client',

  mongo: {
    uri: 'mongodb://localhost/' + process.env.DATABASE_NAME
  }
};
