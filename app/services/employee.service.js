angular.module("controk")
    .service("Employee", ["$http", "urls",
        function($http, urls) {
            this.list = function() {
                return $http.get(urls.employees);
            };

            this.retrieve = function(id) {
                return $http.get(urls.employees + id + "/");
            };

            this.info = function(id) {
                return $http.get(urls.employees + id + "/info");
            };
        }
    ]);