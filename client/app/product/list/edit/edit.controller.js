/**
 * @ngdoc controller
 * @name vendorAppAppproduct.list.edit.controller:ProductEditController
 * @description
 * Controller of the product edit page of the admin section
 */

(function () {
  'use strict';

  /**
   * Register the edit controller as ProductEditController
   */

  angular
    .module('vendorAppApp.product.list.edit')
    .controller('ProductEditController', ProductEditController);

  /**
   * @ngdoc function
   * @name vendorAppAppproduct.list.edit.provider:ProductEditController
   * @description
   * Provider of the {@link vendorAppAppproduct.list.edit.controller:ProductEditController ProductEditController}
   * @param {Service} $state The state service to use
   * @param {Service} $stateParams The stateParams service to use
   * @param {Service} $mdDialog The dialog service to use
   * @param {Service} Toast The Toast service to use
   * @param {Service} ProductService The ProductService to use
   * @param {Resource} product The product data to use
   */

  ProductEditController.$inject = ['$state', '$stateParams', '$mdDialog', 'Toast', 'ProductService', 'product'];

  function ProductEditController($state, $stateParams, $mdDialog, Toast, ProductService, product) {
    var vm = this;

    // defaults
    vm.product = angular.copy(product, vm.product);
    vm.displayName = product.name;

    // view model bindings
    vm.update = update;
    vm.remove = remove;
    vm.goBack = goBack;
    vm.showList = showList;

    /**
     * Open the detail state with the current product
     *
     */
    function goBack() {
      $state.go('^.detail', {id: vm.product._id});
    }

    /**
     * Open the product list state
     *
     */
    function showList() {
      $state.go('^');
    }
    /**
     * Updates a product by using the ProductService save method
     * @param {Form} [form]
     */
    function update(form) {
      // refuse to work with invalid data
      if (!vm.product._id || form && !form.$valid) {
        return;
      }

      ProductService.update(vm.product)
        .then(updateProductSuccess)
        .catch(updateProductCatch);

      function updateProductSuccess(updatedProduct) {
        // update the display name after successful save
        vm.displayName = updatedProduct.name;
        Toast.show({text: 'Product ' + vm.displayName + ' updated'});
        if (form) {
          form.$setPristine();
        }
      }

      function updateProductCatch(err) {
        Toast.show({
          type: 'warn',
          text: 'Error while updating Product ' + vm.displayName,
          link: {state: $state.$current, params: $stateParams}
        });

        if (form && err) {
          form.setResponseErrors(err.data);
        }
      }
    }

    /**
     * Show a dialog to ask the product if she wants to delete the current selected product.
     * @param {AngularForm} form - The form to pass to the remove handler
     * @param {$event} ev - The event to pass to the dialog service
     */
    function remove(form, ev) {
      var confirm = $mdDialog.confirm()
        .title('Delete product ' + vm.displayName + '?')
        .content('Do you really want to delete product ' + vm.displayName + '?')
        .ariaLabel('Delete product')
        .ok('Delete product')
        .cancel('Cancel')
        .targetEvent(ev);

      $mdDialog.show(confirm)
        .then(performRemove);

      /**
       * Removes a product by using the ProductService remove method
       * @api private
       */
      function performRemove() {
        ProductService.remove(vm.product)
          .then(deleteProductSuccess)
          .catch(deleteProductCatch);

        function deleteProductSuccess() {
          Toast.show({type: 'success', text: 'Product ' + vm.displayName + ' deleted'});
          vm.showList();
        }

        function deleteProductCatch(err) {
          Toast.show({
            type: 'warn',
            text: 'Error while deleting product ' + vm.displayName,
            link: {state: $state.$current, params: $stateParams}
          });

          if (form && err) {
            form.setResponseErrors(err, vm.errors);
          }
        }
      }
    }
  }
})();
