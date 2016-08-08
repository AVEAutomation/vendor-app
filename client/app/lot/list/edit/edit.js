(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.lot.list.edit module
   * and configure it.
   *
   * @requires 'ui.router',
   * @requires 'ngMaterial',
   * @requires vendorAppApp.mongooseError
   * @requires vendorAppApp.lot.service
   */

  angular
    .module('vendorAppApp.lot.list.edit', [
      'ui.router',
      'ngMaterial',
      'vendorAppApp.mongooseError',
      'vendorAppApp.lot.service'
    ])
    .config(configureLotListEdit);

  // inject configLotListEdit dependencies
  configureLotListEdit.$inject = ['$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the lot.list.edit state with the edit template
   * paired with the LotEditController as 'edit' for the
   * 'detail@lot.list' view.
   * 'lot' is resolved as the lot with the id found in
   * the state parameters.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configureLotListEdit($stateProvider) {
    // The edit state configuration.
    var editState = {
      name: 'lot.list.edit',
      parent: 'lot.list',
      url: '/edit/:id',
      authenticate: true,
      role: 'user',
      onEnter: onEnterLotListEdit,
      views: {
        'detail@lot.list': {
          templateUrl: 'app\lot\list\edit\edit.html',
          controller: 'LotEditController',
          controllerAs: 'edit',
          resolve: {lot: resolveLotFromArray}
        }
      }
    };

    $stateProvider.state(editState);
  }

  // inject onLotListEditEnter dependencies
  onEnterLotListEdit.$inject = ['$timeout', 'ToggleComponent'];

  /**
   * Executed when entering the lot.list.detail state. Open the component
   * registered with the component id 'lot.detailView'.
   *
   * @params {$timeout} $timeout - The $timeout service to wait for view initialization
   * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
   */
  function onEnterLotListEdit($timeout, ToggleComponent) {
    $timeout(showDetails, 0, false);

    function showDetails() {
      ToggleComponent('lot.detailView').open();
    }
  }

  // inject resolveLotDetailRoute dependencies
  resolveLotFromArray.$inject = ['lots', '$stateParams', '_'];

  /**
   * Resolve dependencies for the lot.list.edit state. Get the lot
   * from the injected Array of lots by using the '_id' property.
   *
   * @params {Array} lots - The array of lots
   * @params {Object} $stateParams - The $stateParams to read the lot id from
   * @params {Object} _ - The lodash service to find the requested lot
   * @returns {Object|null} The lot whose value of the _id property equals $stateParams._id
   */
  function resolveLotFromArray(lots, $stateParams, _) {
    //  return Lot.get({id: $stateParams.id}).$promise;
    return _.find(lots, {'_id': $stateParams.id});
  }

})();
