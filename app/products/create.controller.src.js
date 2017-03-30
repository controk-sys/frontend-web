(() => {
  angular
    .module("controk")
    .controller("ProductCreateCtrl", ProductCreateCtrl)

  function ProductCreateCtrl($scope, Product) {
    "ngInject"
    /**
     * @type {{name, description, sell_value, cost}}
     */
    $scope.product = {}
    $scope.create = Product.create
  }
})()
