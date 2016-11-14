angular.module("controk")
    .service("Supplier", ["$http", "urls", "socket",
        function($http, urls, socket) {
            this.list = function() {
                return $http.get(urls.suppliers);
            };

            this.retrieve = function(id) {
                return $http.get(urls.suppliers + id + "/");
            };

            this.info = function(id) {
                return $http.get(urls.suppliers + id + "/info");
            };

            this.create = function(supplier) {
                socket.emit("create supplier", supplier);
            };

            this.update = function (supplier) {
                socket.emit("update supplier", supplier);
            };
        }
    ]);