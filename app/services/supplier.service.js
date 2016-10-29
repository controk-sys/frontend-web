angular.module("controk")
    .service("Supplier", ["$http", "urls",
        function($http, urls) {
            this.list = function() {
                return $http.get(urls.suppliers);
            };
        }
    ]);