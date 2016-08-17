(function () {
  'use strict';

  /**
   * Introduce the vendorAppApp.product.list module
   * and configure it.
   * @requires ui.router
   * @requires ngMaterial
   * @requires vendorAppApp.socket
   * @requires vendorAppApp.mainMenu,
   * @requires vendorAppApp.toggleComponent,
   * @requires vendorAppApp.product.list.detail
   * @requires vendorAppApp.product.list.edit
   * @requires vendorAppApp.product.list.items
   */

  angular
    .module('vendorAppApp.product.list', [
      'ngMaterial',
      'ui.router',
      'vendorAppApp.socket',
      'vendorAppApp.mainMenu',
      'vendorAppApp.toggleComponent',
      'vendorAppApp.product.list.detail',
      'vendorAppApp.product.list.edit',
      'vendorAppApp.product.list.items'
    ])
    .config(configProductListRoutes);

  // inject configProductListRoutes dependencies
  configProductListRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the product.list state with the list template fpr the
   * 'main' view paired with the ProductListController as 'list'.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configProductListRoutes($stateProvider, mainMenuProvider) {
    // The list state configuration
    var listState = {
      name: 'product.list',
      parent: 'product',
      url: '/list',
      authenticate: true,
      role: 'user',
      resolve: {
        products:  resolveProducts
      },
      views: {

        // target the unnamed view in the product state
        '@product': {
          templateUrl: 'app/product/list/list.html',
          controller: 'ProductListController',
          controllerAs: 'list'
        },

        // target the content view in the product.list state
        'content@product.list': {
          templateUrl: 'app/product/list/items/items.html',
          controller: 'ProductItemsController',
          controllerAs: 'items'
        }
      }
    };

    $stateProvider.state(listState);

    mainMenuProvider.addSubMenuItem('product.main', {
      name: 'Products List',
      state: listState.name
    });
  }

  // inject resolveProducts dependencies
  resolveProducts.$inject = ['Product'];

  /**
   * Resolve dependencies for the product.list state
   *
   * @params {Product} Product - The service to query products
   * @returns {Promise} A promise that, when fullfilled, returns an array of products
   */
  function resolveProducts(Product) {
    return Product.query().$promise;
  }

})();
