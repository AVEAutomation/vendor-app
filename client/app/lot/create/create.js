(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.lot.create module
   * and configure it.
   *
   * @requires ui.router
   * @requires ngMessages
   * @requires ngMaterial
   * @requires {vendorAppApp.mongooseError}
   * @requires {vendorAppApp.remoteUnique}
   * @requires {vendorAppApp.lot.service}
   */

  angular
    .module('vendorAppApp.lot.create', [
      'ui.router',
      'ngMessages',
      'ngMaterial',
      'vendorAppApp.mongooseError',
      'vendorAppApp.remoteUnique',
      'vendorAppApp.lot.service'
    ])
    .config(configureLotCreateRoutes);

  // inject configLot.CreateRoutes dependencies
  configureLotCreateRoutes.$inject = ['$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the 'lot.list.create' state. The onEnterLotListCreateView
   * function will be called when entering the state and open a modal dialog
   * with the app/lot/create/create.html template loaded.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configureLotCreateRoutes($stateProvider) {
    var  createListState = {
      name: 'lot.list.create',
      parent: 'lot.list',
      url: '/create',
      authenticate: true,
      role: 'user',
      onEnter: onEnterLotListCreateView
    };

    $stateProvider.state(createListState);
  }

  /**
   * Function that executes when entering the lot.list.create state.
   * Open the create dialog
   */

  onEnterLotListCreateView.$inject = ['$rootScope', '$state', '$mdDialog'];

  function onEnterLotListCreateView($rootScope, $state, $mdDialog) {
    var unregisterListener = $rootScope.$on('$stateChangeStart', onStateChange);

    $mdDialog.show({
      controller: 'LotCreateController',
      controllerAs: 'create',
      templateUrl: 'app/lot/create/create.html',
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
      return $state.transitionTo('lot.list');
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
