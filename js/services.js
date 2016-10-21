app
    .service("Client", ["$http", "urls",
        function($http, urls) {
            this.list = function() {
                return $http.get(urls.clients);
            };
        }
    ])
    .service("Employee", ["$http", "urls",
        function($http, urls) {
            this.list = function() {
                return $http.get(urls.employees);
            };
        }
    ])
    .service("Product", ["$http", "urls",
        function($http, urls) {
            this.list = function() {
                return $http.get(urls.products);
            };
        }
    ])
    .service("Shipment", ["$http", "urls",
        function($http, urls) {
            this.list = function() {
                return $http.get(urls.shipments);
            };
        }
    ])
    .service("Supplier", ["$http", "urls",
        function($http, urls) {
            this.list = function() {
                return $http.get(urls.suppliers);
            };
        }
    ]);