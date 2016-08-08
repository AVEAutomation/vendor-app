(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.customer.service module.
   * Register the customer resource as Customer, register the
   * service as CustomerService.
   *
   * @requires {vendorAppApp.resource}
   */
  angular
    .module('vendorAppApp.customer.service', ['vendorAppApp.resource'])
    .factory('Customer', Customer)
    .service('CustomerService', CustomerService)
    .factory('CustomerDefinition', CustomerDefinition);

  // add Customer dependencies to inject
  Customer.$inject = ['Resource'];

  /**
   * Customer resource constructor
   */
  function Customer($resource) {
    // factory members
    var apiURL = '/api/customers';
    // public API
    return $resource(apiURL + '/:id/:controller');
  }

  // add CustomerService dependencies to inject
  CustomerService.$inject = ['Customer'];

  /**
   * CustomerService constructor
   * AngularJS will instantiate a singleton by calling "new" on this function
   *
   * @param {$resource} Customer The resource provided by vendorAppApp.customer.resource
   * @returns {Object} The service definition for the CustomerService service
   */
  function CustomerService(Customer) {

    return {
      create: create,
      update: update,
      remove: remove
    };

    /**
     * Save a new customer
     *
     * @param  {Object}   customer - customerData
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function create(customer, callback) {
      var cb = callback || angular.noop;

      return Customer.create(customer,
        function (customer) {
          return cb(customer);
        },
        function (err) {
          return cb(err);
        }).$promise;
    }

    /**
     * Remove a customer
     *
     * @param  {Object}   customer - customerData
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function remove(customer, callback) {
      var cb = callback || angular.noop;

      return Customer.remove({id: customer._id},
        function (customer) {
          return cb(customer);
        },
        function (err) {
          return cb(err);
        }).$promise;
    }

    /**
     * Create a new customer
     *
     * @param  {Object}   customer - customerData
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function update(customer, callback) {
      var cb = callback || angular.noop;

      return Customer.update(customer,
        function (customer) {
          return cb(customer);
        },
        function (err) {
          return cb(err);
        }).$promise;
    }
  };

  // add CustomerDefinition dependencies to inject
  CustomerDefinition.$inject = ['ModelDefinitions'];
  function CustomerDefinition (ModelDefinitions) {
    return ModelDefinitions.flat({
      name: {type: 'text', required: true},
       info: 'text',
      // active: 'boolean'
    });
  }
})();
