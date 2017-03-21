(() => {
  angular
    .module("controk")
    .controller("SupplierCreateCtrl", SupplierCreateCtrl)

  SupplierCreateCtrl.$inject = ["$scope", "Supplier", "Assets"]

  function SupplierCreateCtrl($scope, Supplier, Assets) {
    /**
     * @type {{
     * trading_name, email, cnpj, place_options: [{id, name}],
     * address: {place: {id, name}, place_name, number, complement, neighborhood, city, state, cep}
     * }}
     */
    $scope.supplier = {address: {}} // To set the default value in "getPlaceOptions"

    $scope.create = (supplier) => {
      let _supplier = angular.copy(supplier)
      _supplier.address.place = _supplier.address.place.id
      Supplier.create(_supplier)
    }

    // Load place options
    Assets.getPlaceOptions()
      .then((response) => {
        $scope.place_options = response.data
        // Set a default value for it
        $scope.supplier.address.place = $scope.place_options[0]
      })
  }
})()
