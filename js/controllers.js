app
    .controller("ClientCtrl", ["$scope", "Client",
        function($scope, Client) {
            Client.list().then(function(response) {
                $scope.clients = response.data;
            });
        }
    ])
    .controller("EmployeeCtrl", ["$scope", "Employee",
        function($scope, Employee) {
            Employee.list().then(function(response) {
                $scope.employees = response.data;
            });
        }
    ]);