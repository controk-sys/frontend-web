(() => {
  angular
    .module("controk")
    .controller("SupplierListCtrl", SupplierListCtrl)

  function SupplierListCtrl($scope, Supplier) {
    "ngInject"
    this.createState = "supplierCreation"
    Supplier.list()
      .then((response) => {
        /**
         * @type {{id, trading_name, email, cnpj}}
         */
        $scope.suppliers = response.data
      })
  }
})()
