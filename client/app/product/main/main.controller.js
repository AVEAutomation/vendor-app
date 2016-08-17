(function () {
  'use strict';

  /**
   * Register the list controller as ProductMainController
   */

  angular
    .module('vendorAppApp.product.main')
    .controller('ProductMainController', ProductMainController);

  // add ProductMainController dependencies to inject
  ProductMainController.$inject = ['$state'];

  /**
   * ProductMainController constructor
   */
  function ProductMainController($state) {
    var vm = this;
    // switch to the list state
    vm.showList = showList;

    /**
     * Activate the product.list state
     */
    function showList() {
      $state.go('product.list');
    }
  }

})();
