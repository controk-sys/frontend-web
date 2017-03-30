(() => {
  angular
    .module("controk")
    .controller("ClientCreateCtrl", ClientCreateCtrl)

  function ClientCreateCtrl($scope, Client, Assets) {
    "ngInject"
    /**
     * @type {{
     * name, observation, cpf, email, mobile, phone, place_options: [{id, name}],
     * address: {place: {id, name}, place_name, number, complement, neighborhood, city, state, cep}
     * }}
     */
    $scope.client = {address: {}} // To set the default value in "getPlaceOptions"

    $scope.create = (client) => {
      let _client = angular.copy(client)
      _client.address.place = _client.address.place.id
      Client.create(_client)
    }

    // Load place options
    Assets.getPlaceOptions()
      .then((response) => {
        $scope.place_options = response.data
        // Set a default value for it
        $scope.client.address.place = $scope.place_options[0]
      })
  }
})()
