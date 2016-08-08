(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.lot.service module.
   * Register the lot resource as Lot, register the
   * service as LotService.
   *
   * @requires {vendorAppApp.resource}
   */
  angular
    .module('vendorAppApp.lot.service', ['vendorAppApp.resource'])
    .factory('Lot', Lot)
    .service('LotService', LotService)
    .factory('LotDefinition', LotDefinition);

  // add Lot dependencies to inject
  Lot.$inject = ['Resource'];

  /**
   * Lot resource constructor
   */
  function Lot($resource) {
    // factory members
    var apiURL = '/api/lots';
    // public API
    return $resource(apiURL + '/:id/:controller');
  }

  // add LotService dependencies to inject
  LotService.$inject = ['Lot'];

  /**
   * LotService constructor
   * AngularJS will instantiate a singleton by calling "new" on this function
   *
   * @param {$resource} Lot The resource provided by vendorAppApp.lot.resource
   * @returns {Object} The service definition for the LotService service
   */
  function LotService(Lot) {

    return {
      create: create,
      update: update,
      remove: remove
    };

    /**
     * Save a new lot
     *
     * @param  {Object}   lot - lotData
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function create(lot, callback) {
      var cb = callback || angular.noop;

      return Lot.create(lot,
        function (lot) {
          return cb(lot);
        },
        function (err) {
          return cb(err);
        }).$promise;
    }

    /**
     * Remove a lot
     *
     * @param  {Object}   lot - lotData
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function remove(lot, callback) {
      var cb = callback || angular.noop;

      return Lot.remove({id: lot._id},
        function (lot) {
          return cb(lot);
        },
        function (err) {
          return cb(err);
        }).$promise;
    }

    /**
     * Create a new lot
     *
     * @param  {Object}   lot - lotData
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function update(lot, callback) {
      var cb = callback || angular.noop;

      return Lot.update(lot,
        function (lot) {
          return cb(lot);
        },
        function (err) {
          return cb(err);
        }).$promise;
    }
  };

  // add LotDefinition dependencies to inject
  LotDefinition.$inject = ['ModelDefinitions'];
  function LotDefinition (ModelDefinitions) {
    return ModelDefinitions.flat({
      name: {type: 'text', required: true},
       info: 'text',
      // active: 'boolean'
    });
  }
})();
