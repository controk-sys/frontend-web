(function () {
    angular
        .module("controk")
        .controller("ProductCreateCtrl", ProductCreateCtrl);

    ProductCreateCtrl.$inject = ["$scope", "Product"];
    function ProductCreateCtrl($scope, Product) {
        /**
         * @type {{name, description, sell_value, cost}}
         */
        $scope.product = {};
        $scope.create = Product.create;
    }
})();