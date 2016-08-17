(function () {
  'use strict';

  /**
   * Register the edit controller as ProductDetailController
    */

  angular
    .module('vendorAppApp.product.list.detail')
    .controller('ProductDetailController', ProductDetailController);

  // add ProductDetailController dependencies to inject
  ProductDetailController.$inject = ['$state', 'product'];

  /**
   * ProductDetailController constructor
   */
  function ProductDetailController($state, product) {
    var vm = this;

    // the current product to display
    vm.product = product;
    // switch to the edit state
    vm.edit = edit;
    // switch to the parent state
    vm.goBack = goBack

    /**
     * Open the edit state with the current product
     *
     */
    function edit() {
      $state.go('^.edit', {'id': vm.product._id});
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
