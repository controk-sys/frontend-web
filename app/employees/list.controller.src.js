(() => {
  angular
    .module("controk")
    .controller("EmployeeListCtrl", EmployeeListCtrl)

  function EmployeeListCtrl($scope, Employee) {
    "ngInject"
    this.createState = "employeeCreation"
    Employee.list()
      .then((response) => {
        /**
         * @type {{id, name, role, email, cpf, observation}}
         */
        $scope.employees = response.data
      })
  }
})()
