/**
 * @ngdoc controller
 * @name vendorAppApplot.list.edit.controller:LotEditController
 * @description
 * Controller of the lot edit page of the admin section
 */

(function () {
  'use strict';

  /**
   * Register the edit controller as LotEditController
   */

  angular
    .module('vendorAppApp.lot.list.edit')
    .controller('LotEditController', LotEditController);

  /**
   * @ngdoc function
   * @name vendorAppApplot.list.edit.provider:LotEditController
   * @description
   * Provider of the {@link vendorAppApplot.list.edit.controller:LotEditController LotEditController}
   * @param {Service} $state The state service to use
   * @param {Service} $stateParams The stateParams service to use
   * @param {Service} $mdDialog The dialog service to use
   * @param {Service} Toast The Toast service to use
   * @param {Service} LotService The LotService to use
   * @param {Resource} lot The lot data to use
   */

  LotEditController.$inject = ['$state', '$stateParams', '$mdDialog', 'Toast', 'LotService', 'lot'];

  function LotEditController($state, $stateParams, $mdDialog, Toast, LotService, lot) {
    var vm = this;

    // defaults
    vm.lot = angular.copy(lot, vm.lot);
    vm.displayName = lot.name;

    // view model bindings
    vm.update = update;
    vm.remove = remove;
    vm.goBack = goBack;
    vm.showList = showList;

    /**
     * Open the detail state with the current lot
     *
     */
    function goBack() {
      $state.go('^.detail', {id: vm.lot._id});
    }

    /**
     * Open the lot list state
     *
     */
    function showList() {
      $state.go('^');
    }
    /**
     * Updates a lot by using the LotService save method
     * @param {Form} [form]
     */
    function update(form) {
      // refuse to work with invalid data
      if (!vm.lot._id || form && !form.$valid) {
        return;
      }

      LotService.update(vm.lot)
        .then(updateLotSuccess)
        .catch(updateLotCatch);

      function updateLotSuccess(updatedLot) {
        // update the display name after successful save
        vm.displayName = updatedLot.name;
        Toast.show({text: 'Lot ' + vm.displayName + ' updated'});
        if (form) {
          form.$setPristine();
        }
      }

      function updateLotCatch(err) {
        Toast.show({
          type: 'warn',
          text: 'Error while updating Lot ' + vm.displayName,
          link: {state: $state.$current, params: $stateParams}
        });

        if (form && err) {
          form.setResponseErrors(err.data);
        }
      }
    }

    /**
     * Show a dialog to ask the lot if she wants to delete the current selected lot.
     * @param {AngularForm} form - The form to pass to the remove handler
     * @param {$event} ev - The event to pass to the dialog service
     */
    function remove(form, ev) {
      var confirm = $mdDialog.confirm()
        .title('Delete lot ' + vm.displayName + '?')
        .content('Do you really want to delete lot ' + vm.displayName + '?')
        .ariaLabel('Delete lot')
        .ok('Delete lot')
        .cancel('Cancel')
        .targetEvent(ev);

      $mdDialog.show(confirm)
        .then(performRemove);

      /**
       * Removes a lot by using the LotService remove method
       * @api private
       */
      function performRemove() {
        LotService.remove(vm.lot)
          .then(deleteLotSuccess)
          .catch(deleteLotCatch);

        function deleteLotSuccess() {
          Toast.show({type: 'success', text: 'Lot ' + vm.displayName + ' deleted'});
          vm.showList();
        }

        function deleteLotCatch(err) {
          Toast.show({
            type: 'warn',
            text: 'Error while deleting lot ' + vm.displayName,
            link: {state: $state.$current, params: $stateParams}
          });

          if (form && err) {
            form.setResponseErrors(err, vm.errors);
          }
        }
      }
    }
  }
})();
