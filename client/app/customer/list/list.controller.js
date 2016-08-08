(function () {
  'use strict';

  /**
   * Register the list controller as CustomerListController
   */
  angular
    .module('vendorAppApp.customer.list')
    .controller('CustomerListController', CustomerListController);

  // add CustomerListController dependencies to inject
  CustomerListController.$inject = ['$scope', 'socket', '$state', 'customers', 'ToggleComponent'];

  /**
   * CustomerListController constructor
   *
   * @param {Object} $scope - The current scope
   * @param {Object} socket - The socket service to register to
   * @param {$state} $state - The $state to activate routing states on
   * @param {Array} customers - The list of customers resolved for this route
   * @param {Service} ToggleComponent - The service for switching the detail view
   */
  function CustomerListController($scope, socket, $state, customers, ToggleComponent) {
    var vm = this;

    // the array of customers
    vm.customers = customers;
    // toggle detail view
    vm.toggleDetails = toggleDetails;

    // initialize the controller
    activate();

    /**
     * Register socket updates and unsync on scope $destroy event
     */
    function activate() {
      socket.syncUpdates('customer', vm.customers);
      $scope.$on('$destroy', unsyncCustomerUpdates);

      function unsyncCustomerUpdates() {
        socket.unsyncUpdates('customer');
      }
    }

    /**
     * Toggle the detail view
     */
    function toggleDetails() {
      ToggleComponent('customer.detailView').toggle();
    }
  }

})();
