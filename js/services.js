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
    ]);