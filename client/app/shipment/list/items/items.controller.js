(function () {
  'use strict';

  /**
   * Register the list controller as ShipmentItemsController
   */

  angular
    .module('vendorAppApp.shipment.list.items')
    .controller('ShipmentItemsController', ShipmentItemsController);

  // add ShipmentItemsController dependencies to inject
  ShipmentItemsController.$inject = ['$state'];

  /**
   * ShipmentItemsController constructor
   */
  function ShipmentItemsController($state) {
    var vm = this;

    // the selected item id
    var curShipmentId = null;

    // check if this item is selected
    vm.isSelected = isSelected;
    // switch to the detail state
    vm.showInDetails = showInDetails;

    /**
     * Check if the passed item is the current selected item
     *
     * @param {Object} shipment - The object to check for selection
     */
    function isSelected(shipment) {
      return curShipmentId === shipment._id;
    }

    /**
     * Open the detail state with the selected item
     *
     * @param {Object} shipment - The shipment to edit
     */
    function showInDetails(shipment) {
      curShipmentId = shipment._id;
      $state.go('shipment.list.detail', {'id': curShipmentId});
    }
  }

})();
