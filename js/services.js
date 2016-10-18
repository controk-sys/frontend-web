app
    .factory("mainService", ["$http", "apiHost",
        function($http, apiHost) {
            return {
                getEndpoints: function() {
                    return $http.get(apiHost + "api/v1/")
                }
            }
        }
    ])
    .factory("clientsService", ["$http", "urls",
        function($http, urls) {
            return {
                list: function() {
                    return $http.get(urls.clients);
                },
                retrieve: function(id) {
                    return $http.get(urls.clients + id + "/");
                }
            };
        }
    ])
    .factory("employeesService", ["$http", "urls",
        function($http, urls) {
            return {
                list: function() {
                    return $http.get(urls.employees);
                },
                retrieve: function(id) {
                    return $http.get(urls.employees + id + "/");
                }
            };
        }
    ]);