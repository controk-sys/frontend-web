app
    .factory("clientsService", ["$http",
        function($http) {
            return {
                list: function() {
                    return $http.get("");
                },
                retrieve: function(id) {
                    return $http.get("" + id + "/");
                }
            };
        }
    ])
    .factory("employeesService", ["$http",
        function($http) {
            return {
                list: function() {
                    return $http.get("");
                },
                retrieve: function(id) {
                    return $http.get("" + id + "/");
                }
            };
        }
    ]);