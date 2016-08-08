(function () {
  'use strict';

  /**
   * Register the list controller as LotMainController
   */

  angular
    .module('vendorAppApp.lot.main')
    .controller('LotMainController', LotMainController);

  // add LotMainController dependencies to inject
  LotMainController.$inject = ['$state'];

  /**
   * LotMainController constructor
   */
  function LotMainController($state) {
    var vm = this;
    // switch to the list state
    vm.showList = showList;

    /**
     * Activate the lot.list state
     */
    function showList() {
      $state.go('lot.list');
    }
  }

})();
