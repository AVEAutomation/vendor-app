'use strict';

describe('Controller: ShipmentMainController', function () {

  // load the controller's module
  beforeEach(module('vendorAppApp.shipment.main'));

  var controller;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('ShipmentMainController', {
      // $scope: scope
    });
  }));

  it('object should exist', function () {
    Should.exist(controller);
    controller.should.be.an.instanceof(Object);
  });

});
