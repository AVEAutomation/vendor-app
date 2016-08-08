(function () {
  'use strict';

  // register the controller as CustomerController
  angular
    .module('vendorAppApp.customer')
    .controller('CustomerController', CustomerController);

  /**
   * add CustomerController dependencies to inject
   * @param {Service} CustomerDefinition The model definition of Customer resource
   */
  CustomerController.$inject = ['ModelDefinitions', 'CustomerDefinition'];

  /**
   * CustomerController constructor. Main controller for the vendorAppApp.customer
   * module.
   *
   * @param {$scope} $scope - The scope to listen for events
   * @param {socket.io} socket - The socket to register updates
   */
  function CustomerController(ModelDefinitions, CustomerDefinition) {
    var vm = this;

    vm.ModelDefinitions = ModelDefinitions;
    vm.customerDefinition = CustomerDefinition;
  }

})();
