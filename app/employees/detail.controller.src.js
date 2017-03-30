(() => {
  angular
    .module("controk")
    .controller("EmployeeDetailCtrl", EmployeeDetailCtrl)

  function EmployeeDetailCtrl($scope, $stateParams, Employee) {
    "ngInject"
    /**
     * @type {{
     * id, name, observation, role, cpf, email, mobile, phone, place_options: [{id, name}],
     * address: {place: {id, name}, place_name, number, complement, neighborhood, city, state, cep}
     * }}
     */
    $scope.employee = {}

    $scope.update = (employee) => {
      let _employee = angular.copy(employee)
      _employee.address.place = _employee.address.place.id
      Employee.update(_employee)
    }

    // Load employee info
    Employee.info($stateParams.id)
      .then((infoResponse) => {
        // The existence of an email will define if the data is already in the $stateParams
        if (!$stateParams.email) {
          Employee.retrieve($stateParams.id)
            .then((retrieveResponse) => {
              $scope.employee = prepareEmployee(Object.assign(infoResponse.data, retrieveResponse.data))
            })
        }
        else {
          $scope.employee = prepareEmployee(Object.assign(infoResponse.data, $stateParams))
        }

        function prepareEmployee(employee) {
          // Put the "place_options" on the scope
          $scope.place_options = employee.place_options
          delete employee.place_options
          // Build the "place" attribute to resolve default selected
          // It must come to the single value at update
          for (let i = 0; i < $scope.place_options.length; i++) {
            if ($scope.place_options[i].id === employee.address.place) {
              employee.address.place = $scope.place_options[i]
            }
          }

          return employee
        }
      })
  }
})()
