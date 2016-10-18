app
    .service("Client", ["$http", "urls",
        function($http, urls) {
            this.list = function() {
                return $http.get(urls.clients);
            };

            this.retrieve = function(clientId) {
                return $http.get(urls.clients + clientId + "/");
            };
        }
    ])
    .service("Employee", ["$http", "urls",
        function($http, urls) {
            this.list = function() {
                return $http.get(urls.employees);
            };

            this.retrieve = function(employeeId) {
                return $http.get(urls.employees + employeeId + "/");
            };
        }
    ]);