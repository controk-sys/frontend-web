(() => {
  angular
    .module("controk")
    .controller("EmployeeCreateCtrl", EmployeeCreateCtrl)

  EmployeeCreateCtrl.$inject = ["$scope", "Employee", "Assets"]

  function EmployeeCreateCtrl($scope, Employee, Assets) {
    /**
     * @type {{
     * name, observation, cpf, email, role, mobile, phone, place_options: [{id, name}],
     * address: {place: {id, name}, place_name, number, complement, neighborhood, city, state, cep}
     * }}
     */
    $scope.employee = {address: {}} // To set the default value in "getPlaceOptions"

    $scope.create = (employee) => {
      let _employee = angular.copy(employee)
      _employee.address.place = _employee.address.place.id
      Employee.create(_employee)
    }

    // Load place options
    Assets.getPlaceOptions()
      .then((response) => {
        $scope.place_options = response.data
        // Set a default value for it
        $scope.employee.address.place = $scope.place_options[0]
      })
  }
})()
