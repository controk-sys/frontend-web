angular.module("controk")
    .controller("SupplierCreateCtrl", ["$scope", "$stateParams", "Supplier", "Assets",
        function($scope, $stateParams, Supplier, Assets) {
            /**
             * @type {{
             * trading_name, email, cnpj, place_options: [{id, name}],
             * address: {place: {id, name}, place_name, number, complement, neighborhood, city, state, cep}
             * }}
             */
            $scope.supplier = {address: {}}; // To set the default value in "getPlaceOptions"

            $scope.create = function (supplier) {
                var supplierData = angular.copy(supplier);
                supplierData.address.place = supplierData.address.place.id;
                Supplier.create(supplierData);
            };

            // Load place options
            Assets.getPlaceOptions().then(function(response) {
                $scope.place_options = response.data;
                // Set a default value for it
                $scope.supplier.address.place = $scope.place_options[0];
            });
        }
    ]);