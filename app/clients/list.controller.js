angular.module("controk")
    .controller("ClientsListCtrl", ["$scope", "Client",
        function($scope, Client) {
            Client.list().then(function(response) {
                /**
                 * @type {{id, name, email, cpf, observation}}
                 */
                $scope.clients = response.data;
            });
        }
    ]);