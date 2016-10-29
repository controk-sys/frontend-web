angular.module("controk")
    .service("Employee", ["$http", "urls",
        function($http, urls) {
            this.list = function() {
                return $http.get(urls.employees);
            };
        }
    ]);