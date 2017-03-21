(function () {
  angular
    .module("controk")
    .controller("ClientListCtrl", ClientListCtrl);

  ClientListCtrl.$inject = ["$scope", "Client"];
  function ClientListCtrl($scope, Client) {
    this.createState = "clientCreation";
    Client.list().then(function (response) {
      /**
       * @type {{id, name, email, cpf, observation}}
       */
      $scope.clients = response.data;
    });
  }
})();
