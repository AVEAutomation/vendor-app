(function () {
  'use strict';

  /**
   * Register the list controller as ProductItemsController
   */

  angular
    .module('vendorAppApp.product.list.items')
    .controller('ProductItemsController', ProductItemsController);

  // add ProductItemsController dependencies to inject
  ProductItemsController.$inject = ['$state'];

  /**
   * ProductItemsController constructor
   */
  function ProductItemsController($state) {
    var vm = this;

    // the selected item id
    var curProductId = null;

    // check if this item is selected
    vm.isSelected = isSelected;
    // switch to the detail state
    vm.showInDetails = showInDetails;

    /**
     * Check if the passed item is the current selected item
     *
     * @param {Object} product - The object to check for selection
     */
    function isSelected(product) {
      return curProductId === product._id;
    }

    /**
     * Open the detail state with the selected item
     *
     * @param {Object} product - The product to edit
     */
    function showInDetails(product) {
      curProductId = product._id;
      $state.go('product.list.detail', {'id': curProductId});
    }
  }

})();
