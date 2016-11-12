angular.module("controk")
    .controller("ClientListCtrl", ["$scope", "Client",
        function($scope, Client) {
            //noinspection JSUnusedGlobalSymbols
            this.createState = "clientCreation";
            Client.list().then(function(response) {
                /**
                 * @type {{id, name, email, cpf, observation}}
                 */
                $scope.clients = response.data;
            });
        }
    ]);