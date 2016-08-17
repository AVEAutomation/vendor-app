(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.product.service module.
   * Register the product resource as Product, register the
   * service as ProductService.
   *
   * @requires {vendorAppApp.resource}
   */
  angular
    .module('vendorAppApp.product.service', ['vendorAppApp.resource'])
    .factory('Product', Product)
    .service('ProductService', ProductService)
    .factory('ProductDefinition', ProductDefinition);

  // add Product dependencies to inject
  Product.$inject = ['Resource'];

  /**
   * Product resource constructor
   */
  function Product($resource) {
    // factory members
    var apiURL = '/api/products';
    // public API
    return $resource(apiURL + '/:id/:controller');
  }

  // add ProductService dependencies to inject
  ProductService.$inject = ['Product'];

  /**
   * ProductService constructor
   * AngularJS will instantiate a singleton by calling "new" on this function
   *
   * @param {$resource} Product The resource provided by vendorAppApp.product.resource
   * @returns {Object} The service definition for the ProductService service
   */
  function ProductService(Product) {

    return {
      create: create,
      update: update,
      remove: remove
    };

    /**
     * Save a new product
     *
     * @param  {Object}   product - productData
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function create(product, callback) {
      var cb = callback || angular.noop;

      return Product.create(product,
        function (product) {
          return cb(product);
        },
        function (err) {
          return cb(err);
        }).$promise;
    }

    /**
     * Remove a product
     *
     * @param  {Object}   product - productData
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function remove(product, callback) {
      var cb = callback || angular.noop;

      return Product.remove({id: product._id},
        function (product) {
          return cb(product);
        },
        function (err) {
          return cb(err);
        }).$promise;
    }

    /**
     * Create a new product
     *
     * @param  {Object}   product - productData
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function update(product, callback) {
      var cb = callback || angular.noop;

      return Product.update(product,
        function (product) {
          return cb(product);
        },
        function (err) {
          return cb(err);
        }).$promise;
    }
  };

  // add ProductDefinition dependencies to inject
  ProductDefinition.$inject = ['ModelDefinitions'];
  function ProductDefinition (ModelDefinitions) {
    return ModelDefinitions.flat({
      name: {type: 'text', required: true},
      upc: {type: 'text', required: true},
      asin: {type: 'text', required: true}
    });
  }
})();
