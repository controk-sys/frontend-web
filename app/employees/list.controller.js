(function () {
  angular
    .module("controk")
    .controller("EmployeeListCtrl", EmployeeListCtrl);

  EmployeeListCtrl.$inject = ["$scope", "Employee"];
  function EmployeeListCtrl($scope, Employee) {
    this.createState = "employeeCreation";
    Employee.list().then(function (response) {
      /**
       * @type {{id, name, role, email, cpf, observation}}
       */
      $scope.employees = response.data;
    });
  }
})();
