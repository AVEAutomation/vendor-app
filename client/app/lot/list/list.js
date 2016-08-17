(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.lot.list module
   * and configure it.
   * @requires ui.router
   * @requires ngMaterial
   * @requires vendorAppApp.socket
   * @requires vendorAppApp.mainMenu,
   * @requires vendorAppApp.toggleComponent,
   * @requires vendorAppApp.lot.list.detail
   * @requires vendorAppApp.lot.list.edit
   * @requires vendorAppApp.lot.list.items
   */

  angular
    .module('vendorAppApp.lot.list', [
      'ngMaterial',
      'ui.router',
      'vendorAppApp.socket',
      'vendorAppApp.mainMenu',
      'vendorAppApp.toggleComponent',
      'vendorAppApp.lot.list.detail',
      'vendorAppApp.lot.list.edit',
      'vendorAppApp.lot.list.items'
    ])
    .config(configLotListRoutes);

  // inject configLotListRoutes dependencies
  configLotListRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the lot.list state with the list template fpr the
   * 'main' view paired with the LotListController as 'list'.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configLotListRoutes($stateProvider, mainMenuProvider) {
    // The list state configuration
    var listState = {
      name: 'lot.list',
      parent: 'lot',
      url: '/list',
      authenticate: true,
      role: 'user',
      resolve: {
        lots:  resolveLots
      },
      views: {

        // target the unnamed view in the lot state
        '@lot': {
          templateUrl: 'app/lot/list/list.html',
          controller: 'LotListController',
          controllerAs: 'list'
        },

        // target the content view in the lot.list state
        'content@lot.list': {
          templateUrl: 'app/lot/list/items/items.html',
          controller: 'LotItemsController',
          controllerAs: 'items'
        }
      }
    };

    $stateProvider.state(listState);

    mainMenuProvider.addSubMenuItem('lot.main', {
      name: 'Lots List',
      state: listState.name
    });
  }

  // inject resolveLots dependencies
  resolveLots.$inject = ['Lot'];

  /**
   * Resolve dependencies for the lot.list state
   *
   * @params {Lot} Lot - The service to query lots
   * @returns {Promise} A promise that, when fullfilled, returns an array of lots
   */
  function resolveLots(Lot) {
    return Lot.query().$promise;
  }

})();
