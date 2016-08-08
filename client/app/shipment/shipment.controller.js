(function () {
  'use strict';

  // register the controller as ShipmentController
  angular
    .module('vendorAppApp.shipment')
    .controller('ShipmentController', ShipmentController);

  /**
   * add ShipmentController dependencies to inject
   * @param {Service} ShipmentDefinition The model definition of Shipment resource
   */
  ShipmentController.$inject = ['ModelDefinitions', 'ShipmentDefinition'];

  /**
   * ShipmentController constructor. Main controller for the vendorAppApp.shipment
   * module.
   *
   * @param {$scope} $scope - The scope to listen for events
   * @param {socket.io} socket - The socket to register updates
   */
  function ShipmentController(ModelDefinitions, ShipmentDefinition) {
    var vm = this;

    vm.ModelDefinitions = ModelDefinitions;
    vm.shipmentDefinition = ShipmentDefinition;
  }

})();
