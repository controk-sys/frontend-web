(() => {
  angular
    .module("controk")
    .controller("ProductDetailCtrl", ProductDetailCtrl)

  function ProductDetailCtrl($scope, $stateParams, Product) {
    "ngInject"
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
