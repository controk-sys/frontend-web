(function () {
  angular
    .module("controk")
    .controller("ProductListCtrl", ProductListCtrl);

  ProductListCtrl.$inject = ["$scope", "Product"];
  function ProductListCtrl($scope, Product) {
    this.createState = "productCreation";
    Product.list().then(function (response) {
      /**
       * @type {{id, name, description, cost, sell_value}}
       */
      $scope.products = response.data;
    });
  }
})();
