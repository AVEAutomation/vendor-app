/**
 * @ngdoc controller
 * @name vendorAppApp.product.create.controller:ProductCreateController
 * @description
 * Controller of the product create page of the admin section
 */

(function () {
  'use strict';

  /**
   * Register the create controller as ProductCreateController
   */

  angular
    .module('vendorAppApp.product.create')
    .controller('ProductCreateController', ProductCreateController);

  /**
   * @ngdoc function
   * @name vendorAppApp.product.create.provider:ProductCreateController
   * @description
   * Provider of the {@link vendorAppApp.product.create.controller:ProductCreateController ProductCreateController}
   *
   * @param {Service} Auth The Auth service to use
   * @param {Service} $mdDialog The mdDialog service to use
   * @param {Service} Product The Product resource
   * @param {Service} ProductService The Product service to use
   * @param {Service} ProductDefinition The model definition of Product resource
   * @param {Service} Toast The Toast service to use
   * @returns {Service} {@link vendorAppApp.product.create.controller:ProductCreateController ProductCreateController}
   */

  ProductCreateController.$inject = ['$mdDialog', 'Product', 'ProductService', 'ProductDefinition', 'Toast'];

  function ProductCreateController($mdDialog, Product, ProductService, ProductDefinition, Toast) {
    var vm = this;

    /**
     * @ngdoc property
     * @name product
     * @propertyOf vendorAppApp.product.create.controller:ProductCreateController
     * @description
     * The new product data
     *
     * @returns {Object} The product data
     */
    vm.product = new Product();
    vm.productDefinition = ProductDefinition;

    // view model bindings (documented below)
    vm.create = createProduct;
    vm.close = hideDialog;
    vm.cancel = cancelDialog;

    /**
     * @ngdoc function
     * @name createProduct
     * @methodOf vendorAppApp.product.create.controller:ProductCreateController
     * @description
     * Create a new product by using the ProductService create method
     *
     * @param {form} [form] The form to gather the information from
     */
    function createProduct(form) {
      // refuse to work with invalid data
      if (vm.product._id || (form && !form.$valid)) {
        return;
      }

      ProductService.create(vm.product)
        .then(createProductSuccess)
        .catch(createProductCatch);

      function createProductSuccess(newProduct) {
        Toast.show({
          type: 'success',
          text: 'Product ' + newProduct.name + ' has been created',
          link: {state: 'product.list.detail', params: {id: newProduct._id}}
        });
        vm.close();
      }

      function createProductCatch(err) {
        if (form && err) {
          form.setResponseErrors(err);
        }

        Toast.show({
          type: 'warn',
          text: 'Error while creating a new Product'
        });
      }
    }

    /**
     * @ngdoc function
     * @name hide
     * @methodOf vendorAppApp.product.create.controller:ProductCreateController
     * @description
     * Hide the dialog
     */
    function hideDialog() {
      $mdDialog.hide();
    }

    /**
     * @ngdoc function
     * @name cancel
     * @methodOf vendorAppApp.product.create.controller:ProductCreateController
     * @description
     * Cancel the dialog
     */
    function cancelDialog() {
      $mdDialog.cancel();
    }
  }
})();
