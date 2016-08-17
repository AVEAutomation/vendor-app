(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.lot.list.detail submodule
   * and configure it.
   *
   * @requires ui.router
   * @requires angularMoment
   */

  angular
    .module('vendorAppApp.lot.list.detail', [
      'ui.router',
      'angularMoment'
    ])
    .config(configureLotListDetail);

  // inject configLotRoutes dependencies
  configureLotListDetail.$inject = ['$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the 'lot.detail' state with the detail template
   * paired with the LotDetailController as 'detail' for the
   * 'sidenav' sub view.
   * 'lot' is resolved as the lot with the id found in
   * the state parameters.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configureLotListDetail($stateProvider) {
    // The detail state configuration
    var detailState = {
      name: 'lot.list.detail',
      parent: 'lot.list',
      url: '/:id',
      authenticate: true,
      role: 'user',
      onEnter: onEnterLotListDetail,
      views: {
        'detail@lot.list': {
          templateUrl: 'app/lot/list/detail/detail.html',
          controller: 'LotDetailController',
          controllerAs: 'detail',
          resolve: {lot: resolveLotFromArray}
        }
      }
    };

    $stateProvider.state(detailState);
  }

  // inject onLotListDetailEnter dependencies
  onEnterLotListDetail.$inject = ['$timeout', 'ToggleComponent'];

  /**
   * Executed when entering the lot.list.detail state. Open the component
   * registered with the component id 'lot.detailView'.
   *
    * @params {$timeout} $timeout - The $timeout service to wait for view initialization
   * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
   */
  function onEnterLotListDetail($timeout, ToggleComponent) {
    $timeout(showDetails, 0, false);

    function showDetails() {
      ToggleComponent('lot.detailView').open();
    }
  }

  // inject resolveLotFromArray dependencies
  resolveLotFromArray.$inject = ['lots', '$stateParams', '_'];

  /**
   * Resolve dependencies for the lot.detail state
   *
   * @params {Array} lots - The array of lots
   * @params {Object} $stateParams - The $stateParams to read the lot id from
   * @returns {Object|null} The lot whose value of the _id property equals $stateParams._id
   */
  function resolveLotFromArray(lots, $stateParams, _) {
    return _.find(lots, {'_id': $stateParams.id});
  }

})();
