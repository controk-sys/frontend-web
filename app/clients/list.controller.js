angular.module("controk")
    .controller("ClientsListCtrl", ["$scope", "Client",
        function($scope, Client) {
            //noinspection JSUnusedGlobalSymbols
            this.createState = "createClient";
            Client.list().then(function(response) {
                /**
                 * @type {{id, name, email, cpf, observation}}
                 */
                $scope.clients = response.data;
            });
        }
    ]);