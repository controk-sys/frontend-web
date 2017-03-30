(() => {
  angular
    .module("controk")
    .controller("ProductListCtrl", ProductListCtrl)

  function ProductListCtrl($scope, Product) {
    "ngInject"
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
