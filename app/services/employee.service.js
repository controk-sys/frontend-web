angular.module("controk")
    .service("Employee", ["$http", "urls", "socket",
        function($http, urls, socket) {
            this.list = function() {
                return $http.get(urls.employees);
            };

            this.retrieve = function(id) {
                return $http.get(urls.employees + id + "/");
            };

            this.info = function(id) {
                return $http.get(urls.employees + id + "/info");
            };

            this.update = function (employee) {
                socket.emit("update employee", employee);
            };
        }
    ]);