angular.module("controk")
    .controller("EmployeeCtrl", ["$scope", "Employee",
        function($scope, Employee) {
            Employee.list().then(function(response) {
                /**
                 * @type {{id, name, role, email, cpf, observation}}
                 */
                $scope.employees = response.data;
            });
        }
    ]);