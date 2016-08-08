(function () {
  'use strict';

  /**
   * Register the edit controller as LotDetailController
    */

  angular
    .module('vendorAppApp.lot.list.detail')
    .controller('LotDetailController', LotDetailController);

  // add LotDetailController dependencies to inject
  LotDetailController.$inject = ['$state', 'lot'];

  /**
   * LotDetailController constructor
   */
  function LotDetailController($state, lot) {
    var vm = this;

    // the current lot to display
    vm.lot = lot;
    // switch to the edit state
    vm.edit = edit;
    // switch to the parent state
    vm.goBack = goBack

    /**
     * Open the edit state with the current lot
     *
     */
    function edit() {
      $state.go('^.edit', {'id': vm.lot._id});
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
