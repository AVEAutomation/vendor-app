(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.product.list.edit module
   * and configure it.
   *
   * @requires 'ui.router',
   * @requires 'ngMaterial',
   * @requires vendorAppApp.mongooseError
   * @requires vendorAppApp.product.service
   */

  angular
    .module('vendorAppApp.product.list.edit', [
      'ui.router',
      'ngMaterial',
      'vendorAppApp.mongooseError',
      'vendorAppApp.product.service'
    ])
    .config(configureProductListEdit);

  // inject configProductListEdit dependencies
  configureProductListEdit.$inject = ['$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the product.list.edit state with the edit template
   * paired with the ProductEditController as 'edit' for the
   * 'detail@product.list' view.
   * 'product' is resolved as the product with the id found in
   * the state parameters.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configureProductListEdit($stateProvider) {
    // The edit state configuration.
    var editState = {
      name: 'product.list.edit',
      parent: 'product.list',
      url: '/edit/:id',
      authenticate: true,
      role: 'user',
      onEnter: onEnterProductListEdit,
      views: {
        'detail@product.list': {
          templateUrl: 'app/product/list/edit/edit.html',
          controller: 'ProductEditController',
          controllerAs: 'edit',
          resolve: {product: resolveProductFromArray}
        }
      }
    };

    $stateProvider.state(editState);
  }

  // inject onProductListEditEnter dependencies
  onEnterProductListEdit.$inject = ['$timeout', 'ToggleComponent'];

  /**
   * Executed when entering the product.list.detail state. Open the component
   * registered with the component id 'product.detailView'.
   *
   * @params {$timeout} $timeout - The $timeout service to wait for view initialization
   * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
   */
  function onEnterProductListEdit($timeout, ToggleComponent) {
    $timeout(showDetails, 0, false);

    function showDetails() {
      ToggleComponent('product.detailView').open();
    }
  }

  // inject resolveProductDetailRoute dependencies
  resolveProductFromArray.$inject = ['products', '$stateParams', '_'];

  /**
   * Resolve dependencies for the product.list.edit state. Get the product
   * from the injected Array of products by using the '_id' property.
   *
   * @params {Array} products - The array of products
   * @params {Object} $stateParams - The $stateParams to read the product id from
   * @params {Object} _ - The lodash service to find the requested product
   * @returns {Object|null} The product whose value of the _id property equals $stateParams._id
   */
  function resolveProductFromArray(products, $stateParams, _) {
    //  return Product.get({id: $stateParams.id}).$promise;
    return _.find(products, {'_id': $stateParams.id});
  }

})();
