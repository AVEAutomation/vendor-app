(function () {
  'use strict';

  /**
   * Register the list controller as ShipmentListController
   */
  angular
    .module('vendorAppApp.shipment.list')
    .controller('ShipmentListController', ShipmentListController);

  // add ShipmentListController dependencies to inject
  ShipmentListController.$inject = ['$scope', 'socket', '$state', 'shipments', 'ToggleComponent'];

  /**
   * ShipmentListController constructor
   *
   * @param {Object} $scope - The current scope
   * @param {Object} socket - The socket service to register to
   * @param {$state} $state - The $state to activate routing states on
   * @param {Array} shipments - The list of shipments resolved for this route
   * @param {Service} ToggleComponent - The service for switching the detail view
   */
  function ShipmentListController($scope, socket, $state, shipments, ToggleComponent) {
    var vm = this;

    // the array of shipments
    vm.shipments = shipments;
    // toggle detail view
    vm.toggleDetails = toggleDetails;

    // initialize the controller
    activate();

    /**
     * Register socket updates and unsync on scope $destroy event
     */
    function activate() {
      socket.syncUpdates('shipment', vm.shipments);
      $scope.$on('$destroy', unsyncShipmentUpdates);

      function unsyncShipmentUpdates() {
        socket.unsyncUpdates('shipment');
      }
    }

    /**
     * Toggle the detail view
     */
    function toggleDetails() {
      ToggleComponent('shipment.detailView').toggle();
    }
  }

})();
