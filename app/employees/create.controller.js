angular.module("controk")
    .controller("EmployeeCreateCtrl", ["$scope", "$stateParams", "Employee", "Assets",
        function($scope, $stateParams, Employee, Assets) {
            /**
             * @type {{
             * name, observation, cpf, email, role, mobile, phone, place_options: [{id, name}],
             * address: {place: {id, name}, place_name, number, complement, neighborhood, city, state, cep}
             * }}
             */
            $scope.employee = {address: {}}; // To set the default value in "getPlaceOptions"

            $scope.create = function (employee) {
                var employeeData = angular.copy(employee);
                employeeData.address.place = employeeData.address.place.id;
                Employee.create(employeeData);
            };

            // Load place options
            Assets.getPlaceOptions().then(function(response) {
                $scope.place_options = response.data;
                // Set a default value for it
                $scope.employee.address.place = $scope.place_options[0];
            });
        }
    ]);