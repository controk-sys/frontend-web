(() => {
  angular
    .module("controk")
    .controller("ShipmentCtrl", ShipmentCtrl)

  function ShipmentCtrl($scope, Shipment) {
    "ngInject"
    Shipment.list()
      .then((response) => {
        /**
         * @type {{id, delivery_date, payment_date, order_date}}
         */
        $scope.shipments = response.data
      })
  }
})()
