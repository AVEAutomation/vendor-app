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
  // _id: '57b4bcf47a18a5b400923d78',
  orderId:"DKcRNc7XN",
  creationDate:"Aug 6, 2016",
  shipByDate:"Aug 12, 2016",
  status:"Shipment confirmed",
  units:1,
  payments:"$3.92",
  sku: "06F",
  // product: ObjectId('57b4bcf37a18a5b400923d75'),
  // customer: ObjectId('57b4bcf37a18a5b400923d73')
}, {
  // _id: '57b4bcf47a18a5b400923d79',
  orderId:"DplMb07cN",
  creationDate:"Aug 6, 2016",
  shipByDate:"Aug 12, 2016",
  status:"Unshipped",
  units:1,
  payments:"$6.78",
  sku: '12P',
  // product: ObjectId('57b4bcf37a18a5b400923d76'),
  // customer: ObjectId('57b4bcf37a18a5b400923d74')
},{
  // _id: '57b4bcf47a18a5b400923d7a',
  orderId:"DpTMbp7bN",
  creationDate:"Aug 6, 2016",
  shipByDate:"Aug 12, 2016",
  status:"Shipment confirmed",
  units:1,
  payments:"$3.92",
  sku: "06F",
  // product: '57b4bcf37a18a5b400923d77',
  // customer: '57b4bcf37a18a5b400923d74'
}];

exports.customers = [{
  // _id: '57b4bcf37a18a5b400923d73',
  name: 'Amazon Locker - Hannah',
  address: {
    street: '12355 15th Ave NE at 7-Eleven',
    city: 'Seattle',
    state: 'WA',
    zip: '98125-4819'
  },
  phone: "2064985471"
},{ 
  // _id: '57b4bcf37a18a5b400923d74',
  name: 'Amazon Locker - George',
  address: {
    street: '12355 15th Ave NE at 7-Eleven',
    city: 'Seattle',
    state: 'WA',
    zip: '98125-4819'
  },
  phone: "2064985468"
}];

exports.lots = [{
  created: "Aug 11, 2016",
  shipped: "Aug 12, 2016",
  shipments: []
}];

exports.products = [{
  // _id: '57b4bcf37a18a5b400923d77',
  name: 'Finess Softpatch for Stress Incontinence',
  upc: '860507000213',
  asin: 'B01438A52M'
}, {
  // _id: '57b4bcf37a18a5b400923d76',
  name: 'Finess Softpatch for Stress Incontinence',
  upc: '860507000206',
  asin: 'B013TT27TA'
}, {
  // _id: '57b4bcf37a18a5b400923d75',
  name: 'Finess Softpatch for Stress Incontinence',
  upc: '860507000220',
  asin: 'B01DEDVJLI'
}];

// Join all address fields of customers
exports.customers = exports.customers.map(function(customer) {
  var addr = customer.address, lines = [];
  lines.push(addr.street);
  lines.push(addr.city + ', ' + addr.state + ' ' + addr.zip);
  
  customer.address = lines.join('\n');
  return customer;
})

if ('development' === env || 'test' === env) {
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
        popProducts();
      }
    });
  });

  function popProducts() {
    Product.find({}).remove(function () {
      Product.create(exports.products, function (err) {
        if (err) {
          console.error('Error while populating products: %s', err);
        } else {
          console.log('finished populating products');
          popShipments();
        }
      });
    });
  }

  function popShipments() {
    Shipment.find({}).remove(function () {
      Customer.find({}).exec().then(function(customers) {
        exports.shipments.forEach(function (shipment, i) {
          shipment.customer = customers[i%2]['_id'];
        })
        Product.find({}).exec().then(function(products) {
          exports.shipments.forEach(function (shipment, i) {
            shipment.product = products[i%3]['_id'];
          })
          Shipment.create(exports.shipments, function (err) {
            if (err) {
              console.error('Error while populating shipments: %s', err);
            } else {
              console.log('finished populating shipments');
              popLots();
            }
          });
        });
      })
    });
  }
  function popLots() {
    Lot.find({}).remove(function () {
      Shipment.find({}).exec().then(function(shipments) {
        // console.log('in popLots, shipments: ' + JSON.stringify(shipments))
        exports.lots.forEach(function (lot, i) {
          lot.shipments.push(shipments[0]['_id']);
          lot.shipments.push(shipments[2]['_id']);
          // console.log('created lot shipments: ' + JSON.stringify(lot.shipments))
        })
        Lot.create(exports.lots, function (err) {
          if (err) {
            console.error('Error while populating lots: %s', err);
          } else {
            console.log('finished populating lots');
          }
        });
      })
    });
  }
}
