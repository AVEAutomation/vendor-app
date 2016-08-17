(function () {
  'use strict';

  /**
   * Register the list controller as ShipmentItemsController
   */

  angular
    .module('vendorAppApp.shipment.list.items')
    .controller('ShipmentItemsController', ShipmentItemsController);

  // add ShipmentItemsController dependencies to inject
  ShipmentItemsController.$inject = ['$state', '_'];

  /**
   * ShipmentItemsController constructor
   */
  function ShipmentItemsController($state, _) {
    var vm = this;

    // The title
    vm.title = 'Shipments List';
    // the selected item id
    var curShipmentId = null;
    var checkedShipmentIds = [];

    // check if this item is selected
    vm.isSelected = isSelected;
    // check this item for processing
    vm.toggleChecked = toggleChecked;
    // switch to the detail state
    vm.showInDetails = showInDetails;
    // get shipments gropued by SKU
    vm.groupBySKU = groupBySKU;




    /**
     * Check if the passed item is the current selected item
     *
     * @param {Object} shipment - The object to check for selection
     */
    function isSelected(shipment) {
      return curShipmentId === shipment._id;
      // return _.includes(curShipmentIds, shipment._id);
    }

    /**
     * Group the shipments by SKU.
     *
     * @param {[Object]} shipments - The objects to group
     */
    function groupBySKU(shipments) {
      return _.groupBy(shipments, 'sku');
    }    

    /**
     * Check if the passed item is in the list of checked items
     *
     * @param {Object} shipment - The object to check for selection
     */
    function isChecked(shipment) {
      return _.includes(checkedShipmentIds, shipment._id);
    }    

    /**
     * Check the given shipment
     *
     * @param {Object} shipment - The object to check
     */
    function toggleChecked(shipment) {
      var ndx = _.findIndex(checkedShipmentIds, shipment._id);
        
      if (shipment.isChecked) {
        // Add to checked array
        if (ndx < 0) {
          checkedShipmentIds.push(shipment._id);
        }
      } else {
        // Remove from checked array
        if (ndx > -1) {
          checkedShipmentIds.splice(ndx, 1);
        }
      }
    }    

    /**
     * Check all shipments for the given sku.
     *
     * @param {Object} sku - The sku to filter shipments to check
     */
    function checkSKU(shipment) {
      if (!_.includes(checkedShipmentIds, shipment._id)) {
        checkedShipmentIds.push(shipment._id);
      }
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
