angular.module("controk")
    .service("Product", ["$http", "urls",
        function($http, urls) {
            this.list = function() {
                return $http.get(urls.products);
            };
        }
    ]);