/**
 * @ngdoc controller
 * @name vendorAppApp.customer.create.controller:CustomerCreateController
 * @description
 * Controller of the customer create page of the admin section
 */

(function () {
  'use strict';

  /**
   * Register the create controller as CustomerCreateController
   */

  angular
    .module('vendorAppApp.customer.create')
    .controller('CustomerCreateController', CustomerCreateController);

  /**
   * @ngdoc function
   * @name vendorAppApp.customer.create.provider:CustomerCreateController
   * @description
   * Provider of the {@link vendorAppApp.customer.create.controller:CustomerCreateController CustomerCreateController}
   *
   * @param {Service} Auth The Auth service to use
   * @param {Service} $mdDialog The mdDialog service to use
   * @param {Service} Customer The Customer resource
   * @param {Service} CustomerService The Customer service to use
   * @param {Service} CustomerDefinition The model definition of Customer resource
   * @param {Service} Toast The Toast service to use
   * @returns {Service} {@link vendorAppApp.customer.create.controller:CustomerCreateController CustomerCreateController}
   */

  CustomerCreateController.$inject = ['$mdDialog', 'Customer', 'CustomerService', 'CustomerDefinition', 'Toast'];

  function CustomerCreateController($mdDialog, Customer, CustomerService, CustomerDefinition, Toast) {
    var vm = this;

    /**
     * @ngdoc property
     * @name customer
     * @propertyOf vendorAppApp.customer.create.controller:CustomerCreateController
     * @description
     * The new customer data
     *
     * @returns {Object} The customer data
     */
    vm.customer = new Customer();
    vm.customerDefinition = CustomerDefinition;

    // view model bindings (documented below)
    vm.create = createCustomer;
    vm.close = hideDialog;
    vm.cancel = cancelDialog;

    /**
     * @ngdoc function
     * @name createCustomer
     * @methodOf vendorAppApp.customer.create.controller:CustomerCreateController
     * @description
     * Create a new customer by using the CustomerService create method
     *
     * @param {form} [form] The form to gather the information from
     */
    function createCustomer(form) {
      // refuse to work with invalid data
      if (vm.customer._id || (form && !form.$valid)) {
        return;
      }

      CustomerService.create(vm.customer)
        .then(createCustomerSuccess)
        .catch(createCustomerCatch);

      function createCustomerSuccess(newCustomer) {
        Toast.show({
          type: 'success',
          text: 'Customer ' + newCustomer.name + ' has been created',
          link: {state: 'customer.list.detail', params: {id: newCustomer._id}}
        });
        vm.close();
      }

      function createCustomerCatch(err) {
        if (form && err) {
          form.setResponseErrors(err);
        }

        Toast.show({
          type: 'warn',
          text: 'Error while creating a new Customer'
        });
      }
    }

    /**
     * @ngdoc function
     * @name hide
     * @methodOf vendorAppApp.customer.create.controller:CustomerCreateController
     * @description
     * Hide the dialog
     */
    function hideDialog() {
      $mdDialog.hide();
    }

    /**
     * @ngdoc function
     * @name cancel
     * @methodOf vendorAppApp.customer.create.controller:CustomerCreateController
     * @description
     * Cancel the dialog
     */
    function cancelDialog() {
      $mdDialog.cancel();
    }
  }
})();
