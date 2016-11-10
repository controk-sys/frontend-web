angular.module("controk")
    .controller("ClientCreateCtrl", ["$scope", "$stateParams", "Client", "Assets",
        function($scope, $stateParams, Client, Assets) {
            /**
             * @type {{
             * name, observation, cpf, email, mobile, phone, place_options: [{id, name}],
             * address: {place: {id, name}, place_name, number, complement, neighborhood, city, state, cep}
             * }}
             */
            $scope.client = {};

            $scope.create = function (client) {
                var clientData = angular.copy(client);
                clientData.address.place = clientData.address.place.id;
                Client.create(clientData);
            };

            // Load place options
            Assets.getPlaceOptions().then(function(response) {
                $scope.place_options = response.data;
            });
        }
    ]);