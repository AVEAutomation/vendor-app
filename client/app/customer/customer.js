(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.customer module
   * and configure it.
   *
   * @requires ui.router
   * @requires ngResource
   * @requires vendorAppApp.customer.main
   * @requires vendorAppApp.customer.list
   * @requires vendorAppApp.customer.create
   */
  angular
    .module('vendorAppApp.customer', [
      'ngResource',
      'ui.router',
      'vendorAppApp.customer.main',
      'vendorAppApp.customer.list',
      'vendorAppApp.customer.create'
    ])
    .config(configCustomerRoutes);

  // inject configCustomerRoutes dependencies
  configCustomerRoutes.$inject = ['$urlRouterProvider', '$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the abstract customer state with the customer template
   * paired with the CustomerController as 'index'.
   * The injectable 'customers' is resolved as a list of all customers
   * and can be injected in all sub controllers.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configCustomerRoutes($urlRouterProvider, $stateProvider) {
    // The customer state configuration
    var customerState = {
      name: 'customer',
      url: '/customer',
      abstract: true,
      templateUrl: 'app/customer/customer.html',
      controller: 'CustomerController',
      controllerAs: 'index'
    };

    $urlRouterProvider.when('/customer', '/customer/');
    $stateProvider.state(customerState);
  }

})();
