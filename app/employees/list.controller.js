angular.module("controk")
    .controller("EmployeeListCtrl", ["$scope", "Employee",
        function($scope, Employee) {
            //noinspection JSUnusedGlobalSymbols
            this.createState = "employeeCreation";
            Employee.list().then(function(response) {
                /**
                 * @type {{id, name, role, email, cpf, observation}}
                 */
                $scope.employees = response.data;
            });
        }
    ]);