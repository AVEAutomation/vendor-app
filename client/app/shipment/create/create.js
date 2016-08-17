(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.shipment.create module
   * and configure it.
   *
   * @requires ui.router
   * @requires ngMessages
   * @requires ngMaterial
   * @requires {vendorAppApp.mongooseError}
   * @requires {vendorAppApp.remoteUnique}
   * @requires {vendorAppApp.shipment.service}
   */

  angular
    .module('vendorAppApp.shipment.create', [
      'ui.router',
      'ngMessages',
      'ngMaterial',
      'vendorAppApp.mongooseError',
      'vendorAppApp.remoteUnique',
      'vendorAppApp.shipment.service'
    ])
    .config(configureShipmentCreateRoutes);

  // inject configShipment.CreateRoutes dependencies
  configureShipmentCreateRoutes.$inject = ['$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the 'shipment.list.create' state. The onEnterShipmentListCreateView
   * function will be called when entering the state and open a modal dialog
   * with the app/shipment/create/create.html template loaded.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configureShipmentCreateRoutes($stateProvider) {
    var  createListState = {
      name: 'shipment.list.create',
      parent: 'shipment.list',
      url: '/create',
      authenticate: true,
      role: 'user',
      onEnter: onEnterShipmentListCreateView
    };

    $stateProvider.state(createListState);
  }

  /**
   * Function that executes when entering the shipment.list.create state.
   * Open the create dialog
   */

  onEnterShipmentListCreateView.$inject = ['$rootScope', '$state', '$mdDialog'];

  function onEnterShipmentListCreateView($rootScope, $state, $mdDialog) {
    var unregisterListener = $rootScope.$on('$stateChangeStart', onStateChange);

    $mdDialog.show({
      controller: 'ShipmentCreateController',
      controllerAs: 'create',
      templateUrl: 'app/shipment/create/create.html',
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
      return $state.transitionTo('shipment.list');
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
