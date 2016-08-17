(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.product module
   * and configure it.
   *
   * @requires ui.router
   * @requires ngResource
   * @requires vendorAppApp.product.main
   * @requires vendorAppApp.product.list
   * @requires vendorAppApp.product.create
   */
  angular
    .module('vendorAppApp.product', [
      'ngResource',
      'ui.router',
      'vendorAppApp.product.main',
      'vendorAppApp.product.list',
      'vendorAppApp.product.create'
    ])
    .config(configProductRoutes);

  // inject configProductRoutes dependencies
  configProductRoutes.$inject = ['$urlRouterProvider', '$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the abstract product state with the product template
   * paired with the ProductController as 'index'.
   * The injectable 'products' is resolved as a list of all products
   * and can be injected in all sub controllers.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configProductRoutes($urlRouterProvider, $stateProvider) {
    // The product state configuration
    var productState = {
      name: 'product',
      url: '/product',
      abstract: true,
      templateUrl: 'app/product/product.html',
      controller: 'ProductController',
      controllerAs: 'index'
    };

    $urlRouterProvider.when('/product', '/product/');
    $stateProvider.state(productState);
  }

})();
