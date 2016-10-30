angular.module("controk")
    .controller("EmployeeDetailCtrl", ["$scope", "$stateParams", "Employee",
        function($scope, $stateParams, Employee) {
            /**
             * @type {{
             * id, name, observation, role, cpf, email, mobile, phone, place_options: [{id, name}],
             * address: {place, place_name, number, complement, neighborhood, city, state, cep}
             * }}
             */
            $scope.employee = {};

            Employee.info($stateParams.id).then(function(infoResponse) {
                // The existence of an email will define if the data is already in the $stateParams
                if (!$stateParams.email)
                    Employee.retrieve($stateParams.id).then(function(retrieveResponse) {
                        $scope.employee = prepareEmployee(Object.assign(infoResponse.data, retrieveResponse.data));
                    });

                else $scope.employee = prepareEmployee(Object.assign(infoResponse.data, $stateParams));
            });

            function prepareEmployee(employee) {
                // Build the "place" attribute to resolve Angular default selected
                // It must come to the single value at update
                for (var i = 0; i < employee.place_options.length; i++)
                    if (employee.place_options[i].id == employee.address.place)
                        employee.address.place = employee.place_options[i];

                return employee;
            }
        }
    ]);