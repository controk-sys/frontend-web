app
    .controller("ClientsCtrl", ["$scope", "Clients",
        function($scope, Clients) {
            Clients.list().then(function(response) {
                $scope.clients = response.data;
            });
            $scope.getClient = Clients.retrieve;
        }
    ])
    .controller("EmployeesCtrl", ["$scope", "Employees",
        function($scope, Employees) {
            Employees.list().then(function(response) {
                $scope.employees = response.data;
            });
            $scope.getEmployee = Employees.retrieve;
        }
    ]);