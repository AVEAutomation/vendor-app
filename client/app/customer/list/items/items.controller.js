(function () {
  'use strict';

  /**
   * Register the list controller as CustomerItemsController
   */

  angular
    .module('vendorAppApp.customer.list.items')
    .controller('CustomerItemsController', CustomerItemsController);

  // add CustomerItemsController dependencies to inject
  CustomerItemsController.$inject = ['$state'];

  /**
   * CustomerItemsController constructor
   */
  function CustomerItemsController($state) {
    var vm = this;

    // the selected item id
    var curCustomerId = null;

    // check if this item is selected
    vm.isSelected = isSelected;
    // switch to the detail state
    vm.showInDetails = showInDetails;

    /**
     * Check if the passed item is the current selected item
     *
     * @param {Object} customer - The object to check for selection
     */
    function isSelected(customer) {
      return curCustomerId === customer._id;
    }

    /**
     * Open the detail state with the selected item
     *
     * @param {Object} customer - The customer to edit
     */
    function showInDetails(customer) {
      curCustomerId = customer._id;
      $state.go('customer.list.detail', {'id': curCustomerId});
    }
  }

})();
