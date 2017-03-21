(function () {
  angular
    .module("controk")
    .controller("ClientDetailCtrl", ClientDetailCtrl)

  ClientDetailCtrl.$inject = ["$scope", "$stateParams", "Client"]

  function ClientDetailCtrl($scope, $stateParams, Client) {
    /**
     * @type {{
     * id, name, observation, cpf, email, mobile, phone, place_options: [{id, name}],
     * address: {place: {id, name}, place_name, number, complement, neighborhood, city, state, cep}
     * }}
     */
    $scope.client = {}

    $scope.update = (client) => {
      let _client = angular.copy(client)
      _client.address.place = _client.address.place.id
      Client.update(_client)
    }

    // Load client info
    Client.info($stateParams.id)
      .then((infoResponse) => {
        // The existence of an email will define if the data is already in the $stateParams
        if (!$stateParams.email) {
          Client.retrieve($stateParams.id)
            .then((retrieveResponse) => {
              $scope.client = prepareClient(Object.assign(infoResponse.data, retrieveResponse.data))
            })
        }
        else {
          $scope.client = prepareClient(Object.assign(infoResponse.data, $stateParams))
        }

        function prepareClient(client) {
          // Put the "place_options" on the scope
          $scope.place_options = client.place_options
          delete client.place_options
          // Build the "place" attribute to resolve default selected
          // It must come to the single value at update
          for (let i = 0; i < $scope.place_options.length; i++) {
            if ($scope.place_options[i].id === client.address.place) {
              client.address.place = $scope.place_options[i]
            }
          }

          return client
        }
      })
  }
})()
