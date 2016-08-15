(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.shipment.list.edit module
   * and configure it.
   *
   * @requires 'ui.router',
   * @requires 'ngMaterial',
   * @requires vendorAppApp.mongooseError
   * @requires vendorAppApp.shipment.service
   */

  angular
    .module('vendorAppApp.shipment.list.edit', [
      'ui.router',
      'ngMaterial',
      'vendorAppApp.mongooseError',
      'vendorAppApp.shipment.service'
    ])
    .config(configureShipmentListEdit);

  // inject configShipmentListEdit dependencies
  configureShipmentListEdit.$inject = ['$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the shipment.list.edit state with the edit template
   * paired with the ShipmentEditController as 'edit' for the
   * 'detail@shipment.list' view.
   * 'shipment' is resolved as the shipment with the id found in
   * the state parameters.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configureShipmentListEdit($stateProvider) {
    // The edit state configuration.
    var editState = {
      name: 'shipment.list.edit',
      parent: 'shipment.list',
      url: '/edit/:id',
      authenticate: true,
      role: 'user',
      onEnter: onEnterShipmentListEdit,
      views: {
        'detail@shipment.list': {
          templateUrl: 'app/shipment/list/edit/edit.html',
          controller: 'ShipmentEditController',
          controllerAs: 'edit',
          resolve: {shipment: resolveShipmentFromArray}
        }
      }
    };

    $stateProvider.state(editState);
  }

  // inject onShipmentListEditEnter dependencies
  onEnterShipmentListEdit.$inject = ['$timeout', 'ToggleComponent'];

  /**
   * Executed when entering the shipment.list.detail state. Open the component
   * registered with the component id 'shipment.detailView'.
   *
   * @params {$timeout} $timeout - The $timeout service to wait for view initialization
   * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
   */
  function onEnterShipmentListEdit($timeout, ToggleComponent) {
    $timeout(showDetails, 0, false);

    function showDetails() {
      ToggleComponent('shipment.detailView').open();
    }
  }

  // inject resolveShipmentDetailRoute dependencies
  resolveShipmentFromArray.$inject = ['shipments', '$stateParams', '_'];

  /**
   * Resolve dependencies for the shipment.list.edit state. Get the shipment
   * from the injected Array of shipments by using the '_id' property.
   *
   * @params {Array} shipments - The array of shipments
   * @params {Object} $stateParams - The $stateParams to read the shipment id from
   * @params {Object} _ - The lodash service to find the requested shipment
   * @returns {Object|null} The shipment whose value of the _id property equals $stateParams._id
   */
  function resolveShipmentFromArray(shipments, $stateParams, _) {
    //  return Shipment.get({id: $stateParams.id}).$promise;
    return _.find(shipments, {'_id': $stateParams.id});
  }

})();
