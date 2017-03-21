(() => {
  angular
    .module("controk")
    .controller("ProductDetailCtrl", ProductDetailCtrl)

  ProductDetailCtrl.$inject = ["$scope", "$stateParams", "Product"]
  function ProductDetailCtrl($scope, $stateParams, Product) {
    /**
     * @type {{id, description, cost, name, sell_value}}
     */
    $scope.product = {}

    $scope.update = Product.update

    // Load product info
    Product.retrieve($stateParams.id)
      .then((response) => {
        $scope.product = response.data
      })
  }
})()
