angular.module("controk")
    .controller("SupplierCtrl", ["$scope", "Supplier",
        function($scope, Supplier) {
            Supplier.list().then(function(response) {
                /**
                 * @type {{id, trading_name, email, cnpj}}
                 */
                $scope.suppliers = response.data;
            });
        }
    ]);