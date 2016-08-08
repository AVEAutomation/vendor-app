(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.customer.main module
   * and configure it.
   *
   * @requires ui.router
   * @requires vendorAppApp.mainMenu
   */

  angular
    .module('vendorAppApp.customer.main', [
      'ui.router',
      'vendorAppApp.mainMenu'
    ])
    .config(configCustomerMainRoutes);

  // inject configCustomerMainRoutes dependencies
  configCustomerMainRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the customer.main state with the list template for the
   * 'main' view paired with the CustomerMainController as 'main'.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   * @param {mainMenuProvider} mainMenuProvider - The service to pass navigation information to
   */
  function configCustomerMainRoutes($stateProvider, mainMenuProvider) {
    // The main state configuration
    var mainState = {
      name: 'customer.main',
      parent: 'customer',
      url: '/',
      authenticate: true,
      role: 'user',
      views: {
        '@customer': {
          templateUrl: 'app\customer\main\main.html',
          controller: 'CustomerMainController',
          controllerAs: 'main'
        }
      }
    };

    $stateProvider.state(mainState);

    mainMenuProvider.addMenuItem({
      name: 'Customers',
      state: mainState.name,
      role: 'user'
    });
  }

})();
