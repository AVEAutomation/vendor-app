(function () {
  'use strict';

  /**
   * Register the list controller as ShipmentMainController
   */

  angular
    .module('vendorAppApp.shipment.main')
    .controller('ShipmentMainController', ShipmentMainController);

  // add ShipmentMainController dependencies to inject
  ShipmentMainController.$inject = ['$state'];

  /**
   * ShipmentMainController constructor
   */
  function ShipmentMainController($state) {
    var vm = this;
    // switch to the list state
    vm.showList = showList;
    vm.title = 'Shipments'
    /**
     * Activate the shipment.list state
     */
    function showList() {
      $state.go('shipment.list');
    }
  }

})();
