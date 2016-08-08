'use strict';

process.env.DATABASE_NAME = process.env.DATABASE_NAME || 'vendorApp-dev';

module.exports = {

  mongo: {
    // uri: 'mongodb://localhost/' + process.env.DATABASE_NAME
    uri: 'mongodb://dev0:Shitfuck!@ec2-54-183-204-240.us-west-1.compute.amazonaws.com:27017/vendorApp'
  },

  seedDB: true
};
