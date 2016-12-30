angular.module("controk")
    .service("Shipment", ["$http", "urls",
        function ($http, urls) {
            this.list = function () {
                return $http.get(urls.shipments);
            };
        }
    ]);