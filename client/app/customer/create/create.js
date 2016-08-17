(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.customer.create module
   * and configure it.
   *
   * @requires ui.router
   * @requires ngMessages
   * @requires ngMaterial
   * @requires {vendorAppApp.mongooseError}
   * @requires {vendorAppApp.remoteUnique}
   * @requires {vendorAppApp.customer.service}
   */

  angular
    .module('vendorAppApp.customer.create', [
      'ui.router',
      'ngMessages',
      'ngMaterial',
      'vendorAppApp.mongooseError',
      'vendorAppApp.remoteUnique',
      'vendorAppApp.customer.service'
    ])
    .config(configureCustomerCreateRoutes);

  // inject configCustomer.CreateRoutes dependencies
  configureCustomerCreateRoutes.$inject = ['$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the 'customer.list.create' state. The onEnterCustomerListCreateView
   * function will be called when entering the state and open a modal dialog
   * with the app/customer/create/create.html template loaded.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configureCustomerCreateRoutes($stateProvider) {
    var  createListState = {
      name: 'customer.list.create',
      parent: 'customer.list',
      url: '/create',
      authenticate: true,
      role: 'user',
      onEnter: onEnterCustomerListCreateView
    };

    $stateProvider.state(createListState);
  }

  /**
   * Function that executes when entering the customer.list.create state.
   * Open the create dialog
   */

  onEnterCustomerListCreateView.$inject = ['$rootScope', '$state', '$mdDialog'];

  function onEnterCustomerListCreateView($rootScope, $state, $mdDialog) {
    var unregisterListener = $rootScope.$on('$stateChangeStart', onStateChange);

    $mdDialog.show({
      controller: 'CustomerCreateController',
      controllerAs: 'create',
      templateUrl: 'app/customer/create/create.html',
      clickOutsideToClose: false
    }).then(transitionTo, transitionTo);

    /**
     * Function executed when resolving or rejecting the
     * dialog promise.
     *
     * @param {*} answer - The result of the dialog callback
     * @returns {promise}
     */
    function transitionTo(answer) {
      return $state.transitionTo('customer.list');
    }

    /**
     * Function executed when changing the state.
     * Closes the create dialog
     */
    function onStateChange() {
      unregisterListener();
    }
  }

})();
