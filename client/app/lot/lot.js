(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.lot module
   * and configure it.
   *
   * @requires ui.router
   * @requires ngResource
   * @requires vendorAppApp.lot.main
   * @requires vendorAppApp.lot.list
   * @requires vendorAppApp.lot.create
   */
  angular
    .module('vendorAppApp.lot', [
      'ngResource',
      'ui.router',
      'vendorAppApp.lot.main',
      'vendorAppApp.lot.list',
      'vendorAppApp.lot.create'
    ])
    .config(configLotRoutes);

  // inject configLotRoutes dependencies
  configLotRoutes.$inject = ['$urlRouterProvider', '$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the abstract lot state with the lot template
   * paired with the LotController as 'index'.
   * The injectable 'lots' is resolved as a list of all lots
   * and can be injected in all sub controllers.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configLotRoutes($urlRouterProvider, $stateProvider) {
    // The lot state configuration
    var lotState = {
      name: 'lot',
      url: '/lot',
      abstract: true,
      templateUrl: 'app\lot\lot.html',
      controller: 'LotController',
      controllerAs: 'index'
    };

    $urlRouterProvider.when('/lot', '/lot/');
    $stateProvider.state(lotState);
  }

})();
