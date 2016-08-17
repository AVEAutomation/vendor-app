(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.product.main module
   * and configure it.
   *
   * @requires ui.router
   * @requires vendorAppApp.mainMenu
   */

  angular
    .module('vendorAppApp.product.main', [
      'ui.router',
      'vendorAppApp.mainMenu'
    ])
    .config(configProductMainRoutes);

  // inject configProductMainRoutes dependencies
  configProductMainRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the product.main state with the list template for the
   * 'main' view paired with the ProductMainController as 'main'.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   * @param {mainMenuProvider} mainMenuProvider - The service to pass navigation information to
   */
  function configProductMainRoutes($stateProvider, mainMenuProvider) {
    // The main state configuration
    var mainState = {
      name: 'product.main',
      parent: 'product',
      url: '/',
      authenticate: true,
      role: 'user',
      views: {
        '@product': {
          templateUrl: 'app/product/main/main.html',
          controller: 'ProductMainController',
          controllerAs: 'main'
        }
      }
    };

    $stateProvider.state(mainState);

    mainMenuProvider.addMenuItem({
      name: 'Products',
      state: mainState.name,
      role: 'user'
    });
  }

})();
