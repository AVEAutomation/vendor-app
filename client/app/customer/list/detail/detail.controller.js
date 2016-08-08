(function () {
  'use strict';

  /**
   * Register the edit controller as CustomerDetailController
    */

  angular
    .module('vendorAppApp.customer.list.detail')
    .controller('CustomerDetailController', CustomerDetailController);

  // add CustomerDetailController dependencies to inject
  CustomerDetailController.$inject = ['$state', 'customer'];

  /**
   * CustomerDetailController constructor
   */
  function CustomerDetailController($state, customer) {
    var vm = this;

    // the current customer to display
    vm.customer = customer;
    // switch to the edit state
    vm.edit = edit;
    // switch to the parent state
    vm.goBack = goBack

    /**
     * Open the edit state with the current customer
     *
     */
    function edit() {
      $state.go('^.edit', {'id': vm.customer._id});
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
