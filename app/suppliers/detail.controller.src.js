(() => {
  angular
    .module("controk")
    .controller("SupplierDetailCtrl", SupplierDetailCtrl)

  SupplierDetailCtrl.$inject = ["$scope", "$stateParams", "Supplier"]

  function SupplierDetailCtrl($scope, $stateParams, Supplier) {
    /**
     * @type {{
     * id, trading_name, email, cnpj, place_options: [{id, name}],
     * address: {place: {id, name}, place_name, number, complement, neighborhood, city, state, cep}
     * }}
     */
    $scope.supplier = {}

    $scope.update = (supplier) => {
      let supplierData = angular.copy(supplier)
      supplierData.address.place = supplierData.address.place.id
      Supplier.update(supplierData)
    }

    Supplier.info($stateParams.id)
      .then((infoResponse) => {
        // The existence of an email will define if the data is already in the $stateParams
        if (!$stateParams.email) {
          Supplier.retrieve($stateParams.id)
            .then((retrieveResponse) => {
              $scope.supplier = prepareSupplier(Object.assign(infoResponse.data, retrieveResponse.data))
            })
        }
        else {
          $scope.supplier = prepareSupplier(Object.assign(infoResponse.data, $stateParams))
        }

        function prepareSupplier(supplier) {
          // Put the "place_options" on the scope
          $scope.place_options = supplier.place_options
          delete supplier.place_options
          // Build the "place" attribute to resolve Angular default selected
          // It must come to the single value at update
          for (let i = 0; i < $scope.place_options.length; i++) {
            if ($scope.place_options[i].id === supplier.address.place) {
              supplier.address.place = $scope.place_options[i]
            }
          }

          return supplier
        }
      })
  }
})()
