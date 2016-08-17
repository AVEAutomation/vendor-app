(function () {
  'use strict';

  /**
   * Register the list controller as ProductListController
   */
  angular
    .module('vendorAppApp.product.list')
    .controller('ProductListController', ProductListController);

  // add ProductListController dependencies to inject
  ProductListController.$inject = ['$scope', 'socket', '$state', 'products', 'ToggleComponent'];

  /**
   * ProductListController constructor
   *
   * @param {Object} $scope - The current scope
   * @param {Object} socket - The socket service to register to
   * @param {$state} $state - The $state to activate routing states on
   * @param {Array} products - The list of products resolved for this route
   * @param {Service} ToggleComponent - The service for switching the detail view
   */
  function ProductListController($scope, socket, $state, products, ToggleComponent) {
    var vm = this;

    // the array of products
    vm.products = products;
    // toggle detail view
    vm.toggleDetails = toggleDetails;

    // initialize the controller
    activate();

    /**
     * Register socket updates and unsync on scope $destroy event
     */
    function activate() {
      socket.syncUpdates('product', vm.products);
      $scope.$on('$destroy', unsyncProductUpdates);

      function unsyncProductUpdates() {
        socket.unsyncUpdates('product');
      }
    }

    /**
     * Toggle the detail view
     */
    function toggleDetails() {
      ToggleComponent('product.detailView').toggle();
    }
  }

})();
