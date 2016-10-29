angular.module("controk")
    .controller("ShipmentCtrl", ["$scope", "Shipment",
        function($scope, Shipment) {
            Shipment.list().then(function(response) {
                /**
                 * @type {{id, delivery_date, payment_date, order_date}}
                 */
                $scope.shipments = response.data;
            });
        }
    ]);