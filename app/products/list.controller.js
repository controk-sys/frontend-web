angular.module("controk")
    .controller("ProductCtrl", ["$scope", "Product",
        function($scope, Product) {
            Product.list().then(function(response) {
                /**
                 * @type {{id, name, description, cost, sell_value}}
                 */
                $scope.products = response.data;
            });
        }
    ]);