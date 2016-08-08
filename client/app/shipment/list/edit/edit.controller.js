/**
 * @ngdoc controller
 * @name vendorAppAppshipment.list.edit.controller:ShipmentEditController
 * @description
 * Controller of the shipment edit page of the admin section
 */

(function () {
  'use strict';

  /**
   * Register the edit controller as ShipmentEditController
   */

  angular
    .module('vendorAppApp.shipment.list.edit')
    .controller('ShipmentEditController', ShipmentEditController);

  /**
   * @ngdoc function
   * @name vendorAppAppshipment.list.edit.provider:ShipmentEditController
   * @description
   * Provider of the {@link vendorAppAppshipment.list.edit.controller:ShipmentEditController ShipmentEditController}
   * @param {Service} $state The state service to use
   * @param {Service} $stateParams The stateParams service to use
   * @param {Service} $mdDialog The dialog service to use
   * @param {Service} Toast The Toast service to use
   * @param {Service} ShipmentService The ShipmentService to use
   * @param {Resource} shipment The shipment data to use
   */

  ShipmentEditController.$inject = ['$state', '$stateParams', '$mdDialog', 'Toast', 'ShipmentService', 'shipment'];

  function ShipmentEditController($state, $stateParams, $mdDialog, Toast, ShipmentService, shipment) {
    var vm = this;

    // defaults
    vm.shipment = angular.copy(shipment, vm.shipment);
    vm.displayName = shipment.name;

    // view model bindings
    vm.update = update;
    vm.remove = remove;
    vm.goBack = goBack;
    vm.showList = showList;

    /**
     * Open the detail state with the current shipment
     *
     */
    function goBack() {
      $state.go('^.detail', {id: vm.shipment._id});
    }

    /**
     * Open the shipment list state
     *
     */
    function showList() {
      $state.go('^');
    }
    /**
     * Updates a shipment by using the ShipmentService save method
     * @param {Form} [form]
     */
    function update(form) {
      // refuse to work with invalid data
      if (!vm.shipment._id || form && !form.$valid) {
        return;
      }

      ShipmentService.update(vm.shipment)
        .then(updateShipmentSuccess)
        .catch(updateShipmentCatch);

      function updateShipmentSuccess(updatedShipment) {
        // update the display name after successful save
        vm.displayName = updatedShipment.name;
        Toast.show({text: 'Shipment ' + vm.displayName + ' updated'});
        if (form) {
          form.$setPristine();
        }
      }

      function updateShipmentCatch(err) {
        Toast.show({
          type: 'warn',
          text: 'Error while updating Shipment ' + vm.displayName,
          link: {state: $state.$current, params: $stateParams}
        });

        if (form && err) {
          form.setResponseErrors(err.data);
        }
      }
    }

    /**
     * Show a dialog to ask the shipment if she wants to delete the current selected shipment.
     * @param {AngularForm} form - The form to pass to the remove handler
     * @param {$event} ev - The event to pass to the dialog service
     */
    function remove(form, ev) {
      var confirm = $mdDialog.confirm()
        .title('Delete shipment ' + vm.displayName + '?')
        .content('Do you really want to delete shipment ' + vm.displayName + '?')
        .ariaLabel('Delete shipment')
        .ok('Delete shipment')
        .cancel('Cancel')
        .targetEvent(ev);

      $mdDialog.show(confirm)
        .then(performRemove);

      /**
       * Removes a shipment by using the ShipmentService remove method
       * @api private
       */
      function performRemove() {
        ShipmentService.remove(vm.shipment)
          .then(deleteShipmentSuccess)
          .catch(deleteShipmentCatch);

        function deleteShipmentSuccess() {
          Toast.show({type: 'success', text: 'Shipment ' + vm.displayName + ' deleted'});
          vm.showList();
        }

        function deleteShipmentCatch(err) {
          Toast.show({
            type: 'warn',
            text: 'Error while deleting shipment ' + vm.displayName,
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
