app
    .controller("clientsController", ["$scope", "clientsService",
        function($scope, clientsService) {
            clientsService.list().then(function(response) {
                $scope.clients = response.data;
            });
            $scope.getClient = clientsService.retrieve;
        }
    ])
    .controller("employeesController", ["$scope", "employeesService",
        function($scope, employeesService) {
            employeesService.list().then(function(response) {
                $scope.employees = response.data;
            });
            $scope.getEmployee = employeesService.retrieve;
        }
    ]);