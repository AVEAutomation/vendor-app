/**
 * @ngdoc controller
 * @name vendorAppApp.shipment.create.controller:ShipmentCreateController
 * @description
 * Controller of the shipment create page of the admin section
 */

(function () {
  'use strict';

  /**
   * Register the create controller as ShipmentCreateController
   */

  angular
    .module('vendorAppApp.shipment.create')
    .controller('ShipmentCreateController', ShipmentCreateController);

  /**
   * @ngdoc function
   * @name vendorAppApp.shipment.create.provider:ShipmentCreateController
   * @description
   * Provider of the {@link vendorAppApp.shipment.create.controller:ShipmentCreateController ShipmentCreateController}
   *
   * @param {Service} Auth The Auth service to use
   * @param {Service} $mdDialog The mdDialog service to use
   * @param {Service} Shipment The Shipment resource
   * @param {Service} ShipmentService The Shipment service to use
   * @param {Service} ShipmentDefinition The model definition of Shipment resource
   * @param {Service} Toast The Toast service to use
   * @returns {Service} {@link vendorAppApp.shipment.create.controller:ShipmentCreateController ShipmentCreateController}
   */

  ShipmentCreateController.$inject = ['$mdDialog', 'Shipment', 'ShipmentService', 'ShipmentDefinition', 'Toast'];

  function ShipmentCreateController($mdDialog, Shipment, ShipmentService, ShipmentDefinition, Toast) {
    var vm = this;

    /**
     * @ngdoc property
     * @name shipment
     * @propertyOf vendorAppApp.shipment.create.controller:ShipmentCreateController
     * @description
     * The new shipment data
     *
     * @returns {Object} The shipment data
     */
    vm.shipment = new Shipment();
    vm.shipmentDefinition = ShipmentDefinition;

    // view model bindings (documented below)
    vm.create = createShipment;
    vm.close = hideDialog;
    vm.cancel = cancelDialog;

    /**
     * @ngdoc function
     * @name createShipment
     * @methodOf vendorAppApp.shipment.create.controller:ShipmentCreateController
     * @description
     * Create a new shipment by using the ShipmentService create method
     *
     * @param {form} [form] The form to gather the information from
     */
    function createShipment(form) {
      // refuse to work with invalid data
      if (vm.shipment._id || (form && !form.$valid)) {
        return;
      }

      ShipmentService.create(vm.shipment)
        .then(createShipmentSuccess)
        .catch(createShipmentCatch);

      function createShipmentSuccess(newShipment) {
        Toast.show({
          type: 'success',
          text: 'Shipment ' + newShipment.name + ' has been created',
          link: {state: 'shipment.list.detail', params: {id: newShipment._id}}
        });
        vm.close();
      }

      function createShipmentCatch(err) {
        if (form && err) {
          form.setResponseErrors(err);
        }

        Toast.show({
          type: 'warn',
          text: 'Error while creating a new Shipment'
        });
      }
    }

    /**
     * @ngdoc function
     * @name hide
     * @methodOf vendorAppApp.shipment.create.controller:ShipmentCreateController
     * @description
     * Hide the dialog
     */
    function hideDialog() {
      $mdDialog.hide();
    }

    /**
     * @ngdoc function
     * @name cancel
     * @methodOf vendorAppApp.shipment.create.controller:ShipmentCreateController
     * @description
     * Cancel the dialog
     */
    function cancelDialog() {
      $mdDialog.cancel();
    }
  }
})();
