(function () {
  'use strict';

  /**
   * Register the list controller as CustomerMainController
   */

  angular
    .module('vendorAppApp.customer.main')
    .controller('CustomerMainController', CustomerMainController);

  // add CustomerMainController dependencies to inject
  CustomerMainController.$inject = ['$state'];

  /**
   * CustomerMainController constructor
   */
  function CustomerMainController($state) {
    var vm = this;
    // switch to the list state
    vm.showList = showList;

    /**
     * Activate the customer.list state
     */
    function showList() {
      $state.go('customer.list');
    }
  }

})();
