angular.module("controk")
    .controller("SupplierDetailCtrl", ["$scope", "$stateParams", "Supplier",
        function($scope, $stateParams, Supplier) {
            /**
             * @type {{
             * id, trading_name, email, cnpj, place_options: [{id, name}],
             * address: {place, place_name, number, complement, neighborhood, city, state, cep}
             * }}
             */
            $scope.supplier = {};

            Supplier.info($stateParams.id).then(function(infoResponse) {
                // The existence of an email will define if the data is already in the $stateParams
                if (!$stateParams.email)
                    Supplier.retrieve($stateParams.id).then(function(retrieveResponse) {
                        $scope.supplier = prepareSupplier(Object.assign(infoResponse.data, retrieveResponse.data));
                    });

                else $scope.supplier = prepareSupplier(Object.assign(infoResponse.data, $stateParams));
            });

            function prepareSupplier(supplier) {
                // Build the "place" attribute to resolve Angular default selected
                // It must come to the single value at update
                for (var i = 0; i < supplier.place_options.length; i++)
                    if (supplier.place_options[i].id == supplier.address.place)
                        supplier.address.place = supplier.place_options[i];

                return supplier;
            }
        }
    ]);