(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.shipment.list module
   * and configure it.
   * @requires ui.router
   * @requires ngMaterial
   * @requires vendorAppApp.socket
   * @requires vendorAppApp.mainMenu,
   * @requires vendorAppApp.toggleComponent,
   * @requires vendorAppApp.shipment.list.detail
   * @requires vendorAppApp.shipment.list.edit
   * @requires vendorAppApp.shipment.list.items
   */

  angular
    .module('vendorAppApp.shipment.list', [
      'ngMaterial',
      'ui.router',
      'vendorAppApp.socket',
      'vendorAppApp.mainMenu',
      'vendorAppApp.toggleComponent',
      'vendorAppApp.shipment.list.detail',
      'vendorAppApp.shipment.list.edit',
      'vendorAppApp.shipment.list.items'
    ])
    .config(configShipmentListRoutes);

  // inject configShipmentListRoutes dependencies
  configShipmentListRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the shipment.list state with the list template fpr the
   * 'main' view paired with the ShipmentListController as 'list'.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configShipmentListRoutes($stateProvider, mainMenuProvider) {
    // The list state configuration
    var listState = {
      name: 'shipment.list',
      parent: 'shipment',
      url: '/list',
      authenticate: true,
      role: 'user',
      resolve: {
        shipments:  resolveShipments
      },
      views: {

        // target the unnamed view in the shipment state
        '@shipment': {
          templateUrl: 'app/shipment/list/list.html',
          controller: 'ShipmentListController',
          controllerAs: 'list'
        },

        // target the content view in the shipment.list state
        'content@shipment.list': {
          templateUrl: 'app/shipment/list/items/items.html',
          controller: 'ShipmentItemsController',
          controllerAs: 'items'
        }
      }
    };

    $stateProvider.state(listState);

    mainMenuProvider.addSubMenuItem('shipment.main', {
      name: 'Shipments List',
      state: listState.name
    });
  }

  // inject resolveShipments dependencies
  resolveShipments.$inject = ['Shipment'];

  /**
   * Resolve dependencies for the shipment.list state
   *
   * @params {Shipment} Shipment - The service to query shipments
   * @returns {Promise} A promise that, when fullfilled, returns an array of shipments
   */
  function resolveShipments(Shipment) {
    return Shipment.query().$promise;
  }

})();
