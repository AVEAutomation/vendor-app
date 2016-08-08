(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.customer.list.detail submodule
   * and configure it.
   *
   * @requires ui.router
   * @requires angularMoment
   */

  angular
    .module('vendorAppApp.customer.list.detail', [
      'ui.router',
      'angularMoment'
    ])
    .config(configureCustomerListDetail);

  // inject configCustomerRoutes dependencies
  configureCustomerListDetail.$inject = ['$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the 'customer.detail' state with the detail template
   * paired with the CustomerDetailController as 'detail' for the
   * 'sidenav' sub view.
   * 'customer' is resolved as the customer with the id found in
   * the state parameters.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configureCustomerListDetail($stateProvider) {
    // The detail state configuration
    var detailState = {
      name: 'customer.list.detail',
      parent: 'customer.list',
      url: '/:id',
      authenticate: true,
      role: 'user',
      onEnter: onEnterCustomerListDetail,
      views: {
        'detail@customer.list': {
          templateUrl: 'app\customer\list\detail\detail.html',
          controller: 'CustomerDetailController',
          controllerAs: 'detail',
          resolve: {customer: resolveCustomerFromArray}
        }
      }
    };

    $stateProvider.state(detailState);
  }

  // inject onCustomerListDetailEnter dependencies
  onEnterCustomerListDetail.$inject = ['$timeout', 'ToggleComponent'];

  /**
   * Executed when entering the customer.list.detail state. Open the component
   * registered with the component id 'customer.detailView'.
   *
    * @params {$timeout} $timeout - The $timeout service to wait for view initialization
   * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
   */
  function onEnterCustomerListDetail($timeout, ToggleComponent) {
    $timeout(showDetails, 0, false);

    function showDetails() {
      ToggleComponent('customer.detailView').open();
    }
  }

  // inject resolveCustomerFromArray dependencies
  resolveCustomerFromArray.$inject = ['customers', '$stateParams', '_'];

  /**
   * Resolve dependencies for the customer.detail state
   *
   * @params {Array} customers - The array of customers
   * @params {Object} $stateParams - The $stateParams to read the customer id from
   * @returns {Object|null} The customer whose value of the _id property equals $stateParams._id
   */
  function resolveCustomerFromArray(customers, $stateParams, _) {
    return _.find(customers, {'_id': $stateParams.id});
  }

})();
