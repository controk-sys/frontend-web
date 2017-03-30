(() => {
  angular
    .module("controk")
    .controller("ClientListCtrl", ClientListCtrl)

  function ClientListCtrl($scope, Client) {
    "ngInject"
    this.createState = "clientCreation"
    Client.list()
      .then((response) => {
        /**
         * @type {{id, name, email, cpf, observation}}
         */
        $scope.clients = response.data
      })
  }
})()
