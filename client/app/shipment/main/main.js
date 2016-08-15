(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.shipment.main module
   * and configure it.
   *
   * @requires ui.router
   * @requires vendorAppApp.mainMenu
   */

  angular
    .module('vendorAppApp.shipment.main', [
      'ui.router',
      'vendorAppApp.mainMenu'
    ])
    .config(configShipmentMainRoutes);

  // inject configShipmentMainRoutes dependencies
  configShipmentMainRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the shipment.main state with the list template for the
   * 'main' view paired with the ShipmentMainController as 'main'.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   * @param {mainMenuProvider} mainMenuProvider - The service to pass navigation information to
   */
  function configShipmentMainRoutes($stateProvider, mainMenuProvider) {
    // The main state configuration
    var mainState = {
      name: 'shipment.main',
      parent: 'shipment',
      url: '/',
      authenticate: true,
      role: 'user',
      views: {
        '@shipment': {
          templateUrl: 'app/shipment/main/main.html',
          controller: 'ShipmentMainController',
          controllerAs: 'main'
        }
      }
    };

    $stateProvider.state(mainState);

    mainMenuProvider.addMenuItem({
      name: 'Shipments',
      state: mainState.name,
      role: 'user'
    });
  }

})();
