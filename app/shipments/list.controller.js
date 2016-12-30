(function () {
    angular
        .module("controk")
        .controller("ShipmentCtrl", ShipmentCtrl);

    ShipmentCtrl.$inject = ["$scope", "Shipment"];
    function ShipmentCtrl($scope, Shipment) {
        Shipment.list().then(function (response) {
            /**
             * @type {{id, delivery_date, payment_date, order_date}}
             */
            $scope.shipments = response.data;
        });
    }
})();