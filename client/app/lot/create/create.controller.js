/**
 * @ngdoc controller
 * @name vendorAppApp.lot.create.controller:LotCreateController
 * @description
 * Controller of the lot create page of the admin section
 */

(function () {
  'use strict';

  /**
   * Register the create controller as LotCreateController
   */

  angular
    .module('vendorAppApp.lot.create')
    .controller('LotCreateController', LotCreateController);

  /**
   * @ngdoc function
   * @name vendorAppApp.lot.create.provider:LotCreateController
   * @description
   * Provider of the {@link vendorAppApp.lot.create.controller:LotCreateController LotCreateController}
   *
   * @param {Service} Auth The Auth service to use
   * @param {Service} $mdDialog The mdDialog service to use
   * @param {Service} Lot The Lot resource
   * @param {Service} LotService The Lot service to use
   * @param {Service} LotDefinition The model definition of Lot resource
   * @param {Service} Toast The Toast service to use
   * @returns {Service} {@link vendorAppApp.lot.create.controller:LotCreateController LotCreateController}
   */

  LotCreateController.$inject = ['$mdDialog', 'Lot', 'LotService', 'LotDefinition', 'Toast'];

  function LotCreateController($mdDialog, Lot, LotService, LotDefinition, Toast) {
    var vm = this;

    /**
     * @ngdoc property
     * @name lot
     * @propertyOf vendorAppApp.lot.create.controller:LotCreateController
     * @description
     * The new lot data
     *
     * @returns {Object} The lot data
     */
    vm.lot = new Lot();
    vm.lotDefinition = LotDefinition;

    // view model bindings (documented below)
    vm.create = createLot;
    vm.close = hideDialog;
    vm.cancel = cancelDialog;

    /**
     * @ngdoc function
     * @name createLot
     * @methodOf vendorAppApp.lot.create.controller:LotCreateController
     * @description
     * Create a new lot by using the LotService create method
     *
     * @param {form} [form] The form to gather the information from
     */
    function createLot(form) {
      // refuse to work with invalid data
      if (vm.lot._id || (form && !form.$valid)) {
        return;
      }

      LotService.create(vm.lot)
        .then(createLotSuccess)
        .catch(createLotCatch);

      function createLotSuccess(newLot) {
        Toast.show({
          type: 'success',
          text: 'Lot ' + newLot.name + ' has been created',
          link: {state: 'lot.list.detail', params: {id: newLot._id}}
        });
        vm.close();
      }

      function createLotCatch(err) {
        if (form && err) {
          form.setResponseErrors(err);
        }

        Toast.show({
          type: 'warn',
          text: 'Error while creating a new Lot'
        });
      }
    }

    /**
     * @ngdoc function
     * @name hide
     * @methodOf vendorAppApp.lot.create.controller:LotCreateController
     * @description
     * Hide the dialog
     */
    function hideDialog() {
      $mdDialog.hide();
    }

    /**
     * @ngdoc function
     * @name cancel
     * @methodOf vendorAppApp.lot.create.controller:LotCreateController
     * @description
     * Cancel the dialog
     */
    function cancelDialog() {
      $mdDialog.cancel();
    }
  }
})();
