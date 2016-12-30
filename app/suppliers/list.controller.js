angular.module("controk")
    .controller("SupplierListCtrl", ["$scope", "Supplier",
        function ($scope, Supplier) {
            //noinspection JSUnusedGlobalSymbols
            this.createState = "supplierCreation";
            Supplier.list().then(function (response) {
                /**
                 * @type {{id, trading_name, email, cnpj}}
                 */
                $scope.suppliers = response.data;
            });
        }
    ]);