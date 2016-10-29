angular.module("controk")
    .service("Supplier", ["$http", "urls",
        function($http, urls) {
            this.list = function() {
                return $http.get(urls.suppliers);
            };
            this.retrieve = function(id) {
                return $http.get(urls.suppliers + id + "/");
            };
            this.info = function(id) {
                return $http.get(urls.suppliers + id + "/info");
            };
        }
    ]);