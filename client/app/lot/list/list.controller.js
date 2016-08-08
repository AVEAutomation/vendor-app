(function () {
  'use strict';

  /**
   * Register the list controller as LotListController
   */
  angular
    .module('vendorAppApp.lot.list')
    .controller('LotListController', LotListController);

  // add LotListController dependencies to inject
  LotListController.$inject = ['$scope', 'socket', '$state', 'lots', 'ToggleComponent'];

  /**
   * LotListController constructor
   *
   * @param {Object} $scope - The current scope
   * @param {Object} socket - The socket service to register to
   * @param {$state} $state - The $state to activate routing states on
   * @param {Array} lots - The list of lots resolved for this route
   * @param {Service} ToggleComponent - The service for switching the detail view
   */
  function LotListController($scope, socket, $state, lots, ToggleComponent) {
    var vm = this;

    // the array of lots
    vm.lots = lots;
    // toggle detail view
    vm.toggleDetails = toggleDetails;

    // initialize the controller
    activate();

    /**
     * Register socket updates and unsync on scope $destroy event
     */
    function activate() {
      socket.syncUpdates('lot', vm.lots);
      $scope.$on('$destroy', unsyncLotUpdates);

      function unsyncLotUpdates() {
        socket.unsyncUpdates('lot');
      }
    }

    /**
     * Toggle the detail view
     */
    function toggleDetails() {
      ToggleComponent('lot.detailView').toggle();
    }
  }

})();
