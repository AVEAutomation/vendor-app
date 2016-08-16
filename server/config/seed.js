/*
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var env = process.env.NODE_ENV || 'development';

var User = require('../api/user/user.model').model;
var Customer = require('../api/customer/customer.model').model;
var Lot = require('../api/lot/lot.model').model;
var Shipment = require('../api/shipment/shipment.model').model;
var Product = require('../api/product/product.model').model;

/*
// Insert some data needed to bootstrap or init the application

if ('production' === env) {
  // Insert some data needed to init the production instance only, update a version info ...
}
*/

/*
 * Insert dummy data to test the application
 */
exports.users = [{
  provider: 'local',
  name: 'Test User',
  password: 'password',
  active: true
}, {
  provider: 'local',
  role: 'admin',
  name: 'Admin',
  password: 'password',
  active: true
}, {
  provider: 'local',
  role: 'root',
  name: 'Root',
  password: 'password',
  active: true
}];

exports.shipments = [
{
  orderId:"DKcRNc7XN",
  creationDate:"Aug 6, 2016",
  shipByDate:"Aug 12, 2016",
  status:"Shipment confirmed",
  units:1,
  payments:"$3.92",
  sku: "06F",
  product: ObjectId(1),
  customer: ObjectId(1)
}, {
  orderId:"DplMb07cN",
  creationDate:"Aug 6, 2016",
  shipByDate:"Aug 12, 2016",
  status:"Unshipped",
  units:1,
  payments:"$6.78",
  sku: '12P',
  product: ObjectId( 2),
  customer: ObjectId(2)
},{
  orderId:"DpTMbp7bN",
  creationDate:"Aug 6, 2016",
  shipByDate:"Aug 12, 2016",
  status:"Shipment confirmed",
  units:1,
  payments:"$3.92",
  sku: "06F",
  product: ObjectId( 1),
  customer: ObjectId(3)
}];

exports.customers = [{
  name: 'Amazon Locker - Hannah',
  address: {
    street: '12355 15th Ave NE at 7-Eleven',
    city: 'Seattle',
    state: 'WA',
    zip: '98125-4819'
  }
},{ 
  name: 'Amazon Locker - George',
  address: {
    street: '12355 15th Ave NE at 7-Eleven',
    city: 'Seattle',
    state: 'WA',
    zip: '98125-4819'
  }
}];

exports.lots = [{
  created: "Aug 11, 2016",
  shipped: "Aug 12, 2016",
  shipments: [ObjectId('1'), ObjectId('3')]
}];

exports.products = [{
  name: 'Finess Softpatch for Stress Incontinence',
  upc: '860507000213',
  asin: 'B01438A52M'
}, {
  name: 'Finess Softpatch for Stress Incontinence',
  upc: '860507000206',
  asin: 'B013TT27TA'
}, {
  name: 'Finess Softpatch for Stress Incontinence',
  upc: '860507000220',
  asin: 'B01DEDVJLI'
}];

if ('development' === env) {
  console.log('Populating test and development data ...');

  User.find({}).remove(function () {
    User.create(exports.users, function (err) {
      if (err) {
        console.error('Error while populating users: %s', err);
      } else {
        console.log('finished populating users');
      }
    });
  });

  Customer.find({}).remove(function () {
    Customer.create(exports.customers, function (err) {
      if (err) {
        console.error('Error while populating customers: %s', err);
      } else {
        console.log('finished populating customers');
      }
    });
  });

  Product.find({}).remove(function () {
    Product.create(exports.products, function (err) {
      if (err) {
        console.error('Error while populating products: %s', err);
      } else {
        console.log('finished populating products');
      }
    });
  });


  Shipment.find({}).remove(function () {
    Shipment.create(exports.shipments, function (err) {
      if (err) {
        console.error('Error while populating shipments: %s', err);
      } else {
        console.log('finished populating shipments');
      }
    });
  });

  Lot.find({}).remove(function () {
    Lot.create(exports.lots, function (err) {
      if (err) {
        console.error('Error while populating lots: %s', err);
      } else {
        console.log('finished populating lots');
      }
    });
  });
}
