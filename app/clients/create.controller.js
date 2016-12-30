angular.module("controk")
    .controller("ClientCreateCtrl", ["$scope", "$stateParams", "Client", "Assets",
        function ($scope, $stateParams, Client, Assets) {
            /**
             * @type {{
             * name, observation, cpf, email, mobile, phone, place_options: [{id, name}],
             * address: {place: {id, name}, place_name, number, complement, neighborhood, city, state, cep}
             * }}
             */
            $scope.client = {address: {}}; // To set the default value in "getPlaceOptions"

            $scope.create = function (client) {
                var clientData = angular.copy(client);
                clientData.address.place = clientData.address.place.id;
                Client.create(clientData);
            };

            // Load place options
            Assets.getPlaceOptions().then(function (response) {
                $scope.place_options = response.data;
                // Set a default value for it
                $scope.client.address.place = $scope.place_options[0];
            });
        }
    ]);