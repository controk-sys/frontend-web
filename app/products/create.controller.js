angular.module("controk")
    .controller("ProductCreateCtrl", ["$scope", "$stateParams", "Product",
        function($scope, $stateParams, Product) {
            /**
             * @type {{name, description, sell_value, cost}}
             */
            $scope.product = {};
            $scope.create = Product.create;
        }
    ]);