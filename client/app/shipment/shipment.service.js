(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.shipment.service module.
   * Register the shipment resource as Shipment, register the
   * service as ShipmentService.
   *
   * @requires {vendorAppApp.resource}
   */
  angular
    .module('vendorAppApp.shipment.service', ['vendorAppApp.resource'])
    .factory('Shipment', Shipment)
    .service('ShipmentService', ShipmentService)
    .factory('ShipmentDefinition', ShipmentDefinition);

  // add Shipment dependencies to inject
  Shipment.$inject = ['Resource'];

  /**
   * Shipment resource constructor
   */
  function Shipment($resource) {
    // factory members
    var apiURL = '/api/shipments';
    // public API
    return $resource(apiURL + '/:id/:controller');
  }

  // add ShipmentService dependencies to inject
  ShipmentService.$inject = ['Shipment'];

  /**
   * ShipmentService constructor
   * AngularJS will instantiate a singleton by calling "new" on this function
   *
   * @param {$resource} Shipment The resource provided by vendorAppApp.shipment.resource
   * @returns {Object} The service definition for the ShipmentService service
   */
  function ShipmentService(Shipment) {

    return {
      // create: create,
      update: update,
      remove: remove
    };

    /**
     * Create a new shipment
     *
     * @param  {Object}   shipment - shipmentData
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function create(shipment, callback) {
      var cb = callback || angular.noop;

      return Shipment.create(shipment,
        function (shipment) {
          return cb(shipment);
        },
        function (err) {
          return cb(err);
        }).$promise;
    }

    /**
     * Remove a shipment
     *
     * @param  {Object}   shipment - shipmentData
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function remove(shipment, callback) {
      var cb = callback || angular.noop;

      return Shipment.remove({id: shipment._id},
        function (shipment) {
          return cb(shipment);
        },
        function (err) {
          return cb(err);
        }).$promise;
    }

    /**
     * Create a new shipment
     *
     * @param  {Object}   shipment - shipmentData
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function update(shipment, callback) {
      var cb = callback || angular.noop;

      return Shipment.update(shipment,
        function (shipment) {
          return cb(shipment);
        },
        function (err) {
          return cb(err);
        }).$promise;
    }
  };

  // add ShipmentDefinition dependencies to inject
  ShipmentDefinition.$inject = ['ModelDefinitions', 'Customer', 'Product'];
  function ShipmentDefinition (ModelDefinitions, Customer, Product) {
    return ModelDefinitions.flat({
      orderId: {type: 'text', required: true},
      creationDate: 'date',
      shipByDate: 'date',
      // TODO: check if this is okay for text enum
      status: {
        type: 'select', 
        options: ['Unshipped', 'Shipment confirmed', 'Canceled',
    'Delivered', 'Paid']
      },
      units: 'number',
      payments: 'number',
      sku: 'text',
      product: {
        name: {type: 'text', displayPriority: 'low'},
        sku: 'text',
        asin: 'text'
      },
      customer: {
        name: 'text',
        address: {
          street: {type: 'text', displayPriority: 'low'},
          city: {type: 'text', displayPriority: 'low'},
          state: {type: 'text', displayPriority: 'low'},
          zip: {type: 'text', displayPriority: 'low'},
        },
        phone: {type: 'text', displayPriority: 'low'},
      }
    });
  }
})();
