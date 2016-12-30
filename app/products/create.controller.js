(function () {
    angular
        .module("controk")
        .controller("ProductCreateCtrl", ProductCreateCtrl);

    ProductCreateCtrl.$inject = ["$scope", "$stateParams", "Product"];
    function ProductCreateCtrl($scope, $stateParams, Product) {
        /**
         * @type {{name, description, sell_value, cost}}
         */
        $scope.product = {};
        $scope.create = Product.create;
    }
})();