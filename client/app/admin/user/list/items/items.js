  /**
   * @ngdoc overview
   * @name vendorAppApp.admin.user.list.items
   * @requires ui.router
   * @requires components/listImage
   *
   * @description
   * The `vendorAppApp.admin.user.list.items` module which provides:
   *
   * - {@link vendorAppApp.admin.user.list.items.controller:UserItemsController UserItemsController}
   */

(function () {
  'use strict';

  angular
    .module('vendorAppApp.admin.user.list.items', [
      'ui.router',
      'vendorAppApp.listImage'
    ]);

})();
