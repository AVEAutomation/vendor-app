(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.lot.main module
   * and configure it.
   *
   * @requires ui.router
   * @requires vendorAppApp.mainMenu
   */

  angular
    .module('vendorAppApp.lot.main', [
      'ui.router',
      'vendorAppApp.mainMenu'
    ])
    .config(configLotMainRoutes);

  // inject configLotMainRoutes dependencies
  configLotMainRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the lot.main state with the list template for the
   * 'main' view paired with the LotMainController as 'main'.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   * @param {mainMenuProvider} mainMenuProvider - The service to pass navigation information to
   */
  function configLotMainRoutes($stateProvider, mainMenuProvider) {
    // The main state configuration
    var mainState = {
      name: 'lot.main',
      parent: 'lot',
      url: '/',
      authenticate: true,
      role: 'user',
      views: {
        '@lot': {
          templateUrl: 'app\lot\main\main.html',
          controller: 'LotMainController',
          controllerAs: 'main'
        }
      }
    };

    $stateProvider.state(mainState);

    mainMenuProvider.addMenuItem({
      name: 'Lots',
      state: mainState.name,
      role: 'user'
    });
  }

})();
