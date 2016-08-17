(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.customer.list.edit module
   * and configure it.
   *
   * @requires 'ui.router',
   * @requires 'ngMaterial',
   * @requires vendorAppApp.mongooseError
   * @requires vendorAppApp.customer.service
   */

  angular
    .module('vendorAppApp.customer.list.edit', [
      'ui.router',
      'ngMaterial',
      'vendorAppApp.mongooseError',
      'vendorAppApp.customer.service'
    ])
    .config(configureCustomerListEdit);

  // inject configCustomerListEdit dependencies
  configureCustomerListEdit.$inject = ['$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the customer.list.edit state with the edit template
   * paired with the CustomerEditController as 'edit' for the
   * 'detail@customer.list' view.
   * 'customer' is resolved as the customer with the id found in
   * the state parameters.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configureCustomerListEdit($stateProvider) {
    // The edit state configuration.
    var editState = {
      name: 'customer.list.edit',
      parent: 'customer.list',
      url: '/edit/:id',
      authenticate: true,
      role: 'user',
      onEnter: onEnterCustomerListEdit,
      views: {
        'detail@customer.list': {
          templateUrl: 'app/customer/list/edit/edit.html',
          controller: 'CustomerEditController',
          controllerAs: 'edit',
          resolve: {customer: resolveCustomerFromArray}
        }
      }
    };

    $stateProvider.state(editState);
  }

  // inject onCustomerListEditEnter dependencies
  onEnterCustomerListEdit.$inject = ['$timeout', 'ToggleComponent'];

  /**
   * Executed when entering the customer.list.detail state. Open the component
   * registered with the component id 'customer.detailView'.
   *
   * @params {$timeout} $timeout - The $timeout service to wait for view initialization
   * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
   */
  function onEnterCustomerListEdit($timeout, ToggleComponent) {
    $timeout(showDetails, 0, false);

    function showDetails() {
      ToggleComponent('customer.detailView').open();
    }
  }

  // inject resolveCustomerDetailRoute dependencies
  resolveCustomerFromArray.$inject = ['customers', '$stateParams', '_'];

  /**
   * Resolve dependencies for the customer.list.edit state. Get the customer
   * from the injected Array of customers by using the '_id' property.
   *
   * @params {Array} customers - The array of customers
   * @params {Object} $stateParams - The $stateParams to read the customer id from
   * @params {Object} _ - The lodash service to find the requested customer
   * @returns {Object|null} The customer whose value of the _id property equals $stateParams._id
   */
  function resolveCustomerFromArray(customers, $stateParams, _) {
    //  return Customer.get({id: $stateParams.id}).$promise;
    return _.find(customers, {'_id': $stateParams.id});
  }

})();
