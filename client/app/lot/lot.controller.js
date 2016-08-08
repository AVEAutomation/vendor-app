(function () {
  'use strict';

  // register the controller as LotController
  angular
    .module('vendorAppApp.lot')
    .controller('LotController', LotController);

  /**
   * add LotController dependencies to inject
   * @param {Service} LotDefinition The model definition of Lot resource
   */
  LotController.$inject = ['ModelDefinitions', 'LotDefinition'];

  /**
   * LotController constructor. Main controller for the vendorAppApp.lot
   * module.
   *
   * @param {$scope} $scope - The scope to listen for events
   * @param {socket.io} socket - The socket to register updates
   */
  function LotController(ModelDefinitions, LotDefinition) {
    var vm = this;

    vm.ModelDefinitions = ModelDefinitions;
    vm.lotDefinition = LotDefinition;
  }

})();
