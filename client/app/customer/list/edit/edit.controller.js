/**
 * @ngdoc controller
 * @name vendorAppAppcustomer.list.edit.controller:CustomerEditController
 * @description
 * Controller of the customer edit page of the admin section
 */

(function () {
  'use strict';

  /**
   * Register the edit controller as CustomerEditController
   */

  angular
    .module('vendorAppApp.customer.list.edit')
    .controller('CustomerEditController', CustomerEditController);

  /**
   * @ngdoc function
   * @name vendorAppAppcustomer.list.edit.provider:CustomerEditController
   * @description
   * Provider of the {@link vendorAppAppcustomer.list.edit.controller:CustomerEditController CustomerEditController}
   * @param {Service} $state The state service to use
   * @param {Service} $stateParams The stateParams service to use
   * @param {Service} $mdDialog The dialog service to use
   * @param {Service} Toast The Toast service to use
   * @param {Service} CustomerService The CustomerService to use
   * @param {Resource} customer The customer data to use
   */

  CustomerEditController.$inject = ['$state', '$stateParams', '$mdDialog', 'Toast', 'CustomerService', 'customer'];

  function CustomerEditController($state, $stateParams, $mdDialog, Toast, CustomerService, customer) {
    var vm = this;

    // defaults
    vm.customer = angular.copy(customer, vm.customer);
    vm.displayName = customer.name;

    // view model bindings
    vm.update = update;
    vm.remove = remove;
    vm.goBack = goBack;
    vm.showList = showList;

    /**
     * Open the detail state with the current customer
     *
     */
    function goBack() {
      $state.go('^.detail', {id: vm.customer._id});
    }

    /**
     * Open the customer list state
     *
     */
    function showList() {
      $state.go('^');
    }
    /**
     * Updates a customer by using the CustomerService save method
     * @param {Form} [form]
     */
    function update(form) {
      // refuse to work with invalid data
      if (!vm.customer._id || form && !form.$valid) {
        return;
      }

      CustomerService.update(vm.customer)
        .then(updateCustomerSuccess)
        .catch(updateCustomerCatch);

      function updateCustomerSuccess(updatedCustomer) {
        // update the display name after successful save
        vm.displayName = updatedCustomer.name;
        Toast.show({text: 'Customer ' + vm.displayName + ' updated'});
        if (form) {
          form.$setPristine();
        }
      }

      function updateCustomerCatch(err) {
        Toast.show({
          type: 'warn',
          text: 'Error while updating Customer ' + vm.displayName,
          link: {state: $state.$current, params: $stateParams}
        });

        if (form && err) {
          form.setResponseErrors(err.data);
        }
      }
    }

    /**
     * Show a dialog to ask the customer if she wants to delete the current selected customer.
     * @param {AngularForm} form - The form to pass to the remove handler
     * @param {$event} ev - The event to pass to the dialog service
     */
    function remove(form, ev) {
      var confirm = $mdDialog.confirm()
        .title('Delete customer ' + vm.displayName + '?')
        .content('Do you really want to delete customer ' + vm.displayName + '?')
        .ariaLabel('Delete customer')
        .ok('Delete customer')
        .cancel('Cancel')
        .targetEvent(ev);

      $mdDialog.show(confirm)
        .then(performRemove);

      /**
       * Removes a customer by using the CustomerService remove method
       * @api private
       */
      function performRemove() {
        CustomerService.remove(vm.customer)
          .then(deleteCustomerSuccess)
          .catch(deleteCustomerCatch);

        function deleteCustomerSuccess() {
          Toast.show({type: 'success', text: 'Customer ' + vm.displayName + ' deleted'});
          vm.showList();
        }

        function deleteCustomerCatch(err) {
          Toast.show({
            type: 'warn',
            text: 'Error while deleting customer ' + vm.displayName,
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
