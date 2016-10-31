angular.module("controk")
    .service("Client", ["$http", "urls", "socket",
        function($http, urls, socket) {
            this.list = function() {
                return $http.get(urls.clients);
            };

            this.retrieve = function(id) {
                return $http.get(urls.clients + id + "/");
            };

            this.info = function(id) {
                return $http.get(urls.clients + id + "/info/");
            };

            this.update = function (client) {
                socket.emit("update client", client);
            };
        }
    ]);