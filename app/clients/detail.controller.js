angular.module("controk")
    .controller("ClientDetailCtrl", ["$scope", "$stateParams", "Client",
        function($scope, $stateParams, Client) {
            /**
             * @type {{
             * id, name, observation, cpf, email, mobile, phone, place_options: [{id, name}],
             * address: {place: {id, name}, place_name, number, complement, neighborhood, city, state, cep}
             * }}
             */
            $scope.client = {};

            $scope.update = function (client) {
                var clientData = angular.copy(client);
                clientData.address.place = clientData.address.place.id;
                Client.update(clientData);
            };

            // Load client info
            Client.info($stateParams.id).then(function(infoResponse) {
                // The existence of an email will define if the data is already in the $stateParams
                if (!$stateParams.email)
                    Client.retrieve($stateParams.id).then(function(retrieveResponse) {
                        $scope.client = prepareClient(Object.assign(infoResponse.data, retrieveResponse.data));
                    });

                else $scope.client = prepareClient(Object.assign(infoResponse.data, $stateParams));

                function prepareClient(client) {
                    // Build the "place" attribute to resolve default selected
                    // It must come to the single value at update
                    for (var i = 0; i < client.place_options.length; i++)
                        if (client.place_options[i].id == client.address.place)
                            client.address.place = client.place_options[i];

                    return client;
                }
            });
        }
    ]);