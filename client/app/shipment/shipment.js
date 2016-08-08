(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.shipment module
   * and configure it.
   *
   * @requires ui.router
   * @requires ngResource
   * @requires vendorAppApp.shipment.main
   * @requires vendorAppApp.shipment.list
   * @requires vendorAppApp.shipment.create
   */
  angular
    .module('vendorAppApp.shipment', [
      'ngResource',
      'ui.router',
      'vendorAppApp.shipment.main',
      'vendorAppApp.shipment.list',
      'vendorAppApp.shipment.create'
    ])
    .config(configShipmentRoutes);

  // inject configShipmentRoutes dependencies
  configShipmentRoutes.$inject = ['$urlRouterProvider', '$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the abstract shipment state with the shipment template
   * paired with the ShipmentController as 'index'.
   * The injectable 'shipments' is resolved as a list of all shipments
   * and can be injected in all sub controllers.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configShipmentRoutes($urlRouterProvider, $stateProvider) {
    // The shipment state configuration
    var shipmentState = {
      name: 'shipment',
      url: '/shipment',
      abstract: true,
      templateUrl: 'app\shipment\shipment.html',
      controller: 'ShipmentController',
      controllerAs: 'index'
    };

    $urlRouterProvider.when('/shipment', '/shipment/');
    $stateProvider.state(shipmentState);
  }

})();
