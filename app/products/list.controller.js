angular.module("controk")
    .controller("ProductListCtrl", ["$scope", "Product",
        function($scope, Product) {
            //noinspection JSUnusedGlobalSymbols
            this.createState = "productCreation";
            Product.list().then(function(response) {
                /**
                 * @type {{id, name, description, cost, sell_value}}
                 */
                $scope.products = response.data;
            });
        }
    ]);