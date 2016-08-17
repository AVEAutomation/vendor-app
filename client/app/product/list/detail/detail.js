(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.product.list.detail submodule
   * and configure it.
   *
   * @requires ui.router
   * @requires angularMoment
   */

  angular
    .module('vendorAppApp.product.list.detail', [
      'ui.router',
      'angularMoment'
    ])
    .config(configureProductListDetail);

  // inject configProductRoutes dependencies
  configureProductListDetail.$inject = ['$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the 'product.detail' state with the detail template
   * paired with the ProductDetailController as 'detail' for the
   * 'sidenav' sub view.
   * 'product' is resolved as the product with the id found in
   * the state parameters.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configureProductListDetail($stateProvider) {
    // The detail state configuration
    var detailState = {
      name: 'product.list.detail',
      parent: 'product.list',
      url: '/:id',
      authenticate: true,
      role: 'user',
      onEnter: onEnterProductListDetail,
      views: {
        'detail@product.list': {
          templateUrl: 'app/product/list/detail/detail.html',
          controller: 'ProductDetailController',
          controllerAs: 'detail',
          resolve: {product: resolveProductFromArray}
        }
      }
    };

    $stateProvider.state(detailState);
  }

  // inject onProductListDetailEnter dependencies
  onEnterProductListDetail.$inject = ['$timeout', 'ToggleComponent'];

  /**
   * Executed when entering the product.list.detail state. Open the component
   * registered with the component id 'product.detailView'.
   *
    * @params {$timeout} $timeout - The $timeout service to wait for view initialization
   * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
   */
  function onEnterProductListDetail($timeout, ToggleComponent) {
    $timeout(showDetails, 0, false);

    function showDetails() {
      ToggleComponent('product.detailView').open();
    }
  }

  // inject resolveProductFromArray dependencies
  resolveProductFromArray.$inject = ['products', '$stateParams', '_'];

  /**
   * Resolve dependencies for the product.detail state
   *
   * @params {Array} products - The array of products
   * @params {Object} $stateParams - The $stateParams to read the product id from
   * @returns {Object|null} The product whose value of the _id property equals $stateParams._id
   */
  function resolveProductFromArray(products, $stateParams, _) {
    return _.find(products, {'_id': $stateParams.id});
  }

})();
