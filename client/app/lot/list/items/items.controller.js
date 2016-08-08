(function () {
  'use strict';

  /**
   * Register the list controller as LotItemsController
   */

  angular
    .module('vendorAppApp.lot.list.items')
    .controller('LotItemsController', LotItemsController);

  // add LotItemsController dependencies to inject
  LotItemsController.$inject = ['$state'];

  /**
   * LotItemsController constructor
   */
  function LotItemsController($state) {
    var vm = this;

    // the selected item id
    var curLotId = null;

    // check if this item is selected
    vm.isSelected = isSelected;
    // switch to the detail state
    vm.showInDetails = showInDetails;

    /**
     * Check if the passed item is the current selected item
     *
     * @param {Object} lot - The object to check for selection
     */
    function isSelected(lot) {
      return curLotId === lot._id;
    }

    /**
     * Open the detail state with the selected item
     *
     * @param {Object} lot - The lot to edit
     */
    function showInDetails(lot) {
      curLotId = lot._id;
      $state.go('lot.list.detail', {'id': curLotId});
    }
  }

})();
