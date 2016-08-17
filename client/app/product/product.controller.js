(function () {
  'use strict';

  // register the controller as ProductController
  angular
    .module('vendorAppApp.product')
    .controller('ProductController', ProductController);

  /**
   * add ProductController dependencies to inject
   * @param {Service} ProductDefinition The model definition of Product resource
   */
  ProductController.$inject = ['ModelDefinitions', 'ProductDefinition'];

  /**
   * ProductController constructor. Main controller for the vendorAppApp.product
   * module.
   *
   * @param {$scope} $scope - The scope to listen for events
   * @param {socket.io} socket - The socket to register updates
   */
  function ProductController(ModelDefinitions, ProductDefinition) {
    var vm = this;

    vm.ModelDefinitions = ModelDefinitions;
    vm.productDefinition = ProductDefinition;
  }

})();
