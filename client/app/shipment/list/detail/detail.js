(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.shipment.list.detail submodule
   * and configure it.
   *
   * @requires ui.router
   * @requires angularMoment
   */

  angular
    .module('vendorAppApp.shipment.list.detail', [
      'ui.router',
      'angularMoment'
    ])
    .config(configureShipmentListDetail);

  // inject configShipmentRoutes dependencies
  configureShipmentListDetail.$inject = ['$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the 'shipment.detail' state with the detail template
   * paired with the ShipmentDetailController as 'detail' for the
   * 'sidenav' sub view.
   * 'shipment' is resolved as the shipment with the id found in
   * the state parameters.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configureShipmentListDetail($stateProvider) {
    // The detail state configuration
    var detailState = {
      name: 'shipment.list.detail',
      parent: 'shipment.list',
      url: '/:id',
      authenticate: true,
      role: 'user',
      onEnter: onEnterShipmentListDetail,
      views: {
        'detail@shipment.list': {
          templateUrl: 'app\shipment\list\detail\detail.html',
          controller: 'ShipmentDetailController',
          controllerAs: 'detail',
          resolve: {shipment: resolveShipmentFromArray}
        }
      }
    };

    $stateProvider.state(detailState);
  }

  // inject onShipmentListDetailEnter dependencies
  onEnterShipmentListDetail.$inject = ['$timeout', 'ToggleComponent'];

  /**
   * Executed when entering the shipment.list.detail state. Open the component
   * registered with the component id 'shipment.detailView'.
   *
    * @params {$timeout} $timeout - The $timeout service to wait for view initialization
   * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
   */
  function onEnterShipmentListDetail($timeout, ToggleComponent) {
    $timeout(showDetails, 0, false);

    function showDetails() {
      ToggleComponent('shipment.detailView').open();
    }
  }

  // inject resolveShipmentFromArray dependencies
  resolveShipmentFromArray.$inject = ['shipments', '$stateParams', '_'];

  /**
   * Resolve dependencies for the shipment.detail state
   *
   * @params {Array} shipments - The array of shipments
   * @params {Object} $stateParams - The $stateParams to read the shipment id from
   * @returns {Object|null} The shipment whose value of the _id property equals $stateParams._id
   */
  function resolveShipmentFromArray(shipments, $stateParams, _) {
    return _.find(shipments, {'_id': $stateParams.id});
  }

})();
