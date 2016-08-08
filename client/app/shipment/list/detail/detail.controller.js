(function () {
  'use strict';

  /**
   * Register the edit controller as ShipmentDetailController
    */

  angular
    .module('vendorAppApp.shipment.list.detail')
    .controller('ShipmentDetailController', ShipmentDetailController);

  // add ShipmentDetailController dependencies to inject
  ShipmentDetailController.$inject = ['$state', 'shipment'];

  /**
   * ShipmentDetailController constructor
   */
  function ShipmentDetailController($state, shipment) {
    var vm = this;

    // the current shipment to display
    vm.shipment = shipment;
    // switch to the edit state
    vm.edit = edit;
    // switch to the parent state
    vm.goBack = goBack

    /**
     * Open the edit state with the current shipment
     *
     */
    function edit() {
      $state.go('^.edit', {'id': vm.shipment._id});
    }

    /**
     * Return to the parent state
     *
     */
    function goBack() {
      $state.go('^');
    }
  }
})();
