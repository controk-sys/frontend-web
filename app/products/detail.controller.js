angular.module("controk")
    .controller("ProductDetailCtrl", ["$scope", "$stateParams", "Product",
        function ($scope, $stateParams, Product) {
            /**
             * @type {{id, description, cost, name, sell_value}}
             */
            $scope.product = {};

            $scope.update = Product.update;

            // Load product info
            Product.retrieve($stateParams.id).then(function (response) {
                $scope.product = response.data;
            });
        }
    ]);