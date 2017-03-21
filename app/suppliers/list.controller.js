(function () {
  angular
    .module("controk")
    .controller("SupplierListCtrl", SupplierListCtrl);

  SupplierListCtrl.$inject = ["$scope", "Supplier"];
  function SupplierListCtrl($scope, Supplier) {
    this.createState = "supplierCreation";
    Supplier.list().then(function (response) {
      /**
       * @type {{id, trading_name, email, cnpj}}
       */
      $scope.suppliers = response.data;
    });
  }
})();
