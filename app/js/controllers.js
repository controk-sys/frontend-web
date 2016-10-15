app
    .controller("clientsController", ["$scope", "clientsService",
        function($scope, clientsService) {
            $scope.clients = clientsService.list();
            $scope.getClient = clientsService.retrieve;
        }
    ])
    .controller("employeesController", ["$scope", "employeesService",
        function($scope, clientsService) {
            $scope.employees = clientsService.list();
            $scope.getEmployee = clientsService.retrieve;
        }
    ]);