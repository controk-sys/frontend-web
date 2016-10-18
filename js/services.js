app
    .service("Clients", ["$http", "urls",
        function($http, urls) {
            return {
                list: function() {
                    return $http.get(urls.clients);
                },
                retrieve: function(clientId) {
                    return $http.get(urls.clients + clientId + "/");
                }
            };
        }
    ])
    .service("Employees", ["$http", "urls",
        function($http, urls) {
            return {
                list: function() {
                    return $http.get(urls.employees);
                },
                retrieve: function(employeeId) {
                    return $http.get(urls.employees + employeeId + "/");
                }
            };
        }
    ]);