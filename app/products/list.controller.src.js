(() => {
  angular
    .module("controk")
    .controller("ProductListCtrl", ProductListCtrl)

  ProductListCtrl.$inject = ["$scope", "Product"]

  function ProductListCtrl($scope, Product) {
    this.createState = "productCreation"
    Product.list()
      .then((response) => {
        /**
         * @type {{id, name, description, cost, sell_value}}
         */
        $scope.products = response.data
      })
  }
})()
