angular.module("controk")
    .service("Client", ["$http", "urls",
        function($http, urls) {
            this.list = function() {
                return $http.get(urls.clients);
            };
            this.retrieve = function(id) {
                return $http.get(urls.clients + id + "/");
            };
            this.info = function(id) {
                return $http.get(urls.clients + id + "/info/");
            };
        }
    ]);