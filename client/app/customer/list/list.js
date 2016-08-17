(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.customer.list module
   * and configure it.
   * @requires ui.router
   * @requires ngMaterial
   * @requires vendorAppApp.socket
   * @requires vendorAppApp.mainMenu,
   * @requires vendorAppApp.toggleComponent,
   * @requires vendorAppApp.customer.list.detail
   * @requires vendorAppApp.customer.list.edit
   * @requires vendorAppApp.customer.list.items
   */

  angular
    .module('vendorAppApp.customer.list', [
      'ngMaterial',
      'ui.router',
      'vendorAppApp.socket',
      'vendorAppApp.mainMenu',
      'vendorAppApp.toggleComponent',
      'vendorAppApp.customer.list.detail',
      'vendorAppApp.customer.list.edit',
      'vendorAppApp.customer.list.items'
    ])
    .config(configCustomerListRoutes);

  // inject configCustomerListRoutes dependencies
  configCustomerListRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the customer.list state with the list template fpr the
   * 'main' view paired with the CustomerListController as 'list'.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configCustomerListRoutes($stateProvider, mainMenuProvider) {
    // The list state configuration
    var listState = {
      name: 'customer.list',
      parent: 'customer',
      url: '/list',
      authenticate: true,
      role: 'user',
      resolve: {
        customers:  resolveCustomers
      },
      views: {

        // target the unnamed view in the customer state
        '@customer': {
          templateUrl: 'app/customer/list/list.html',
          controller: 'CustomerListController',
          controllerAs: 'list'
        },

        // target the content view in the customer.list state
        'content@customer.list': {
          templateUrl: 'app/customer/list/items/items.html',
          controller: 'CustomerItemsController',
          controllerAs: 'items'
        }
      }
    };

    $stateProvider.state(listState);

    mainMenuProvider.addSubMenuItem('customer.main', {
      name: 'Customers List',
      state: listState.name
    });
  }

  // inject resolveCustomers dependencies
  resolveCustomers.$inject = ['Customer'];

  /**
   * Resolve dependencies for the customer.list state
   *
   * @params {Customer} Customer - The service to query customers
   * @returns {Promise} A promise that, when fullfilled, returns an array of customers
   */
  function resolveCustomers(Customer) {
    return Customer.query().$promise;
  }

})();
